import { useState } from 'react'
import Navbar from '../components/Navbar'

function BookClub() {
  const [joined, setJoined] = useState(false)

  return (
    <div className="book-club-page">
      <Navbar />

      <section className="book-club-content">
        <div className="book-info">
          <h1>Son of a Trickster</h1>

          <p className="book-author">Eden Robinson</p>

          <p className="book-description">
            In Son of a Trickster, Eden Robinson follows Jared Martin, an
            Indigenous teenager navigating family instability, addiction,
            poverty, and violence in the Haisla community of Kitamaat Village,
            British Columbia. As Jared struggles to care for his dysfunctional
            parents, he begins encountering supernatural forces rooted in
            Indigenous trickster traditions. Blending gritty realism with dark
            humour and the fantastical, Robinson explores the intergenerational
            impacts of colonialism, trauma, and substance abuse alongside the
            resilience of Indigenous community and cultural traditions. Both
            unsettling and compassionate, Son of a Trickster is a coming-of-age
            story about resilience, identity, and the complicated inheritance
            of family and culture.
          </p>
        </div>

        <img
          className="book-cover"
          src="https://static.wixstatic.com/media/857fe4_4d3865448a2f439783617c00685eea51~mv2.jpg/v1/fill/w_247,h_352,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/81heI2ny9dL_edited.jpg"
          alt="Son of a Trickster by Eden Robinson"
        />
      </section>

      <section className="book-club-join">
        <form
          className="subscribe-form"
          onSubmit={(event) => {
            event.preventDefault()
            setJoined(true)
          }}
        >
          <h2>join the book club</h2>

          <div className="subscribe-fields">
            <input
              type="text"
              name="name"
              placeholder="name"
              maxLength={100}
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              maxLength={250}
              autoComplete="off"
              required
            />

            <button type="submit">subscribe</button>
          </div>

          {joined && <p className="luv-ya">luv ya :)</p>}
        </form>
      </section>
    </div>
  )
}

export default BookClub