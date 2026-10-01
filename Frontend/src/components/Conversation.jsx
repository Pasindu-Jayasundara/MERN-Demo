function ConversationHeader() {
  return (
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
  )
}

function MessageList({ messages }) {
  return (
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
  )
}

function MessageComposer({ draft, onDraftChange, onSend }) {
  return (
    <form className="composer" onSubmit={onSend}>
      <label className="sr-only" htmlFor="message-input">Write a message</label>
      <input
        id="message-input"
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Write a message..."
        autoComplete="off"
      />
      <span className="composer-hint">Press Enter to send</span>
      <button className="send-button" type="submit" aria-label="Send message" disabled={!draft.trim()}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" /></svg>
      </button>
    </form>
  )
}

function Conversation({ messages, draft, onDraftChange, onSend }) {
  return (
    <section className="conversation">
      <ConversationHeader />
      <MessageList messages={messages} />
      <MessageComposer draft={draft} onDraftChange={onDraftChange} onSend={onSend} />
      <footer className="conversation-footer">Just you and Maya, keeping in touch <span>♡</span></footer>
    </section>
  )
}

export default Conversation
