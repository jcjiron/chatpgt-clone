"use client"

import { useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"
import { ChatList } from "./chat-list"

export function SidebarContent() {
  const { state } = useChatContext()
  const { loadChats } = useChatOperations()

  useEffect(() => {
    loadChats()
  }, [loadChats])

  if (state.isSidebarCollapsed) {
    return (
      <div className="flex-1 p-2 space-y-2">
        {/* Collapsed view - only icons */}
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="font-heading text-lg font-semibold text-slate-700 mb-3">Conversations</h2>
          <ChatList chats={state.chats} />
        </div>
      </div>
    </div>
  )
}
