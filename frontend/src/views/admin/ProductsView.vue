<script setup>
import LayoutHead from '@/components/admin/LayoutHead.vue'
import ProductsTable from '@/components/admin/Products/ProductsTable.vue'
import ProductModal from '@/components/admin/Products/ProductModal.vue'
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const productModal = ref(false)
const action = ref('')

const selectedProduct = ref({
  id: '',
  title: '',
  description: '',
  image: null,
  price: ''
})

function showProductModal(actionName) {
  productModal.value = true
  action.value = actionName
}

function addProduct() {
  selectedProduct.value = {
    id: '',
    title: '',
    description: '',
    image: null,
    price: ''
  }
  showProductModal('create')
}

async function editProduct(product) {
  try {
    const { data } = await productsStore.getProduct(product.id)
    selectedProduct.value = { ...data }
    showProductModal('edit')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <LayoutHead head="Products">
    <button
      class="flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
      @click="addProduct()"
    >
      Add new Product
    </button>
  </LayoutHead>
  <ProductsTable @editClicked="editProduct" />
  <ProductModal v-model="productModal" :product="selectedProduct" :action="action" />
</template>

<style lang="scss" scoped></style>
