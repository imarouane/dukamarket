<script setup>
import { onBeforeMount, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import { StarIcon } from '@heroicons/vue/24/solid'
import { StarIcon as EmptyStarIcon, HeartIcon } from '@heroicons/vue/24/outline'
import TheSpinner from '@/components/core/TheSpinner.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TheNavbar from '@/sections/TheNavbar.vue'
import ProductCountInput from '@/components/user/ProductCountInput.vue'
const productsStore = useProductsStore()
const productQuantity = ref(1)
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
  <TheNavbar />
  <div v-if="isLoading" class="absolute inset-0 grid h-full w-full place-items-center">
    <TheSpinner class="size-6 !text-blue-500 sm:size-8" />
  </div>
  <NotFoundView v-else-if="productNotFound" />
  <div v-else class="container mx-auto py-12">
    <h2 class="px-4 text-2xl font-semibold text-gray-800 sm:px-6">Poduct Detailts</h2>
    <div class="flex flex-col items-start gap-10 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:basis-1/2">
        <div class="flex justify-between gap-4 sm:mr-6 sm:flex-col">
          <button
            class="border-yellow-primary flex h-24 items-center justify-center overflow-hidden border bg-gray-100 sm:w-28"
          >
            <img :src="product.image_url" alt="" class="h-auto w-full" />
          </button>
          <button
            class="flex h-24 items-center justify-center overflow-hidden border bg-gray-100 sm:w-28"
          >
            <img :src="product.image_url" alt="" class="h-auto w-full" />
          </button>
          <button
            class="flex h-24 items-center justify-center overflow-hidden border bg-gray-100 sm:w-28"
          >
            <img :src="product.image_url" alt="" class="h-auto w-full" />
          </button>
        </div>
        <div class="flex items-center justify-center bg-gray-100">
          <img :src="product.image_url" alt="" />
        </div>
      </div>
      <div class="w-full divide-y-2 divide-gray-100 lg:ml-6 lg:basis-1/2">
        <div class="flex flex-col gap-2 pb-3">
          <h2 class="text-2xl font-bold text-blue-600">{{ product.title }}</h2>
          <div>
            <div class="flex gap-1">
              <StarIcon class="size-5 text-yellow-500" />
              <StarIcon class="size-5 text-yellow-500" />
              <StarIcon class="size-5 text-yellow-500" />
              <StarIcon class="size-5 text-yellow-500" />
              <!-- <StarIcon class="size-5 text-yellow-500" /> -->
              <EmptyStarIcon class="size-5 text-yellow-500" />
            </div>
            <span>(12 Reviews)</span>
          </div>
          <h3 class="text-xl font-black">$ {{ product.price }}</h3>
        </div>
        <div class="flex flex-col gap-4 py-3">
          <ul class="flex list-disc flex-col gap-2 pl-4 font-semibold text-gray-600">
            <li>Bass and Stereo Sound</li>
            <li>Display with 3088 x 1440 pixels resolution.</li>
            <li>Memory, Storage & SIM: 12GB RAM, 256GB</li>
            <li>Android v10.0 Operating system.</li>
          </ul>
          <div class="mt-1 flex items-center gap-2 font-semibold text-gray-800">
            <span class="">Availability:</span
            ><span class="rounded bg-sky-200 px-2 py-0.5 text-sm text-sky-400">In Stock</span>
          </div>
          <div class="flex gap-4">
            <ProductCountInput v-model:count="productQuantity" />
            <button
              class="bg-yellow-primary text-nowrap px-5 py-2 font-semibold uppercase text-gray-800 transition-all duration-200 hover:bg-yellow-500"
            >
              Add to cart
            </button>
          </div>
          <div class="flex items-center gap-2">
            <HeartIcon class="size-6 text-gray-400" />
            <span class="font-medium text-gray-600">Add to wishlist</span>
          </div>
        </div>
        <div class="pt-3">
          <ul class="flex flex-col gap-2">
            <li class="grid grid-cols-4 text-sm text-gray-800">
              <span class="font-medium">SKU:</span>
              <span class="col-span-3 col-start-2">BA1002</span>
            </li>
            <li class="grid grid-cols-4">
              <span class="font-medium">Categories:</span>
              <span class="col-span-3 col-start-2">Camera & Headphone</span>
            </li>
            <li class="grid grid-cols-4">
              <span class="font-medium">Tags:</span>
              <span class="col-span-3 col-start-2">Headphones, Wireless</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
