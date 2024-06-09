<script setup>
import { onBeforeMount, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import TheSpinner from '@/components/core/TheSpinner.vue'
const productsSore = useProductsStore()
let product = ref({})

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

onBeforeMount(async () => {
  try {
    const { data } = await productsSore.getProductDetails(props.id)
    product.value = data
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <div>
    <div v-if="product">
      {{ product }}
    </div>
    <div class="absolute inset-0 grid h-full w-full place-items-center" v-else>
      <TheSpinner class="size-6 !text-blue-500" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
