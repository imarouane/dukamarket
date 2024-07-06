import { defineStore } from 'pinia'
import axiosClient from '@/axios'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    async addToCart(product, quantity = 1) {
      try {
        const userStore = useUserStore()
        const notificationStore = useNotificationStore()
        const url = userStore.isLoggedIn ? '/cart/add/' : '/cart/guest/add/'
        await axiosClient.post(`${url}${product.id}`, { quantity })
        notificationStore.setNotification('Your item has been added successfully.')
        this.getCart()
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    },
    async getCart() {
      try {
        const userStore = useUserStore()
        const url = userStore.isLoggedIn ? '/cart' : '/cart/guest'
        const response = await axiosClient.get(url)
        this.cart = response.data
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    },
    async removeFromCart(product) {
      try {
        const userStore = useUserStore()
        const notificationStore = useNotificationStore()
        const url = userStore.isLoggedIn ? '/cart/remove/' : '/cart/guest/remove/'
        await axiosClient.post(`${url}${product.id}`)
        notificationStore.setNotification('Item removed from your cart.')
        this.getCart()
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    },
    async updateQuantity(product, quantity) {
      try {
        const userStore = useUserStore()
        const notificationStore = useNotificationStore()
        const url = userStore.isLoggedIn ? '/cart/update/' : '/cart/guest/update/'
        await axiosClient.post(`${url}${product.id}`, { quantity })
        notificationStore.setNotification('Quantity updated successfully.')
        this.getCart()
      } catch (error) {
        console.error('Error updating cart quantity:', error)
      }
    }
  }
})
