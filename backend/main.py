from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg
from dotenv import load_dotenv

load_dotenv()

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