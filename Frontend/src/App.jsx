import { useEffect, useState } from 'react'
import ChatHeader from './components/ChatHeader.jsx'
import Conversation from './components/Conversation.jsx'

function App() {
  const selectedUser = new URLSearchParams(window.location.search).get('user')
  const currentUser = selectedUser === 'maya' ? 'maya' : 'jordan'
  const otherUser = currentUser === 'maya' ? 'jordan' : 'maya'
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadMessages() {
      try {
        const response = await fetch(`/api/messages?user=${currentUser}`)
        if (!response.ok) throw new Error('Could not load messages.')
        const data = await response.json()
        if (isActive) setMessages(data)
      } catch {
        if (isActive) setError('Could not connect to the server. Check that the backend and database are running.')
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadMessages()
    const intervalId = window.setInterval(loadMessages, 5000)
    return () => {
      isActive = false
      window.clearInterval(intervalId)
    }
  }, [currentUser])

  async function sendMessage(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || isSending) return

    setIsSending(true)
    setError('')
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sender: currentUser }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Could not send message.')
      setMessages((current) => [...current, data])
      setDraft('')
    } catch (sendError) {
      setError(sendError.message || 'Could not connect to the server.')
    } finally {
      setIsSending(false)
    }
  }

  async function deleteMessage(messageId) {
    setError('')
    try {
      const response = await fetch(`/api/messages/${messageId}?sender=${currentUser}`, { method: 'DELETE' })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Could not delete message.')
      }
      setMessages((current) => current.filter((message) => message.id !== messageId))
    } catch (deleteError) {
      setError(deleteError.message || 'Could not connect to the server.')
    }
  }

  return (
    <main className="app-shell">
      <section className="chat-card" aria-label={`Chat as ${currentUser}`}>
        <ChatHeader currentUser={currentUser} />
        <Conversation
          messages={messages}
          isLoading={isLoading}
          error={error}
          draft={draft}
          onDraftChange={setDraft}
          onSend={sendMessage}
          onDelete={deleteMessage}
          isSending={isSending}
          currentUser={currentUser}
          otherUser={otherUser}
        />
      </section>
    </main>
  )
}

export default App

