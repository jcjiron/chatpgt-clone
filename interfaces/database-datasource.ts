import type { Chat, Project, Message } from "@/types/chat"

export interface DatabaseDataSource {
  // Chat operations
  createChat(name: string, projectId?: string): Promise<Chat>
  getChat(id: string): Promise<Chat | null>
  getAllChats(): Promise<Chat[]>
  updateChat(id: string, updates: Partial<Chat>): Promise<Chat>
  deleteChat(id: string): Promise<boolean>

  // Project operations
  createProject(name: string, description?: string): Promise<Project>
  getProject(id: string): Promise<Project | null>
  getAllProjects(): Promise<Project[]>
  updateProject(id: string, updates: Partial<Project>): Promise<Project>
  deleteProject(id: string): Promise<boolean>

  // Message operations
  addMessage(chatId: string, message: Omit<Message, "id">): Promise<Message>
  getMessages(chatId: string): Promise<Message[]>
  deleteMessage(messageId: string): Promise<boolean>
}
