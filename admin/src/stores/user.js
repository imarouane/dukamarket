import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('3535-dssdsd-54fdgwetv')
  const data = ref({})
  
  return { token, data }
})
