<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";

const store = useUserStore();

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const confirmPassword = ref('');

const errors = ref({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
})

function validate() {
  errors.value = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  }

  let valid = true;

  if (!email.value.includes('@')) {
    errors.value.email = 'Enter a valid email address'
    valid = false
  }

  if (!firstName.value.trim()) {
    errors.value.firstName = 'Enter your first name'
    valid = false
  }

  if (!lastName.value.trim()) {
    errors.value.lastName = 'Enter your last name'
    valid = false
  }

  if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
    valid = false
  }

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    valid = false
  }

  return valid;
}

async function handleRegister() {
  if (!validate()) return

  const ok = await store.register(
    email.value,
    firstName.value,
    lastName.value,
    password.value
  )

  if(ok) {
    window.location.href = '/dashboard'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left Side: Registration Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-20">
      <div class="w-full max-w-md">

        <h1 class="text-4xl font-semibold pb-8">Create Your Personal Account</h1>

        <form class="space-y-4" @submit.prevent="handleRegister">

          <div class="flex gap-4">
            <input class="w-full border-2 border-gray-300 rounded-lg p-2"
                   v-model="firstName"
                   type="text"
                   placeholder="First Name" required />
            <input class="w-full border-2 border-gray-300 rounded-lg p-2"
                   v-model="lastName"
                   type="text"
                   placeholder="Last Name" required />
          </div>

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

          <div>
            <input class="w-full border-2 border-gray-300 rounded-lg p-2"
                   v-model="confirmPassword"
                   type="password"
                   placeholder="Confirm Password" required />
            <p v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
          </div>

          <button class="w-full bg-blue-700 rounded-lg p-2 text-white mb-4"
              type="submit">Sign Up
          </button>

          <p v-if="store.error">{{ store.error }}</p>
        </form>

        <p class="text-center">Already have an account? <router-link class="text-blue-500" to="/login">Sign In</router-link></p>

      </div>
    </div>

    <!-- Right Side: Decorative or Informational Content -->
    <div class="w-full md:w-1/2 bg-blue-700 flex items-center justify-center p-8">

    </div>

  </div>
</template>

<style scoped>

</style>

