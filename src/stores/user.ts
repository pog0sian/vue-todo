import { defineStore } from 'pinia'
import { User } from '@/types/User'
import { hashPassword } from '@/utils/hash'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,
    error: '' as string
  }),

  actions: {
    async register(email: string, firstName: string, lastName: string, password: string) {
      this.error = ''

      if (this.users.some((user) => user.email === email)) {
        this.error = 'Email is already registered.'
        return false
      }

      const passwordHash = await hashPassword(password)

      const newUser: User = {
        email,
        firstName,
        lastName,
        passwordHash
      }

      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))

      return true
    },

    async login(email: string, password: string) {
      this.error = ''

      const passwordHash = await hashPassword(password)

      const user = this.users.find(
        (user) => user.email === email && user.passwordHash === passwordHash
      )

      if (!user) {
        this.error = 'Invalid email or password.'
        return false
      }

      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))

      return true
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    }
  }
})
