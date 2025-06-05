"use client"

import { FaComments, FaProjectDiagram, FaPlus } from "react-icons/fa"
import { useChatOperations } from "@/hooks/use-chat-operations"

export function EmptyState() {
  const { createNewChat, createNewProject } = useChatOperations()

  const handleNewChat = async () => {
    try {
      await createNewChat(`Nuevo Chat ${Date.now()}`)
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  const handleNewProject = async () => {
    const name = prompt("Nombre del proyecto:")
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
        <FaComments className="w-16 h-16 text-slate-400 mx-auto mb-6" />

        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-4">Bienvenido al Chat Empresarial</h2>

        <p className="text-base text-slate-600 mb-8">
          Selecciona una conversación existente o crea una nueva para comenzar a chatear con nuestros asistentes de IA
          especializados.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleNewChat}
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-heading text-base font-medium">Nueva Conversación</span>
          </button>

          <button
            onClick={handleNewProject}
            className="w-full p-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 
                       rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            <FaProjectDiagram className="w-5 h-5" />
            <span className="font-heading text-base font-medium">Nuevo Proyecto</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="font-heading text-lg font-semibold text-slate-700 mb-3">Características</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Múltiples modelos de IA disponibles</li>
            <li>• Organización por proyectos</li>
            <li>• Historial de conversaciones</li>
            <li>• Mensajes de voz</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
