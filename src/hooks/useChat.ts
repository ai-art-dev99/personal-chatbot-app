// import { useState, useCallback } from 'react'
// import { Message, ChatResponse } from '../types'

// const API_URL = 'https://parsa2025ai-mychatbot.hf.space'

// function uid() {
//     return Math.random().toString(36).slice(2, 10)
// }

// export function useChat() {
//     const [messages, setMessages] = useState<Message[]>([
//         {
//             id: 'welcome',
//             role: 'assistant',
//             content: "Hi! I'm Parsa's AI assistant. Ask me anything about his skills, projects, or experience — I'm here to help you learn more about him as a candidate.",
//             timestamp: new Date(),
//         },
//     ])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState<string | null>(null)

//     const sendMessage = useCallback(async (text: string) => {
//         if (!text.trim() || loading) return

//         // Guard: no API URL configured
//         if (!API_URL) {
//             setMessages(prev => [...prev, {
//                 id: uid(), role: 'assistant', timestamp: new Date(),
//                 content: '⚠️ VITE_API_URL is not set. Add it to your .env file and rebuild.',
//             }])
//             return
//         }

//         const userMsg: Message = {
//             id: uid(),
//             role: 'user',
//             content: text.trim(),
//             timestamp: new Date(),
//         }

//         setMessages(prev => [...prev, userMsg])
//         setLoading(true)
//         setError(null)

//         try {
//             const history = messages
//                 .filter(m => m.id !== 'welcome')
//                 .slice(-10)
//                 .map(m => ({ role: m.role, content: m.content }))

//             const res = await fetch(`${API_URL}/chat`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ message: text.trim(), history }),
//             })

//             if (!res.ok) {
//                 const err = await res.json().catch(() => ({}))
//                 throw new Error((err as { detail?: string }).detail ?? `HTTP ${res.status}`)
//             }

//             const data: ChatResponse = await res.json()

//             setMessages(prev => [
//                 ...prev,
//                 {
//                     id: uid(),
//                     role: 'assistant',
//                     content: data.response,
//                     timestamp: new Date(),
//                 },
//             ])
//         } catch (err) {
//             const msg = err instanceof Error ? err.message : 'Unknown error'
//             setError(msg)
//             setMessages(prev => [
//                 ...prev,
//                 {
//                     id: uid(),
//                     role: 'assistant',
//                     content: `⚠️ ${msg}\n\n(Attempted: ${API_URL}/chat)`,
//                     timestamp: new Date(),
//                 },
//             ])
//         } finally {
//             setLoading(false)
//         }
//     }, [messages, loading])

//     return { messages, loading, error, sendMessage }
// }

import { useState, useCallback } from 'react'
import { Message, ChatResponse } from '../types'

const API_URL = 'https://parsa2025ai-mychatbot.hf.space'

function uid() {
    return Math.random().toString(36).slice(2, 10)
}

function diagnose(err: unknown, url: string): string {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
        return `🚫 CORS or network error — request never reached the server.\n\nFix: Add your app's origin to ALLOWED_ORIGINS in HF Space secrets.\n\nAttempted: ${url}`
    }
    return `⚠️ ${msg}\n\nAttempted: ${url}`
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hi! I'm Parsa's AI assistant. Ask me anything about his skills, projects, or experience — I'm here to help you learn more about him as a candidate.",
            timestamp: new Date(),
        },
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || loading) return

        if (!API_URL) {
            setMessages(prev => [...prev, {
                id: uid(), role: 'assistant', timestamp: new Date(),
                content: '⚠️ VITE_API_URL is not set. Add it to your .env file and rebuild.',
            }])
            return
        }

        const userMsg: Message = {
            id: uid(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMsg])
        setLoading(true)
        setError(null)

        const endpoint = `${API_URL}/chat`

        try {
            const history = messages
                .filter(m => m.id !== 'welcome')
                .slice(-10)
                .map(m => ({ role: m.role, content: m.content }))

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text.trim(), history }),
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error((err as { detail?: string }).detail ?? `HTTP ${res.status}`)
            }

            const data: ChatResponse = await res.json()

            setMessages(prev => [
                ...prev,
                { id: uid(), role: 'assistant', content: data.response, timestamp: new Date() },
            ])
        } catch (err) {
            const friendlyMsg = diagnose(err, endpoint)
            setError(friendlyMsg)
            setMessages(prev => [
                ...prev,
                { id: uid(), role: 'assistant', content: friendlyMsg, timestamp: new Date() },
            ])
        } finally {
            setLoading(false)
        }
    }, [messages, loading])

    return { messages, loading, error, sendMessage }
}