"use client"

import type React from "react"
import { useState, useRef } from "react"
import { FaPaperPlane, FaMicrophone, FaStop } from "react-icons/fa"
import { useChatOperations } from "@/hooks/use-chat-operations"
import { useChatContext } from "@/context/chat-context"

export function ChatInput() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const { sendMessage } = useChatOperations()
  const { state } = useChatContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || state.isLoading) return

    const messageToSend = message.trim()
    setMessage("")

    try {
      await sendMessage(messageToSend)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      sendMessage("Voice message recorded", "voice")
    } else {
      setIsRecording(true)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  return (
    <div className="bg-white border-t border-slate-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              adjustTextareaHeight()
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full p-3 pr-12 border border-slate-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent resize-none min-h-[48px] max-h-[120px]
                       text-base"
            disabled={state.isLoading}
            rows={1}
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={toggleRecording}
            className={`
              p-3 rounded-lg transition-colors flex-shrink-0
              ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }
            `}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? <FaStop className="w-5 h-5" /> : <FaMicrophone className="w-5 h-5" />}
          </button>

          <button
            type="submit"
            disabled={!message.trim() || state.isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 
                       text-white rounded-lg transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </form>

      {isRecording && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <span className="text-sm">Recording...</span>
        </div>
      )}
    </div>
  )
}
