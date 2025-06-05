"use client"

import { useChatContext } from "@/context/chat-context"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { EmptyState } from "./empty-state"

export function ChatContainer() {
  const { state } = useChatContext()

  return (
    <div
      className={`
      flex flex-col h-screen transition-all duration-300 ease-in-out
      ${state.isSidebarCollapsed ? "ml-16" : "ml-80"}
    `}
    >
      {state.activeChat ? (
        <>
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
