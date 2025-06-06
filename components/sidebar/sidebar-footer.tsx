"use client"

import { FaExternalLinkAlt } from "react-icons/fa"
import type { IconType } from "react-icons"
import { useChatContext } from "@/context/chat-context"

const ExternalLinkIcon = FaExternalLinkAlt as IconType

export function SidebarFooter() {
  const { state } = useChatContext()

  const handleViewPlans = () => {
    window.open("https://example.com/plans", "_blank")
  }

  if (state.isSidebarCollapsed) {
    return (
      <div className="p-2 border-t border-slate-200 space-y-2">
        <button
          onClick={handleViewPlans}
          className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg 
                     flex items-center justify-center transition-colors"
          aria-label="View plans"
        >
          <ExternalLinkIcon className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 border-t border-slate-200 space-y-3">
      <button
        onClick={handleViewPlans}
        className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg 
                   transition-colors flex items-center justify-between"
      >
        <span className="text-sm text-blue-700">View Plans</span>
        <ExternalLinkIcon className="w-4 h-4 text-blue-600" />
      </button>
    </div>
  )
}
