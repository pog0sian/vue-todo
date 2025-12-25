<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const initials = computed(() => {
  if (!store.currentUser) return '?'
  const firstName = store.currentUser.firstName?.[0] ?? ''
  const lastName = store.currentUser.lastName?.[0] ?? ''
  return (firstName + lastName).toUpperCase()
})

const isAuth = computed(() => !!store.currentUser)

function onSignIn() {
  router.push('/login')
}
</script>

<template>
  <header
    class="w-full bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6"
  >
    <!-- Left -->
    <div class="flex items-center gap-4">
      <div v-if="$route.path === '/'" class="px-0 flex items-center gap-2">
        <span class="text-xl font-semibold">ToDo</span>
        <span class="mdi mdi-chart-bar text-xl text-blue-700"></span>
      </div>

      <!-- Search -->
      <div v-if="$route.path === '/dashboard'" class="relative">
        <input
          type="text"
          placeholder="Search for tasks..."
          class="w-80 px-8 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <span class="mdi mdi-magnify absolute left-3 top-1.5 text-gray-500"></span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- User Information -->
      <template v-if="isAuth">
        <div class="text-right">
          <div class="font-medium text-gray-800 text-xs">
            {{ store.currentUser?.firstName }} {{ store.currentUser?.lastName }}
          </div>
          <div class="text-gray-500 text-xs">
            {{ store.currentUser?.email }}
          </div>
        </div>

        <div
          class="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-semibold"
        >
          {{ initials }}
        </div>
      </template>

      <template v-else>
        <button @click="onSignIn" class="text-blue-700 text-sm px-4 py-1">Sign In</button>
      </template>
    </div>
  </header>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css');
</style>
