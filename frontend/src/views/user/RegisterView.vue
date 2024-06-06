<script setup>
import TheNavbar from '@/sections/TheNavbar.vue'
import TheSpinner from '@/components/core/TheSpinner.vue'
import BaseInput from '@/components/core/BaseInput.vue'
import useVuelidate from '@vuelidate/core'
import { ref, computed, reactive, inject } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { required, email, sameAs, minLength, maxLength, helpers } from '@vuelidate/validators'

const emitter = inject('emitter')
const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

const userStore = useUserStore()

const userData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('The name field is required', required),
      minLength: helpers.withMessage(
        'The name field requires a minimum of 6 characters.',
        minLength(6)
      ),
      maxLength: maxLength(255)
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Please enter a valid email address.', email),
      maxLength: maxLength(255)
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: helpers.withMessage(
        'The password field requires a minimum of 8 characters.',
        minLength(8)
      ),
      maxLength: maxLength(255)
    },
    password_confirmation: {
      required: helpers.withMessage('The password confirmation field is required', required),
      sameAs: helpers.withMessage(
        'Passwords do not match. Please re-enter the same password.',
        sameAs(userData.password)
      )
    }
  }
})

const v$ = useVuelidate(rules, userData)
async function regiter() {
  const isFormValid = await v$.value.$validate()
  console.log(isFormValid)
  if (isFormValid) {
    isLoading.value = true
    const { success, error } = await userStore.register(userData)
    if (success) {
      isLoading.value = false
      emitter.emit('notify')
      router.push({ name: 'home' })
    } else {
      isLoading.value = false
      errorMsg.value = error
    }
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
          <BaseInput
            label="Name"
            type="text"
            name="name"
            :class="{
              'ring-red-500 focus:ring-red-500': v$.$errors.find((err) => err.$property === 'name')
            }"
            placeholder="First and last name"
            v-model="userData.name"
          />
          <span class="mt-1 block text-sm font-semibold text-red-400" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </span>
        </div>
        <div>
          <BaseInput
            label="Email address"
            type="email"
            name="email"
            :class="{
              'ring-red-500 focus:ring-red-500': v$.$errors.find((err) => err.$property === 'email')
            }"
            v-model="userData.email"
          />
          <span class="mt-1 block text-sm font-semibold text-red-400" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div>
          <BaseInput
            label="Password"
            type="password"
            name="password"
            :class="{
              'ring-red-500 focus:ring-red-500': v$.$errors.find(
                (err) => err.$property === 'password'
              )
            }"
            placeholder="At least 8 characters"
            v-model="userData.password"
          />
          <span class="mt-1 block text-sm font-semibold text-red-400" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>
        <div>
          <BaseInput
            label="Password Confirmation"
            type="password"
            name="password_confirmation"
            :class="{
              'ring-red-500 focus:ring-red-500': v$.$errors.find(
                (err) => err.$property === 'password_confirmation'
              )
            }"
            v-model="userData.password_confirmation"
          />
          <span
            class="mt-1 block text-sm font-semibold text-red-400"
            v-if="v$.password_confirmation.$error"
          >
            {{ v$.password_confirmation.$errors[0].$message }}
          </span>
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
            <span>Sign up</span>
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
