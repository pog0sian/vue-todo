import { Subtask } from '@/types/Subtask'
export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  subtasks: Subtask[]
  ownerId: string
  completed: boolean
  priority: Priority
}
