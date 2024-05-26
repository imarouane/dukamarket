<script setup>
import GuestAuthLayout from '@/components/GuestAuthLayout.vue'
import BaseInput from '@/components/core/BaseInput.vue'
</script>

<template>
  >
  <guest-auth-layout title="Reset Password">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <BaseInput label="New Passowrd" type="password" name="password" />
      </div>

      <div>
        <BaseInput label="Confirm Password" type="password" name="password_confirmation" />
      </div>
      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset Password
        </button>
      </div>
    </form>
  </guest-auth-layout>
</template>

<style lang="scss" scoped></style>
