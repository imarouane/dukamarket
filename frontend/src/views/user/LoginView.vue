<script setup>
import TheNavbar from '@/sections/TheNavbar.vue'
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
  <TheNavbar />
  <div class="mt-12 flex flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800 sm:text-3xl"
      >
        Sign In to your Account
      </h2>
    </div>
    <div class="mt-10 px-3 sm:mx-auto sm:w-full sm:max-w-sm sm:px-0">
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
          <BaseInput label="Password" type="password" name="password" v-model="user.password" />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex h-5 items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                v-model="user.remember"
                class="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-600"
              />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium">Remember me</label>
          </div>
          <div class="text-sm">
            <router-link
              :to="{ name: 'password.forgot' }"
              class="font-semibold text-blue-700 hover:text-yellow-500"
              >Forgot password?</router-link
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm transition-all duration-300 hover:border-yellow-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="{
              'cursor-not-allowed': isLoading,
              'bg-white': isLoading
            }"
          >
            <TheSpinner v-if="isLoading" class="text-yellow-500" />
            <span>Sign in</span>
          </button>
        </div>
      </form>

      <div class="mt-6 flex justify-center gap-2 border-t py-4">
        <p>Don't have an account?</p>
        <router-link
          class="font-medium text-blue-700 decoration-blue-700 underline-offset-2 transition-all duration-200 hover:underline"
          :to="{ name: 'register' }"
          >Register Here</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
