<script setup>
import GuestAuthLayout from '@/components/admin/GuestAuthLayout.vue'
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
  const { success, error } = await userStore.login(user)
  if (success) {
    isLoading.value = false
    router.push({ name: 'app.dashboard' })
  } else {
    isLoading.value = false
    errorMsg.value = error
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
        <BaseInput label="Password" type="password" name="password" v-model="user.password" />
      </div>

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

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm transition-all duration-300 hover:border-yellow-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          :class="{
            'cursor-not-allowed': isLoading,
            '!bg-white': isLoading,
            'border-yellow-500': isLoading
          }"
        >
          <TheSpinner v-if="isLoading" class="text-yellow-500" />
          <span>Sign in</span>
        </button>
      </div>
    </form>
  </guest-auth-layout>
</template>

<style lang="scss" scoped></style>
