"use client"

import { useState } from "react"
import { FaProjectDiagram, FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa"
import type { IconType } from "react-icons"
import type { Project } from "@/types/chat"
import { useChatContext } from "@/context/chat-context"
import { useChatOperations } from "@/hooks/use-chat-operations"
import { ChatList } from "./chat-list"

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const { dispatch } = useChatContext()
  const { createNewProject, createNewChat } = useChatOperations()
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const ProjectIcon = FaProjectDiagram as IconType
  const ChevronDownIcon = FaChevronDown as IconType
  const ChevronRightIcon = FaChevronRight as IconType
  const PlusIcon = FaPlus as IconType

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  const handleCreateProject = async () => {
    const name = prompt("Project name:")
    if (name) {
      try {
        await createNewProject(name)
      } catch (error) {
        console.error("Error creating project:", error)
      }
    }
  }

  const handleCreateChatInProject = async (projectId: string) => {
    const name = prompt("Chat name:")
    if (name) {
      try {
        await createNewChat(name, projectId)
      } catch (error) {
        console.error("Error creating chat in project:", error)
      }
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCreateProject}
        className="w-full p-2 border-2 border-dashed border-slate-300 rounded-lg 
                   hover:border-blue-400 hover:bg-blue-50 transition-colors
                   flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-600">New Project</span>
      </button>

      {projects.map((project) => {
        const isExpanded = expandedProjects.has(project.id)

        return (
          <div key={project.id} className="border border-slate-200 rounded-lg">
            <div
              onClick={() => toggleProject(project.id)}
              className="p-3 cursor-pointer hover:bg-slate-50 transition-colors
                         flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <ProjectIcon className="w-5 h-5 text-yellow-600" />
                <div>
                  <h3 className="font-heading text-base font-medium text-slate-900">{project.name}</h3>
                  <p className="text-xs text-slate-500">{project.chats.length} chats</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCreateChatInProject(project.id)
                  }}
                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                  aria-label="Add chat to project"
                >
                  <PlusIcon className="w-3 h-3 text-blue-600" />
                </button>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="px-3 pb-3 border-t border-slate-100">
                <div className="mt-3">
                  <ChatList chats={project.chats} />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
