<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const props = defineProps<{
  items?: { id: string; label: string; icon: string }[]
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const router = useRouter()
const userStore = useUserStore()

const items = computed(
  () =>
    props.items ?? [
      { id: 'dashboard', label: 'Dashboard', icon: 'mdi-view-dashboard' },
      { id: 'tasks', label: 'Tasks', icon: 'mdi-format-list-checkbox' },
      { id: 'goals', label: 'Goals', icon: 'mdi-target' },
      { id: 'calendar', label: 'Calendar', icon: 'mdi-calendar' },
      { id: 'settings', label: 'Settings', icon: 'mdi-cog' } // settings как обычный пункт
    ]
)

const activeId = ref(props.modelValue ?? items.value[0].id)

watch(
  () => props.modelValue,
  (v) => {
    if (v && v !== activeId.value) activeId.value = v
  }
)

function select(id: string) {
  if (activeId.value === id) return
  activeId.value = id
  emit('update:modelValue', id)
  emit('change', id)
}

function logout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <aside class="w-44 bg-neutral-800 text-gray-200 text-sm font-regular h-screen py-4 flex flex-col">
    <div class="flex items-center justify-center gap-2 pb-6">
      <span class="text-xl font-semibold">ToDo</span>
      <span class="mdi mdi-chart-bar text-xl text-blue-700"></span>
    </div>

    <nav class="flex flex-col gap-1">
      <button
        v-for="item in items"
        :key="item.id"
        @click="select(item.id)"
        :class="[
          'flex items-center gap-3 px-4 py-2 transition-colors',
          item.id === activeId
            ? 'bg-neutral-700 text-white font-regular'
            : 'hover:bg-neutral-700/40 text-gray-300'
        ]"
      >
        <span :class="`mdi ${item.icon} text-xl`"></span>
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="px-2 pt-4 mt-auto">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
      >
        <span class="mdi mdi-logout text-xl"></span>
        <span>Log Out</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css');
</style>
