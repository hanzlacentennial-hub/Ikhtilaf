from fastapi import HTTPException
from psycopg.errors import UniqueViolation
from fastapi import FastAPI
from pydantic import BaseModel
from pwdlib import PasswordHash
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg
import secrets
import hashlib
from datetime import datetime, timedelta, timezone
from fastapi import Response
from dotenv import load_dotenv
from fastapi import Cookie

load_dotenv("backend/.env")

password_hash = PasswordHash.recommended()

def generate_session_token():
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()

    return token, token_hash

class MemberRegister(BaseModel):
    name: str
    email: str
    password: str

class MemberLogin(BaseModel):
    email: str
    password: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", status_code=201)
def register_member(member: MemberRegister):
    hashed_password = password_hash.hash(member.password)

    try:
        with psycopg.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        ) as connection:

            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO members (name, email, password_hash)
                    VALUES (%s, %s, %s);
                    """,
                    (member.name, member.email, hashed_password)
                )

    except UniqueViolation:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists"
        )

    return {
        "message": "Account created successfully",
        "name": member.name,
        "email": member.email
    }

@app.post("/login")
def login_member(member: MemberLogin, response: Response):
    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, password_hash
                FROM members
                WHERE email = %s;
                """,
                (member.email,)
            )

            user = cursor.fetchone()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not password_hash.verify(member.password, user[2]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token, token_hash = generate_session_token()

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)

    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO sessions (member_id, token_hash, expires_at)
                VALUES (%s, %s, %s);
                """,
                (user[0], token_hash, expires_at)
            )

    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        secure=False,  # Local HTTP development only
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/"
    )

    return {
        "message": "Login successful",
        "id": user[0],
        "name": user[1]
    }

@app.get("/books")
def get_books():
    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:

        with connection.cursor() as cursor:
            cursor.execute("SELECT id, title, author FROM books;")
            books = cursor.fetchall()

    return [
        {
            "id": book[0],
            "title": book[1],
            "author": book[2]
        }
        for book in books
    ]

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "Ikhtilaf API"
    }

@app.get("/me")
def get_current_member(session_token: str | None = Cookie(default=None)):
    if session_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    token_hash = hashlib.sha256(session_token.encode()).hexdigest()

    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT members.id, members.name, members.email
                FROM sessions
                JOIN members ON sessions.member_id = members.id
                WHERE sessions.token_hash = %s
                  AND sessions.expires_at > CURRENT_TIMESTAMP;
                """,
                (token_hash,)
            )

            member = cursor.fetchone()

    if member is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired session"
        )

    return {
        "id": member[0],
        "name": member[1],
        "email": member[2]
    }

@app.post("/logout")
def logout_member(
    response: Response,
    session_token: str | None = Cookie(default=None)
):
    if session_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    token_hash = hashlib.sha256(session_token.encode()).hexdigest()

    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM sessions
                WHERE token_hash = %s;
                """,
                (token_hash,)
            )

    response.delete_cookie(
        key="session_token",
        path="/",
        samesite="lax",
        httponly=True
    )

    return {"message": "Logged out successfully"}

@app.get("/books/{book_id}")
def get_book(book_id: int):
    with psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, title, author
                FROM books
                WHERE id = %s;
                """,
                (book_id,)
            )

            book = cursor.fetchone()

    if book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return {
        "id": book[0],
        "title": book[1],
        "author": book[2]
    }

