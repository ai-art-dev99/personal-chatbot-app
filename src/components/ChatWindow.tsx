import { useEffect, useRef, useState } from 'react'
import { useChat } from '../hooks/useChat'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { SuggestionChips } from './SuggestionChips'

export function ChatWindow() {
    const { messages, loading, sendMessage } = useChat()
    const [input, setInput] = useState('')
    const [chipsVisible, setChipsVisible] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    function handleSend(text?: string) {
        const msg = text ?? input
        if (!msg.trim()) return
        setChipsVisible(false)
        setInput('')
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
        sendMessage(msg)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setInput(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
    }

    return (
        <section className="chat-window">
            <div className="chat-header">
                <div className="chat-header-dot" />
                <span className="chat-header-label">Ask me anything about Parsa</span>
                <span className="chat-header-model">LLaMA · RAG · FAISS</span>
            </div>

            <div className="messages-area">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {loading && <TypingIndicator />}
                <div ref={bottomRef} />
            </div>

            <div className="input-area">
                <SuggestionChips onSelect={handleSend} visible={chipsVisible} />
                <div className="input-row">
                    <textarea
                        ref={textareaRef}
                        className="chat-input"
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about skills, projects, experience…"
                        rows={1}
                        disabled={loading}
                    />
                    <button
                        className="send-btn"
                        onClick={() => handleSend()}
                        disabled={!input.trim() || loading}
                        aria-label="Send"
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </section>
    )
}

function SendIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
    )
}