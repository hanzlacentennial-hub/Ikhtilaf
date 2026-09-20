import Navbar from '../components/Navbar'

function Bookstores() {
  return (
    <div className="bookstores-page">
      <Navbar />

      <section className="bookstores-content">
        <h1>Local and POC-Owned Bookstores</h1>

        <p className="bookstores-note">
          This list is incomplete! Please{' '}
          <a href="mailto:ourikhtilaf@gmail.com">email us</a>{' '}
          if you would like to add one to the list, or if any links are incorrect
        </p>

        <div className="bookstore-section">
          <h2>Borrow</h2>
          <a
            href="https://saskatoonlibrary.ca/about/locations/"
            target="_blank"
            rel="noreferrer"
          >
            Saskatoon Public Library
          </a>
          <span> (any location near you)</span>
        </div>

        <div className="bookstore-section">
          <h2>Shop Secondhand</h2>

          <a
            href="https://www.perytonbooks.com/contact"
            target="_blank"
            rel="noreferrer"
          >
            Peryton Books
          </a>

          <a
            href="https://www.facebook.com/westgatebooksinc/"
            target="_blank"
            rel="noreferrer"
          >
            Westgate Books
          </a>
        </div>

        <div className="bookstore-section">
          <h2>Shop Local</h2>

          <a
            href="https://turning.ca/"
            target="_blank"
            rel="noreferrer"
          >
            Turning the Tide
          </a>
        </div>
      </section>
    </div>
  )
}

export default Bookstores