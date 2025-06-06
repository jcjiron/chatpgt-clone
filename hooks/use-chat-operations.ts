"use client"

import { useCallback } from "react"
import { useChatContext } from "@/context/chat-context"
import type { DatabaseDataSource } from "@/interfaces/database-datasource"
import { InMemoryDataSource } from "@/services/in-memory-datasource"

// Singleton instance for data persistence
const dataSource: DatabaseDataSource = new InMemoryDataSource()

export function useChatOperations() {
  const { state, dispatch } = useChatContext()

  const loadChats = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const chats = await dataSource.getAllChats()
      dispatch({ type: "SET_CHATS", payload: chats })
    } catch (error) {
      console.error("Error loading chats:", error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [dispatch])

  const createNewChat = useCallback(
    async (name: string) => {
      try {
        const newChat = await dataSource.createChat(name)
        dispatch({ type: "ADD_CHAT", payload: newChat })
        dispatch({ type: "SET_ACTIVE_CHAT", payload: newChat })
        return newChat
      } catch (error) {
        console.error("Error creating chat:", error)
        throw error
      }
    },
    [dispatch],
  )

  const sendMessage = useCallback(
    async (content: string, type: "text" | "voice" = "text") => {
      if (!state.activeChat) return

      try {
        dispatch({ type: "SET_LOADING", payload: true })

        // Add user message
        const userMessage = await dataSource.addMessage(state.activeChat.id, {
          content,
          type,
          sender: "user",
          timestamp: new Date(),
        })

        // Update chat with new message
        const updatedChat = await dataSource.getChat(state.activeChat.id)
        if (updatedChat) {
          dispatch({ type: "UPDATE_CHAT", payload: updatedChat })
        }

        // Simulate AI response with typing animation
        setTimeout(async () => {
          const responses = [
            "I understand your question. Let me help you with that.",
            "That's an excellent question. Let me explain:",
            "Based on the information you provided, I can suggest the following:",
            "Perfect, let's solve this step by step.",
            "Thank you for the information. My recommendation is:",
          ]

          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          await dataSource.addMessage(state.activeChat!.id, {
            content: randomResponse,
            type: "text",
            sender: "assistant",
            timestamp: new Date(),
          })

          const finalUpdatedChat = await dataSource.getChat(state.activeChat!.id)
          if (finalUpdatedChat) {
            dispatch({ type: "UPDATE_CHAT", payload: finalUpdatedChat })
          }

          dispatch({ type: "SET_LOADING", payload: false })
        }, 2000)
      } catch (error) {
        console.error("Error sending message:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    },
    [state.activeChat, dispatch],
  )

  const selectChat = useCallback(
    async (chatId: string) => {
      try {
        const chat = await dataSource.getChat(chatId)
        dispatch({ type: "SET_ACTIVE_CHAT", payload: chat })
      } catch (error) {
        console.error("Error selecting chat:", error)
      }
    },
    [dispatch],
  )

  const deleteChat = useCallback(
    async (chatId: string) => {
      try {
        await dataSource.deleteChat(chatId)
        dispatch({ type: "DELETE_CHAT", payload: chatId })
      } catch (error) {
        console.error("Error deleting chat:", error)
      }
    },
    [dispatch],
  )

  return {
    loadChats,
    createNewChat,
    sendMessage,
    selectChat,
    deleteChat,
  }
}
