import { useState } from 'react'
import { Link } from 'react-router'

const initialMessages = [
  { id: 1, sender: 'maya', text: 'Hey! How’s the new project coming along?', time: '10:24 AM' },
  { id: 2, sender: 'you', text: 'It’s going well! Just polishing the last few details.', time: '10:26 AM' },
  { id: 3, sender: 'maya', text: 'Nice. I’d love to take a look when it’s ready ✨', time: '10:27 AM' },
  { id: 4, sender: 'you', text: 'Absolutely — I’ll send it over this afternoon.', time: '10:29 AM' },
]

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  function sendMessage(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'you',
        text,
        time: new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date()),
      },
    ])
    setDraft('')
  }

  return (
    <main className="app-shell">
      <section className="chat-card" aria-label="Chat with Maya">
        <header className="topbar">
          <Link className="brand" to="/" aria-label="Daylight home">
            <span className="brand-mark" aria-hidden="true">✳</span>
            <span>daylight</span>
          </Link>
          <div className="topbar-note"><span className="status-dot" /> Your little corner of the internet</div>
          <button className="profile-button" aria-label="Your profile">J</button>
        </header>

        <section className="conversation">
          <header className="conversation-header">
            <div className="person">
              <div className="avatar maya-avatar" aria-hidden="true">M<span className="online-indicator" /></div>
              <div>
                <h1>Maya Chen</h1>
                <p><span className="online-copy">Online</span><span className="separator">·</span> Usually replies quickly</p>
              </div>
            </div>
            <button className="more-button" aria-label="More conversation options">···</button>
          </header>

          <div className="message-area" aria-live="polite">
            <div className="day-divider"><span /> <time>Today</time> <span /></div>
            <div className="messages">
              {messages.map((message) => {
                const isMine = message.sender === 'you'
                return (
                  <article className={`message-row ${isMine ? 'mine' : ''}`} key={message.id}>
                    {!isMine && <div className="avatar small maya-avatar" aria-hidden="true">M</div>}
                    <div className="message-content">
                      <div className="message-bubble">{message.text}</div>
                      <time className="message-time">{message.time}</time>
                    </div>
                    {isMine && <div className="avatar small you-avatar" aria-label="You">J</div>}
                  </article>
                )
              })}
            </div>
          </div>

          <form className="composer" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="message-input">Write a message</label>
            <input
              id="message-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a message..."
              autoComplete="off"
            />
            <span className="composer-hint">Press Enter to send</span>
            <button className="send-button" type="submit" aria-label="Send message" disabled={!draft.trim()}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" /></svg>
            </button>
          </form>
          <footer className="conversation-footer">Just you and Maya, keeping in touch <span>♡</span></footer>
        </section>
      </section>
    </main>
  )
}

export default App
