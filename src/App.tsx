import { useState } from 'react'
import './App.css'

function App() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <div className="page">
      <header className="navbar">
  <div className="site-title">
    <div className="brand">ikhtilaf</div>
    <div className="tagline">mutajasis raho</div>
  </div>

  <nav>
    <a href="#home">home</a>
    <a href="#about">about + contact</a>
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

export default App