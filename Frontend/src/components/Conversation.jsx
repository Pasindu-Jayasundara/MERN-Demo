function ConversationHeader({ otherUser }) {
  const otherName = otherUser === 'maya' ? 'Maya Chen' : 'Jordan Lee'
  const otherInitial = otherUser === 'maya' ? 'M' : 'J'
  const otherClass = otherUser === 'maya' ? 'maya-avatar' : 'you-avatar'
  return (
    <header className="conversation-header">
      <div className="person">
        <div className={`avatar ${otherClass}`} aria-hidden="true">{otherInitial}<span className="online-indicator" /></div>
        <div>
          <h1>{otherName}</h1>
          <p><span className="online-copy">Online</span><span className="separator">·</span> Usually replies quickly</p>
        </div>
      </div>
      <button className="more-button" aria-label="More conversation options">···</button>
    </header>
  )
}

function MessageList({ messages, isLoading, currentUser, onDelete }) {
  return (
    <div className="message-area" aria-live="polite">
      <div className="day-divider"><span /> <time>Today</time> <span /></div>
      <div className="messages">
        {isLoading && <p className="message-status">Loading messages...</p>}
        {!isLoading && messages.length === 0 && <p className="message-status">No messages yet. Start the conversation.</p>}
        {messages.map((message) => {
          const senderUser = message.sender === 'you' ? 'jordan' : message.sender
          const isMine = senderUser === currentUser
          const senderInitial = senderUser === 'maya' ? 'M' : 'J'
          const senderClass = senderUser === 'maya' ? 'maya-avatar' : 'you-avatar'
          return (
            <article className={`message-row ${isMine ? 'mine' : ''}`} key={message.id}>
              {!isMine && <div className={`avatar small ${senderClass}`} aria-hidden="true">{senderInitial}</div>}
              <div className="message-content">
                <div className="message-bubble">{message.text}</div>
                <time className="message-time">{message.time}</time>
              </div>
              <button className="delete-message-button" type="button" onClick={() => onDelete(message.id)} aria-label={`Delete message: ${message.text}`} title="Delete message">×</button>
              {isMine && <div className={`avatar small ${senderClass}`} aria-label="You">{senderInitial}</div>}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function MessageComposer({ draft, onDraftChange, onSend, isSending }) {
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
      <button className="send-button" type="submit" aria-label="Send message" disabled={!draft.trim() || isSending}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" /></svg>
      </button>
    </form>
  )
}

function Conversation({ messages, isLoading, error, draft, onDraftChange, onSend, onDelete, isSending, currentUser, otherUser }) {
  return (
    <section className="conversation">
      <ConversationHeader otherUser={otherUser} />
      <MessageList messages={messages} isLoading={isLoading} currentUser={currentUser} onDelete={onDelete} />
      {error && <p className="message-status error" role="alert">{error}</p>}
      <MessageComposer draft={draft} onDraftChange={onDraftChange} onSend={onSend} isSending={isSending} />
      <footer className="conversation-footer">Just you and {otherUser === 'maya' ? 'Maya' : 'Jordan'}, keeping in touch <span>&#9825;</span></footer>
    </section>
  )
}

export default Conversation

