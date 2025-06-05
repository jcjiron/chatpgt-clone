import { ChatProvider } from "@/context/chat-context"
import { SidebarContainer } from "@/components/sidebar/sidebar-container"
import { ChatContainer } from "@/components/chat/chat-container"

export default function HomePage() {
  return (
    <ChatProvider>
      <div className="h-screen overflow-hidden bg-white">
        <SidebarContainer />
        <ChatContainer />
      </div>
    </ChatProvider>
  )
}
