import { defineStore } from 'pinia'
import axiosClient from '@/axios'
export const useProductsStore = defineStore('product', {
  state: () => ({
    loading: false,
    productsData: [],
    links: [],
    from: null,
    to: null,
    current_page: 1,
    per_page: null,
    total: null
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    async getProducts(url = null) {
      this.loading = true
      url = url || '/products'
      try {
        const { data } = await axiosClient(url)
        this.productsData = data.data
        const { meta } = data
        this.links = meta.links
        this.from = meta.from
        this.to = meta.to
        this.current_page = meta.current_page
        this.per_page = meta.per_page
        this.total = meta.total
        // console.log(data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})
