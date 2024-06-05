<script setup>
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'

const userStore = useUserStore()

onBeforeMount(() => {
  if (userStore.isLoggedIn) {
    userStore.getUser()
  }
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
