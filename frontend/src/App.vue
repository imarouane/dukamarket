<script setup>
import { useUserStore } from '@/stores/user'
import { onBeforeMount, inject } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const notificationStore = useNotificationStore()
const toast = useToast()
const emitter = inject('emitter')

emitter.on('notify', () => {
  if (notificationStore.message) {
    toast[notificationStore.type](notificationStore.message)
    notificationStore.clearNotification()
  }
})


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
