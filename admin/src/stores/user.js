import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '@/axios'
export const useUserStore = defineStore('user', () => {
  const userToken = ref(sessionStorage.getItem('TOKEN'))
  const userData = reactive({})

  async function login(userForm) {
    try {
      const { data } = await axiosClient.post('/login', userForm)
      const { token, user } = data

      sessionStorage.setItem('TOKEN', token)
      userToken.value = token
      userData.value = user
      
      return { success: true, error: '' }
    } catch (error) {
      if (error.response?.status === 422) {
        return { success: false, error: error.response?.data?.message }
      } else {
        sessionStorage.removeItem('TOKEN')
        userToken.value = null
        return { success: false, error: 'An error occurred during login' }
      }
    }
  }

  async function logout() {
    try {
      await axiosClient.post('/logout')

      userToken.value = null
      userData.value = {}

      sessionStorage.removeItem('TOKEN')
      return { success: true, error: '' }
    } catch (error) {
      userToken.value = null
      userData.value = {}
      sessionStorage.removeItem('TOKEN')

      return { success: false, error: 'An error occurred during logout' }
    }
  }

  async function getUser() {
    try {
      const { data } = await axiosClient.get('/user')
      userData.value = data
    } catch (error) {
      console.error(error)
    }
  }
  return { userToken, userData, login, logout, getUser }
})
