export function TypingIndicator() {
    return (
        <div className="msg-row msg-bot">
            <div className="avatar avatar-bot">P</div>
            <div className="bubble bubble-bot typing-bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
            </div>
        </div>
    )
}