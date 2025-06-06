import type { Chat, Message } from "@/types/chat"

export interface DatabaseDataSource {
  // Chat operations
  createChat(name: string): Promise<Chat>
  getChat(id: string): Promise<Chat | null>
  getAllChats(): Promise<Chat[]>
  updateChat(id: string, updates: Partial<Chat>): Promise<Chat>
  deleteChat(id: string): Promise<boolean>

  // Message operations
  addMessage(chatId: string, message: Omit<Message, "id">): Promise<Message>
  getMessages(chatId: string): Promise<Message[]>
  deleteMessage(messageId: string): Promise<boolean>
}
