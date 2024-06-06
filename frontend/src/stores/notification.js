import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref(null)
  const type = ref('')

  function setNotification(newMessage, newType = 'success') {
    message.value = newMessage
    type.value = newType
  }

  function clearNotification() {
    message.value = null
    type.value = ''
  }

  return {
    message,
    type,
    setNotification,
    clearNotification
  }
})
