import type { DatabaseDataSource } from "@/interfaces/database-datasource"
import type { Chat, Message } from "@/types/chat"

export class InMemoryDataSource implements DatabaseDataSource {
  private chats: Map<string, Chat> = new Map()
  private messages: Map<string, Message[]> = new Map()

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  async createChat(name: string): Promise<Chat> {
    const chat: Chat = {
      id: this.generateId(),
      name,
      messages: [],
      lastActivity: new Date(),
    }

    this.chats.set(chat.id, chat)
    this.messages.set(chat.id, [])

    return chat
  }

  async getChat(id: string): Promise<Chat | null> {
    const chat = this.chats.get(id)
    if (!chat) return null

    const messages = this.messages.get(id) || []
    return { ...chat, messages }
  }

  async getAllChats(): Promise<Chat[]> {
    const chats = Array.from(this.chats.values())
    return chats.map((chat) => ({
      ...chat,
      messages: this.messages.get(chat.id) || [],
    }))
  }

  async updateChat(id: string, updates: Partial<Chat>): Promise<Chat> {
    const existingChat = this.chats.get(id)
    if (!existingChat) throw new Error("Chat not found")

    const updatedChat = { ...existingChat, ...updates }
    this.chats.set(id, updatedChat)
    return updatedChat
  }

  async deleteChat(id: string): Promise<boolean> {
    const deleted = this.chats.delete(id)
    this.messages.delete(id)
    return deleted
  }

  async addMessage(chatId: string, message: Omit<Message, "id">): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: this.generateId(),
    }

    const chatMessages = this.messages.get(chatId) || []
    chatMessages.push(newMessage)
    this.messages.set(chatId, chatMessages)

    // Update chat's last activity and message
    const chat = this.chats.get(chatId)
    if (chat) {
      chat.lastActivity = new Date()
      chat.lastMessage = message.content.substring(0, 50)
      this.chats.set(chatId, chat)
    }

    return newMessage
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return this.messages.get(chatId) || []
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    for (const [chatId, messages] of this.messages.entries()) {
      const index = messages.findIndex((msg) => msg.id === messageId)
      if (index !== -1) {
        messages.splice(index, 1)
        this.messages.set(chatId, messages)
        return true
      }
    }
    return false
  }
}
