import './App.css'

function App() {
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
        <h2>subscribe to get with the times</h2>
      </section>
    </div>
  )
}

export default App