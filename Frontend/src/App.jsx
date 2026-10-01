import { useState } from 'react'
import ChatHeader from './components/ChatHeader.jsx'
import Conversation from './components/Conversation.jsx'

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
        <ChatHeader />
        <Conversation
          messages={messages}
          draft={draft}
          onDraftChange={setDraft}
          onSend={sendMessage}
        />
      </section>
    </main>
  )
}

export default App
