interface Props {
    onSelect: (text: string) => void
    visible: boolean
}

const CHIPS = [
    "What are Parsa's main technical skills?",
    'Tell me about his key projects',
    'What roles is Parsa looking for?',
    'Does he need visa sponsorship?',
    'Tell me about his MSc dissertation',
    'What makes Parsa stand out as a candidate?',
]

export function SuggestionChips({ onSelect, visible }: Props) {
    if (!visible) return null
    return (
        <div className="chips-wrap">
            {CHIPS.map(chip => (
                <button key={chip} className="chip" onClick={() => onSelect(chip)}>
                    {chip}
                </button>
            ))}
        </div>
    )
}