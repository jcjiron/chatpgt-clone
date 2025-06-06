"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { ChatState, Chat, Agent } from "@/types/chat"

type ChatAction =
  | { type: "SET_CHATS"; payload: Chat[] }
  | { type: "SET_ACTIVE_CHAT"; payload: Chat | null }
  | { type: "SET_SELECTED_AGENT"; payload: Agent }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "ADD_CHAT"; payload: Chat }
  | { type: "UPDATE_CHAT"; payload: Chat }
  | { type: "DELETE_CHAT"; payload: string }

const defaultAgents: Agent[] = [
  { id: "1", name: "GPT-4", model: "gpt-4", description: "Advanced model for complex tasks" },
  { id: "2", name: "GPT-3.5", model: "gpt-3.5-turbo", description: "Fast model for conversations" },
  { id: "3", name: "Claude", model: "claude-3", description: "Assistant specialized in analysis" },
]

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  agents: defaultAgents,
  selectedAgent: defaultAgents[0],
  isLoading: false,
  isSidebarCollapsed: false,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.payload }
    case "SET_ACTIVE_CHAT":
      return { ...state, activeChat: action.payload }
    case "SET_SELECTED_AGENT":
      return { ...state, selectedAgent: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarCollapsed: !state.isSidebarCollapsed }
    case "ADD_CHAT":
      return { ...state, chats: [...state.chats, action.payload] }
    case "UPDATE_CHAT":
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.payload.id ? action.payload : chat)),
        activeChat: state.activeChat?.id === action.payload.id ? action.payload : state.activeChat,
      }
    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload),
        activeChat: state.activeChat?.id === action.payload ? null : state.activeChat,
      }
    default:
      return state
  }
}

const ChatContext = createContext<{
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
} | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}
