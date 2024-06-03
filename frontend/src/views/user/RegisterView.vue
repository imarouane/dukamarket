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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

async function regiter() {
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
  <div class="mt-10 flex flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800 sm:text-3xl"
      >
        Sign Up
      </h2>
    </div>
    <div class="mt-10 px-3 sm:mx-auto sm:w-full sm:max-w-sm sm:px-0">
      <slot></slot>
      <form class="space-y-6" @submit.prevent="regiter" method="POST">
        <div
          class="rounded-md bg-gray-200 px-3 py-1 text-center font-medium text-red-500"
          v-if="errorMsg"
        >
          {{ errorMsg }}
        </div>
        <div>
          <BaseInput label="Name" type="text" name="name" v-model="user.name" />
        </div>
        <div>
          <BaseInput label="Email address" type="email" name="email" v-model="user.email" />
        </div>
        <div>
          <BaseInput label="Password" type="password" name="password" v-model="user.password" />
        </div>
        <div>
          <BaseInput
            label="Password Confirmation"
            type="password"
            name="password_confirmation"
            v-model="user.password"
          />
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
            <span v-if="!isLoading">Sign in</span>
          </button>
        </div>
      </form>
      <div class="mt-6 flex justify-center gap-2 border-t py-4">
        <p>Do you have an account?</p>
        <router-link
          class="font-medium text-blue-700 decoration-blue-700 underline-offset-2 transition-all duration-200 hover:underline"
          :to="{ name: 'login' }"
          >Sign in</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
