import { Message } from '../types'

interface Props {
    message: Message
}

export function MessageBubble({ message }: Props) {
    const isUser = message.role === 'user'
    return (
        <div className={`msg-row ${isUser ? 'msg-user' : 'msg-bot'}`}>
            {!isUser && <div className="avatar avatar-bot">P</div>}
            <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`}>
                {message.content}
            </div>
            {isUser && <div className="avatar avatar-user">R</div>}
        </div>
    )
}