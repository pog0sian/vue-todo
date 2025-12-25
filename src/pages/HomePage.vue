<script setup>
import TopBar from "@/components/TopBar.vue";
import { useUserStore } from '@/stores/user'
import {computed} from "vue";
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()
const isAuth = computed(() => !!store.currentUser)

function onSignIn() {
  router.push('/login')
}

</script>

<template>
  <TopBar />
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">

    <!-- Left Side: Illustration -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <img src="@/assets/images/dashboard.png" alt="Dashboard illustration" class="max-w-full h-auto">
    </div>

    <!-- Right Side: Welcome Text and Button -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8">
      <div class="max-w-lg">
        <h1 class="text-4xl font-semibold pb-8">Welcome to Your Personal<br/>Productivity Dashboard</h1>
        <p class="pb-8">It will be your trusted companion in the world of achievements and success</p>
        <template v-if="isAuth">
          <router-link to="/dashboard" class="bg-blue-700 text-white rounded-lg px-6 py-2 inline-block">Get started</router-link>
        </template>
        <template v-else>
          <router-link to="/login" class="bg-blue-700 text-white rounded-lg px-6 py-2 inline-block">Get started</router-link>
        </template>
      </div>
    </div>
  </div>

  <div>

  </div>

</template>

<style scoped>

</style>

