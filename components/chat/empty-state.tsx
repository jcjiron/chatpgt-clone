"use client"

import { MessageCircle, Plus } from "lucide-react"
import { useChatOperations } from "@/hooks/use-chat-operations"

export function EmptyState() {
  const { createNewChat } = useChatOperations()

  const handleNewChat = async () => {
    try {
      await createNewChat(`New Chat ${Date.now()}`)
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-25">
      <div className="text-center max-w-md mx-auto p-8">
        <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-6" />

        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-4">Welcome to Enterprise Chat</h2>

        <p className="text-base text-slate-600 mb-8">
          Select an existing conversation or create a new one to start chatting with our specialized AI assistants.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleNewChat}
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <Plus className="w-5 h-5" />
            <span className="font-heading text-base font-medium">New Conversation</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-heading text-lg font-semibold text-slate-700 mb-3">Features</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Multiple AI models available</li>
            <li>• Conversation history</li>
            <li>• Voice messages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
