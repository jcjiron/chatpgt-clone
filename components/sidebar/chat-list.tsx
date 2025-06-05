"use client"

import type React from "react"

import { FaUserCircle, FaTrash } from "react-icons/fa"
import type { Chat } from "@/types/chat"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"

interface ChatListProps {
  chats: Chat[]
}

export function ChatList({ chats }: ChatListProps) {
  const { state } = useChatContext()
  const { selectChat, deleteChat } = useChatOperations()

  const handleChatSelect = (chatId: string) => {
    selectChat(chatId)
  }

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    if (confirm("¿Estás seguro de que quieres eliminar este chat?")) {
      await deleteChat(chatId)
    }
  }

  if (chats.length === 0) {
    return <div className="text-sm text-slate-500 text-center py-4">No hay conversaciones</div>
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => handleChatSelect(chat.id)}
          className={`
            group p-3 rounded-lg cursor-pointer transition-all duration-200
            hover:bg-slate-100 border border-transparent
            ${state.activeChat?.id === chat.id ? "bg-blue-50 border-blue-200" : "hover:border-slate-200"}
          `}
        >
          <div className="flex items-start space-x-3">
            <FaUserCircle className="w-8 h-8 text-slate-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base font-medium text-slate-900 truncate">{chat.name}</h3>
              {chat.lastMessage && <p className="text-sm text-slate-500 truncate mt-1">{chat.lastMessage}</p>}
              <p className="text-xs text-slate-400 mt-1">{chat.lastActivity.toLocaleDateString()}</p>
            </div>
            <button
              onClick={(e) => handleDeleteChat(e, chat.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
              aria-label="Delete chat"
            >
              <FaTrash className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
