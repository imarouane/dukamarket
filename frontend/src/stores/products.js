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
      url = url || 'admin/products'
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
    createProduct(product) {
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
        },
      }

      return axiosClient.post('admin/products', product, config)
    },

    deleteProduct(id) {
      return axiosClient.delete(`admin/products/${id}`)
    },

    getProduct(id) {
      return axiosClient.get(`admin/products/${id}`)
    },

    updateProduct(product) {
      const id = product.id
      if (product.image instanceof File) {
        const formData = new FormData()
        formData.append('title', product.title)
        formData.append('image', product.image)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('_method', 'PUT')
      }
      product._method = 'PUT'
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return axiosClient.post(`admin/products/${id}`, product, config)
    },

    async getUserProducts(url = null, search = '', sort_field, sort_direction) {
      this.loading = true
      url = url || '/products'
      try {
        const { data } = await axiosClient(url, {
          params: {
            search,
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
    }
  }
})
