const SKILLS = ['PyTorch', 'LangChain', 'FastAPI', 'RAG / FAISS', 'LoRA / PEFT', 'AWS', 'Docker', 'LangGraph']

const PROJECTS = [
    { name: 'RADSAM', desc: 'Radiology AI platform' },
    { name: 'ParsaGPT', desc: 'Production RAG chatbot' },
    { name: 'R2GenTransformer', desc: 'IUI 2026 paper' },
    { name: 'RL Trading System', desc: 'Multi-agent PPO' },
]

export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-profile">
                <div className="profile-avatar">PR</div>
                <div>
                    <h1 className="profile-name">Parsa Rouhi</h1>
                    <p className="profile-title">AI / ML Engineer</p>
                </div>
            </div>

            <div className="sidebar-badge">
                <span className="badge-dot" />
                Open to work · UK
            </div>

            <div className="sidebar-section">
                <p className="section-label">Education</p>
                <p className="section-value">MSc Data Science & AI</p>
                <p className="section-sub">Bournemouth University · Distinction · 2025</p>
            </div>

            <div className="sidebar-section">
                <p className="section-label">Tech Stack</p>
                <div className="skill-grid">
                    {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
            </div>

            <div className="sidebar-section">
                <p className="section-label">Projects</p>
                {PROJECTS.map(p => (
                    <div key={p.name} className="project-row">
                        <span className="project-name">{p.name}</span>
                        <span className="project-desc">{p.desc}</span>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
                <span className="social-sep">·</span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
            </div>
        </aside>
    )
}