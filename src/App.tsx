import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import BookClub from './pages/BookClub'
import Archive from './pages/Archive'
import Bookstores from './pages/Bookstores'
import './App.css'

function Home() {
  const [subscribed, setSubscribed] = useState(false)

  const [books, setBooks] = useState<
    { id: number; title: string; author: string }[]
  >([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setBooks(data)
      })
  }, [])

  return (
    <div className="page">
      <header className="navbar">
  <div className="site-title">
    <div className="brand">ikhtilaf</div>
    <div className="tagline">mutajasis raho</div>
  </div>

  <nav>
    <a href="#home">home</a>
    <a href="/about">about + contact</a>
    <a href="#book-club">book club</a>
    <a href="#archive">archive</a>
    <a href="#bookstores">bookstores</a>
    <a href="#quote">quote</a>
  </nav>
</header>
      <main id="home">
        <h1>ikhtilaf</h1>

        <p className="definition">
          an arabic word, اختلاف , meaning disagreement.
        </p>

        <p className="scroll-text">
          {'{ don\'t be shy, scroll down }'}
        </p>
      </main>
      <section className="subscribe-section">
      <form
        className="subscribe-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSubscribed(true)
        }}
      >
      <h2>subscribe to get with the times</h2>

          <div className="subscribe-fields">
            <input
              type="text"
              name="name"
              placeholder="name"
              maxLength={100}
              required
            />

           <input
              type="email"
              name="email"
              placeholder="email"
              maxLength={250}
              required
            />

            <button type="submit">
              subscribe
            </button>
          </div>

          {subscribed && <p className="luv-ya">luv ya :)</p>}
        </form>
      </section>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/book-club" element={<BookClub />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/bookstores" element={<Bookstores />} />
    </Routes>
  )
}

export default App