"use client"

import { FaExternalLinkAlt, FaClock } from "react-icons/fa"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"

export function SidebarFooter() {
  const { state } = useChatContext()
  const { createNewChat } = useChatOperations()

  const handleTemporaryChat = async () => {
    try {
      await createNewChat(`Temporary Chat ${Date.now()}`)
    } catch (error) {
      console.error("Error creating temporary chat:", error)
    }
  }

  const handleViewPlans = () => {
    window.open("https://example.com/plans", "_blank")
  }

  if (state.isSidebarCollapsed) {
    return (
      <div className="p-2 border-t border-slate-200 space-y-2">
        <button
          onClick={handleTemporaryChat}
          className="w-12 h-12 bg-yellow-100 hover:bg-yellow-200 rounded-lg 
                     flex items-center justify-center transition-colors"
          aria-label="Temporary chat"
        >
          <FaClock className="w-4 h-4 text-yellow-600" />
        </button>
        <button
          onClick={handleViewPlans}
          className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg 
                     flex items-center justify-center transition-colors"
          aria-label="View plans"
        >
          <FaExternalLinkAlt className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 border-t border-slate-200 space-y-3">
      <button
        onClick={handleTemporaryChat}
        className="w-full p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg 
                   transition-colors flex items-center space-x-3"
      >
        <FaClock className="w-4 h-4 text-yellow-600" />
        <span className="text-sm text-yellow-700">Temporary Chat</span>
      </button>

      <button
        onClick={handleViewPlans}
        className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg 
                   transition-colors flex items-center justify-between"
      >
        <span className="text-sm text-blue-700">View Plans</span>
        <FaExternalLinkAlt className="w-4 h-4 text-blue-600" />
      </button>
    </div>
  )
}
