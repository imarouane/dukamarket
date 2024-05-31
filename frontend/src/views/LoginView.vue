<script setup>
import GuestAuthLayout from '@/components/GuestAuthLayout.vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import TheSpinner from '@/components/core/TheSpinner.vue'
import BaseInput from '@/components/core/BaseInput.vue'

const router = useRouter()

const isLoading = ref(false)
const errorMsg = ref('')

const userStore = useUserStore()

const user = reactive({
  email: '',
  password: '',
  remember: false
})

async function login() {
  isLoading.value = true
  try {
    const { success, error } = await userStore.login(user)
    if (success) {
      router.push({ name: 'app.dashboard' })
    } else {
      errorMsg.value = error
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <guest-auth-layout title="Sign in to your account">
    <form class="space-y-6" @submit.prevent="login" method="POST">
      <div
        class="rounded-md bg-gray-200 px-3 py-1 text-center font-medium text-red-500"
        v-if="errorMsg"
      >
        {{ errorMsg }}
      </div>
      <div>
        <BaseInput label="Email address" type="email" name="email" v-model="user.email" />
      </div>
      <div>
        <BaseInput label="password" type="password" name="password" v-model="user.password" />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              v-model="user.remember"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <label for="remember" class="ms-2 text-sm font-medium">Remember me</label>
        </div>
        <div class="text-sm">
          <router-link
            :to="{ name: 'password.forgot' }"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
            >Forgot password?</router-link
          >
        </div>
      </div>

      <div>
        <svg
          class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="{
            'cursor-not-allowed': isLoading,
            'bg-indigo-500': isLoading
          }"
        >
          <TheSpinner v-if="isLoading" />
          <span v-if="!isLoading">Sign in</span>
        </button>
      </div>
    </form>
  </guest-auth-layout>
</template>

<style lang="scss" scoped></style>
