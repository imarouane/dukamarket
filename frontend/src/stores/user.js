import axiosClient from '@/axios'
import { useNotificationStore } from '@/stores/notification'
import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const userToken = ref(sessionStorage.getItem('TOKEN'))
  const userData = reactive({})
  const isLoggedIn = computed(() => !!userToken.value)
  const isAdmin = computed(() => !!userData.value?.is_admin || false)
  const notificationStore = useNotificationStore()

  async function getToken() {
    await axios.get('/sanctum/csrf-cookie')
  }

  async function getUser() {
    try {
      const { data } = await axiosClient.get('/user')
      userData.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function register(userFormData) {
    getToken()
    try {
      const { data } = await axiosClient.post('/register', userFormData, {
        withCredentials: true,
        withXSRFToken: true
      })
      const { token, user } = data

      sessionStorage.setItem('TOKEN', token)
      userToken.value = token
      userData.value = user
      getUser()
      notificationStore.setNotification('Welcome! Your registration was successful.')

      return { success: true, error: '' }
    } catch (error) {
      if (error.response?.status === 422) {
        return { success: false, error: error.response?.data?.message }
      } else {
        sessionStorage.removeItem('TOKEN')
        userToken.value = null
        return { success: false, error: 'An error occurred during registration' }
      }
    }
  }

  async function login(userFormData) {
    getToken()
    try {
      const { data } = await axiosClient.post('/login', userFormData, {
        withCredentials: true,
        withXSRFToken: true
      })
      const { token, user } = data

      sessionStorage.setItem('TOKEN', token)
      userToken.value = token
      userData.value = user
      getUser()
      notificationStore.setNotification("Welcome back! You've logged in successfully.")

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
    getToken()
    try {
      await axiosClient.post('/logout', null, {
        withCredentials: true,
        withXSRFToken: true
      })

      userToken.value = null
      userData.value = {}

      sessionStorage.removeItem('TOKEN')
      notificationStore.setNotification('You have been successfully logged out.')
      return { success: true, error: '' }
    } catch (error) {
      userToken.value = null
      userData.value = {}
      sessionStorage.removeItem('TOKEN')

      return { success: false, error: 'An error occurred during logout' }
    }
  }

  return { userData, register, login, logout, getUser, isAdmin, isLoggedIn }
})
