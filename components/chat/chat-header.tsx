"use client"

import { useState } from "react"
import { ChevronDown, Bot } from "lucide-react"
import { useChatContext } from "@/context/chat-context"

export function ChatHeader() {
  const { state, dispatch } = useChatContext()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleAgentChange = (agentId: string) => {
    const agent = state.agents.find((a) => a.id === agentId)
    if (agent) {
      dispatch({ type: "SET_SELECTED_AGENT", payload: agent })
    }
    setIsDropdownOpen(false)
  }

  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="font-heading text-xl font-semibold text-slate-900">{state.activeChat?.name || "Chat"}</h1>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-50 
                       hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="text-sm text-slate-700">{state.selectedAgent.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 
                           rounded-lg shadow-lg z-50"
            >
              {state.agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentChange(agent.id)}
                  className={`
                    w-full text-left p-3 hover:bg-slate-50 transition-colors
                    ${state.selectedAgent.id === agent.id ? "bg-blue-50" : ""}
                  `}
                >
                  <div className="font-heading text-base font-medium text-slate-900">{agent.name}</div>
                  <div className="text-sm text-slate-500">{agent.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
