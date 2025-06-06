"use client"

import { FaBars, FaPlus } from "react-icons/fa"
import type { IconType } from "react-icons"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"

export function SidebarHeader() {
  const { state, dispatch } = useChatContext()
  const { createNewChat } = useChatOperations()

  const handleNewChat = async () => {
    try {
      await createNewChat(`New Chat ${Date.now()}`)
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }

  const BarsIcon = FaBars as IconType
  const PlusIcon = FaPlus as IconType

  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <BarsIcon className="w-4 h-4 text-slate-600" />
        </button>

        {!state.isSidebarCollapsed && (
          <>
            <h1 className="font-heading text-xl font-semibold text-slate-900">Enterprise Chat</h1>
            <button
              onClick={handleNewChat}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              aria-label="New chat"
            >
              <PlusIcon className="w-4 h-4 text-blue-600" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
