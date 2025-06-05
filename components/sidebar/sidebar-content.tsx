"use client"

import { useEffect } from "react"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"
import { ChatList } from "./chat-list"
import { ProjectList } from "./project-list"

export function SidebarContent() {
  const { state } = useChatContext()
  const { loadChats, loadProjects } = useChatOperations()

  useEffect(() => {
    loadChats()
    loadProjects()
  }, [loadChats, loadProjects])

  if (state.isSidebarCollapsed) {
    return (
      <div className="flex-1 p-2 space-y-2">
        {/* Collapsed view - only icons */}
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-xs text-blue-600">C</span>
        </div>
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <span className="text-xs text-yellow-600">P</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-6">
        <div>
          <h2 className="font-heading text-lg font-semibold text-slate-700 mb-3">Conversaciones</h2>
          <ChatList chats={state.chats.filter((chat) => !chat.projectId)} />
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-slate-700 mb-3">Proyectos</h2>
          <ProjectList projects={state.projects} />
        </div>
      </div>
    </div>
  )
}
