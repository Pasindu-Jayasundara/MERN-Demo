import { Link } from 'react-router'

function ChatHeader() {
  return (
    <header className="topbar">
      <Link className="brand" to="/" aria-label="Daylight home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>daylight</span>
      </Link>
      <div className="topbar-note"><span className="status-dot" /> Your little corner of the internet</div>
      <button className="profile-button" aria-label="Your profile">J</button>
    </header>
  )
}

export default ChatHeader
