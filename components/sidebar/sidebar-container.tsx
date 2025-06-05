"use client"

import { useChatContext } from "@/context/chat-context"
import { SidebarHeader } from "./sidebar-header"
import { SidebarContent } from "./sidebar-content"
import { SidebarFooter } from "./sidebar-footer"

export function SidebarContainer() {
  const { state } = useChatContext()

  return (
    <div
      className={`
      fixed left-0 top-0 h-full bg-slate-50 border-r border-slate-200 
      transition-all duration-300 ease-in-out z-40
      ${state.isSidebarCollapsed ? "w-16" : "w-80"}
    `}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </div>
    </div>
  )
}
