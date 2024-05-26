<script setup>
import ProductsTable from '@/components/Products/ProductsTable.vue'
import ProductModal from '@/components/Products/ProductModal.vue'
import { ref } from 'vue'

const productModal = ref(false)

function showProductModal() {
  productModal.value = true
}
</script>

<template>
  <div class="mb-3 mt-10 flex items-center justify-between">
    <h2 class="text-3xl font-semibold">Products</h2>
    <button
      class="flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      @click="showProductModal"
    >
      Add new Product
    </button>
  </div>
  <ProductsTable />
  <ProductModal v-model="productModal" />
</template>

<style lang="scss" scoped></style>
