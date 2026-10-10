from fastapi import HTTPException
from psycopg.errors import UniqueViolation
from fastapi import FastAPI
from pydantic import BaseModel
from pwdlib import PasswordHash
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg
from dotenv import load_dotenv

load_dotenv("backend/.env")

password_hash = PasswordHash.recommended()

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
def login_member(member: MemberLogin):
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