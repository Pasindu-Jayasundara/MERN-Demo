import { Link } from 'react-router'

function WelcomePage() {
  return (
    <main className="welcome-shell">
      <section className="welcome-card">
        <a className="brand" href="/" aria-label="Daylight home">
          <span className="brand-mark" aria-hidden="true">&#10033;</span>
          <span>daylight</span>
        </a>
        <div className="welcome-copy">
          <span className="welcome-eyebrow">A little corner of the internet</span>
          <h1>Good conversations start here.</h1>
          <p>A calm, simple place to catch up with the people who matter.</p>
          <div className="user-options" aria-label="Choose who is using the chat">
            <Link className="welcome-action" to="/chat?user=maya">
              Continue as Maya <span aria-hidden="true">&#8594;</span>
            </Link>
            <Link className="welcome-action secondary-action" to="/chat?user=jordan">
              Continue as Jordan <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
        <span className="welcome-decoration" aria-hidden="true">&#10033;</span>
      </section>
    </main>
  )
}

export default WelcomePage
