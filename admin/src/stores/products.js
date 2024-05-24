import { defineStore } from 'pinia'

export const useProductsStore = defineStore('product', {
  state: () => ({ loading: false, data: [] }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
