export interface Message {
  id: string
  content: string
  type: "text" | "voice"
  sender: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
}

export interface Chat {
  id: string
  name: string
  messages: Message[]
  lastMessage?: string
  lastActivity: Date
}

export interface Agent {
  id: string
  name: string
  model: string
  description?: string
}

export interface ChatState {
  chats: Chat[]
  activeChat: Chat | null
  agents: Agent[]
  selectedAgent: Agent
  isLoading: boolean
  isSidebarCollapsed: boolean
}
