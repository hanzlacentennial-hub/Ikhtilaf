import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Archive() {
  const [books, setBooks] = useState<
    { id: number; title: string; author: string }[]
  >([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Could not load books:', error))
  }, [])

  return (
    <div className="archive-page">
      <Navbar />

      <section className="archive-content">
        <h1>archived books</h1>

        <section className="archive-list">
            <article className="archive-book">
                <p className="archive-date">May 2024</p>

                <hr />

                <div className="archive-book-content">
                    <div className="archive-book-info">
                        <p className="archive-title">all about love</p>
                        <p className="archive-author">by bell hooks</p>
                    </div>

                    <p className="archive-description">
                        bell hooks challenges us to redefine love from a noun to a verb,
                        offering a proactive ethic for a love-starved society. With incisive
                        insight, she explores what love truly means, advocating for a sacred,
                        redemptive, and healing approach over the conventional emphasis on
                        romance and desire.
                    </p>

                    <img
                        className="archive-cover"
                        src="https://static.wixstatic.com/media/857fe4_a8c6778ea85444ed871cf9fc511b04a4~mv2.jpg/v1/fill/w_201,h_201,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/external-file_edited.jpg"
                        alt="all about love by bell hooks"
                    />
                </div>
            </article>
        </section>

        <section className="archive-list">
          <h2>books in our collection</h2>

          {books.map(book => (
            <article className="archive-book" key={book.id}>
              <hr />

              <div className="archive-book-info">
                <p className="archive-title">{book.title}</p>
                <p className="archive-author">by {book.author}</p>
              </div>
            </article>
          ))}
        </section>

      </section>
    </div>
  )
}

export default Archive