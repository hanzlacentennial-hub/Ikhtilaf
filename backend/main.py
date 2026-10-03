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

@app.post("/register")
def register_member(member: MemberRegister):
    hashed_password = password_hash.hash(member.password)

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

    return {
        "message": "Account created successfully",
        "name": member.name,
        "email": member.email
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