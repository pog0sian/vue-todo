// File: src/stores/task.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '@/types/Task'
import { Subtask } from '@/types/Subtask'
import type { Priority } from '@/types/Task'

export type TaskWithSubs = Task & { subtasks: Subtask[] }

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<TaskWithSubs[]>([])

    const addTask = (title: string, ownerId: string, description = '', priority: Priority = 'medium') => {
        tasks.value.push({
            id: uuidv4(),
            title,
            completed: false,
            ownerId,
            priority,
            subtasks: []
        })
    }

    const addSubtask = (taskId: string, title: string) => {
        const t = tasks.value.find(x => x.id === taskId)
        if (!t) return
        t.subtasks.push({ id: uuidv4(), title, completed: false })
        t.completed = false
    }

    const toggleSubtask = (taskId: string, subId: string) => {
        const t = tasks.value.find(x => x.id === taskId)
        if (!t) return
        const s = t.subtasks.find(x => x.id === subId)
        if (!s) return
        s.completed = !s.completed
        t.completed = t.subtasks.length > 0 ? t.subtasks.every(x => x.completed) : t.completed
    }

    const toggleTask = (taskId: string) => {
        const t = tasks.value.find(x => x.id === taskId)
        if (!t) return
        const next = !t.completed
        t.completed = next
        t.subtasks.forEach(s => (s.completed = next))
    }

    const removeSubtask = (taskId: string, subId: string) => {
        const t = tasks.value.find(x => x.id === taskId)
        if (!t) return
        t.subtasks = t.subtasks.filter(x => x.id !== subId)
        t.completed = t.subtasks.length > 0 ? t.subtasks.every(x => x.completed) : t.completed
    }

    const getProgress = (taskId: string) =>
        computed(() => {
            const t = tasks.value.find(x => x.id === taskId)
            if (!t) return 0
            if (t.subtasks.length === 0) return t.completed ? 100 : 0
            const done = t.subtasks.filter(s => s.completed).length
            return Math.round((done / t.subtasks.length) * 100)
        })

    const getTasksByUser = (userId: string) => computed(() => tasks.value.filter(t => t.ownerId === userId))

    const setPriority = (taskId: string, priority: Priority) => {
        const t = tasks.value.find(x => x.id === taskId)
        if (!t) return
        t.priority = priority
    }

    return {
        tasks,
        addTask,
        addSubtask,
        toggleSubtask,
        toggleTask,
        removeSubtask,
        getProgress,
        getTasksByUser,
        setPriority
    }
})

