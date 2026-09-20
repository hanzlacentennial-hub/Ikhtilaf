import { useState } from 'react'
import Navbar from '../components/Navbar'

function About() {
  const [joined, setJoined] = useState(false)
  return (
    <div className="about-page">
      <Navbar />
      
      <section className="about-story">
        <h1>our story</h1>

        <p>"Once you learn to read, you will be forever free." - Frederick Douglass</p>

        <p>"Without community, there is no liberation." - Audre Lorde</p>

        <p>
         Ikhtilaf Book Club was founded for the people, by the people, so that
         they may join together to broaden our understanding of social justice
         and liberation. The book club is centered on arts and culture,
         critical analysis, intersectionality, community, and love for all
         humanity. By reading, discussing, and learning from one another, we
         will build our strength as activists and as a community, one book at
         a time.
        </p>
        <p>
         Ikhtilaf Book Club is a Canada-wide initiative that meets every 2 months in
         Saskatoon- Treaty 6 Territory and the Homeland of the Métis. People who live
         outside of Saskatoon and anyone else who cannot attend in person are welcome
         to join via Zoom. Featured books are selected by group vote. We aim for
         inclusive and community-centered gatherings, meaning that:
        </p>

        <ol>
            <li>
             We reduce barriers to participation by eliminating or reducing cost, and
             having no expectations for attendance- all members are encouraged to come
             to meetings whether or not they have read the feature book.
            </li>

            <li>
             All members will have a say in the book club structure and future
             initiatives.
            </li>
        </ol>

        <p>We aim to:</p>

        <ul>
            <li>Center POC voices.</li>
            <li>Create safe and welcoming community gatherings.</li>
            <li>Host productive conversations about complex societal issues.</li>
            <li>Increase intercultural understanding and actionable allyship.</li>
            <li>Promote equity-deserving authors, artists, businesses, and events.</li>
        </ul>

        <p className="about-contact">
         Insta:{' '}
         <a
            href="https://www.instagram.com/ourikhtilaf/"
            target="_blank"
            rel="noreferrer"
        >
            @ourikhtilaf
         </a>
        </p>

        <p className="about-contact">
         Email:{' '}
         <a href="mailto:ourikhtilaf@gmail.com">
            ourikhtilaf@gmail.com
         </a>
        </p>

        <section className="join-section">
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

                    <button type="submit" aria-label="subscribe">
                        subscribe
                    </button>
                </div>

                {joined && <p className="luv-ya">luv ya :)</p>}

            </form>

        </section>

      </section>
    </div>
  )
}

export default About