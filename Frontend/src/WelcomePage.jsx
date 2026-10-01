import { Link } from 'react-router'

function WelcomePage() {
  return (
    <main className="welcome-shell">
      <section className="welcome-card">
        <a className="brand" href="/" aria-label="Daylight home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>daylight</span>
        </a>
        <div className="welcome-copy">
          <span className="welcome-eyebrow">A little corner of the internet</span>
          <h1>Good conversations start here.</h1>
          <p>A calm, simple place to catch up with the people who matter.</p>
          <Link className="welcome-action" to="/chat">
            Open your chat <span aria-hidden="true">→</span>
          </Link>
        </div>
        <span className="welcome-decoration" aria-hidden="true">✳</span>
      </section>
    </main>
  )
}

export default WelcomePage
