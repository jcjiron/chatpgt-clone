"use client"

import { FaComments, FaProjectDiagram, FaPlus } from "react-icons/fa"
import type { IconType } from "react-icons"
import { useChatOperations } from "@/hooks/use-chat-operations"

const CommentsIcon = FaComments as IconType
const ProjectIcon = FaProjectDiagram as IconType
const PlusIcon = FaPlus as IconType

export function EmptyState() {
  const { createNewChat, createNewProject } = useChatOperations()

  const handleNewChat = async () => {
    try {
      await createNewChat(`New Chat ${Date.now()}`)
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  const handleNewProject = async () => {
    const name = prompt("Project name:")
    if (name) {
      try {
        await createNewProject(name)
      } catch (error) {
        console.error("Error creating project:", error)
      }
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-25">
      <div className="text-center max-w-md mx-auto p-8">
        <CommentsIcon className="w-16 h-16 text-slate-400 mx-auto mb-6" />

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
            <PlusIcon className="w-5 h-5" />
            <span className="font-heading text-base font-medium">New Conversation</span>
          </button>

          <button
            onClick={handleNewProject}
            className="w-full p-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 
                       rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <ProjectIcon className="w-5 h-5" />
            <span className="font-heading text-base font-medium">New Project</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-heading text-lg font-semibold text-slate-700 mb-3">Features</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Multiple AI models available</li>
            <li>• Project organization</li>
            <li>• Conversation history</li>
            <li>• Voice messages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
