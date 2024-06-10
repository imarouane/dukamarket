<script setup>
import { onBeforeMount, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import TheSpinner from '@/components/core/TheSpinner.vue'
import NotFoundView from '@/views/NotFoundView.vue'
const productsStore = useProductsStore()

let product = ref({})
const isLoading = ref(false)
const productNotFound = ref(false)

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const { data } = await productsStore.getProductDetails(props.id)
    if (data && data.slug === props.slug) {
      product.value = data
    } else {
      productNotFound.value = true
    }
  } catch (error) {
    console.log(error)
    productNotFound.value = true
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <div v-if="isLoading" class="absolute inset-0 grid h-full w-full place-items-center">
    <TheSpinner class="size-6 !text-blue-500 sm:size-8" />
  </div>
  <NotFoundView v-else-if="productNotFound" />
  <div v-else>
    <div>{{ product }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
