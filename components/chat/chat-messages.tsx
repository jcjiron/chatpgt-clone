"use client"

import { useEffect, useRef } from "react"
import { FaUserCircle, FaRobot, FaSpinner } from "react-icons/fa"
import { useChatContext } from "@/context/chat-context"
import type { Message } from "@/types/chat"
import { TypingAnimation } from "./typing-animation"

export function ChatMessages() {
  const { state } = useChatContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.activeChat?.messages])

  if (!state.activeChat) return null

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {state.activeChat.messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {state.isLoading && (
        <div className="flex items-start space-x-3">
          <FaRobot className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
          <div className="bg-slate-100 rounded-lg p-4 max-w-xs lg:max-w-md">
            <div className="flex items-center space-x-2">
              <FaSpinner className="w-4 h-4 text-slate-600 animate-spin" />
              <span className="text-sm text-slate-600">Escribiendo...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {isUser ? (
        <FaUserCircle className="w-8 h-8 text-slate-400 flex-shrink-0 mt-1" />
      ) : (
        <FaRobot className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
      )}

      <div
        className={`
        rounded-lg p-4 max-w-xs lg:max-w-md
        ${isUser ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"}
      `}
      >
        {message.type === "voice" ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-current rounded-full opacity-60" />
            <span className="text-sm">Mensaje de voz</span>
          </div>
        ) : (
          <div className="text-base">
            {message.isTyping ? <TypingAnimation text={message.content} /> : message.content}
          </div>
        )}

        <div className={`text-xs mt-2 opacity-70`}>{message.timestamp.toLocaleTimeString()}</div>
      </div>
    </div>
  )
}
