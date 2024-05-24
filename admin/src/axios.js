import axios from 'axios'
import router from './router'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('TOKEN')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default axiosClient
