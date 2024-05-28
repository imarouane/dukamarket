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
    async getProducts(url = null, search = '', perPage = 10, sort_field, sort_direction) {
      this.loading = true
      url = url || '/products'
      try {
        const { data } = await axiosClient(url, {
          params: {
            search,
            per_page: perPage,
            sort_field,
            sort_direction
          }
        })
        this.productsData = data.data
        const { meta } = data
        this.links = meta.links
        this.from = meta.from
        this.to = meta.to
        this.current_page = meta.current_page
        this.per_page = meta.per_page
        this.total = meta.total
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async createProduct(product) {
      if (product.image instanceof File) {
        const formData = new FormData()
        formData.append('title', product.title)
        formData.append('image', product.image)
        formData.append('description', product.description)
        formData.append('price', product.price)

        product = formData
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      return await axiosClient.post('/products', product, config)

      // console.log(response)
    }
  }
})
