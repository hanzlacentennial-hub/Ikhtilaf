function Navbar() {
  return (
    <header className="navbar">
      <div className="site-title">
        <div className="brand">ikhtilaf</div>
        <div className="tagline">mutajasis raho</div>
      </div>

      <nav>
        <a href="/">home</a>
        <a href="/about">about + contact</a>
        <a href="/book-club">book club</a>
        <a href="/archive">archive</a>
        <a href="/bookstores">bookstores</a>
        <a href="/quote">quote</a>
      </nav>
    </header>
  )
}

export default Navbar