import { Sidebar } from './components/Sidebar'
import { ChatWindow } from './components/ChatWindow'

export default function App() {
    return (
        <div className="layout">
            <Sidebar />
            <ChatWindow />
        </div>
    )
}