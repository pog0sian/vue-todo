<script setup>
import '@/assets/styles/tailwind.css';
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";

const store = useUserStore();

const email = ref('');
const password = ref('');

const errors = ref({
  email: '',
  password: ''
})

function validate() {
  errors.value = ({
    email: '',
    password: ''
  })

  let valid = true;

  if (!email.value.includes('@')) {
    errors.value.email = 'Enter a valid email address'
    valid = false
  }

  if (!password.value.trim()) {
    errors.value.password = 'Enter your password'
    valid = false
  }

  return valid
}

async function handleLogin() {
  if (!validate()) return

  const ok = await store.login(email.value, password.value)

  if (ok) {
    window.location.href = '/dashboard'
  }
}

</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left Side: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-20">
      <div class="w-full max-w-md">

        <h1 class="text-4xl font-semibold pb-8">Sign In To Your<br>Personal Account</h1>

        <form class="space-y-4" @submit.prevent="handleLogin">

          <div>
            <input class="w-full border-2 border-gray-300 rounded-lg p-2"
                   v-model="email"
                   type="email"
                   placeholder="Email address" required />
            <p v-if="errors.email">{{ errors.email }}</p>
          </div>

          <div>
            <input class="w-full border-2 border-gray-300 rounded-lg p-2"
                   v-model="password"
                   type="password"
                   placeholder="Password" required />
            <p v-if="errors.password">{{ errors.password }}</p>
          </div>

          <button class="w-full bg-blue-700 rounded-lg p-2 text-white mb-4"
              type="submit">Sign In
          </button>

          <p v-if="store.error">{{ store.error }}</p>
        </form>

        <p class="text-center">Not signed up yet? <router-link class="text-blue-500" to="/register">Create an account</router-link></p>

      </div>
    </div>

    <!-- Right Side: Decorative or Informational Content -->
    <div class="w-full md:w-1/2 bg-blue-700 flex items-center justify-center p-8">

    </div>

  </div>
</template>

<style scoped>

</style>

