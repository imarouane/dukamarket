<script setup>
import TheNavbar from '@/sections/TheNavbar.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import TheSpinner from '@/components/core/TheSpinner.vue'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { onBeforeMount } from 'vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()

onBeforeMount(() => {
  getProducts()
})

function getProducts(url = null) {
  productsStore.getUserProducts(url)
}
const { productsData: products, loading } = storeToRefs(productsStore)

function getProductsForPage(link) {
  if (!link.url || link.active) {
    return
  }

  getProducts(link.url)
}

const displayedLabel = (label) => {
  if (label.includes('Next')) {
    return { component: ArrowRightIcon, isComponent: true }
  }

  if (label.includes('Previous')) {
    return { component: ArrowLeftIcon, isComponent: true }
  }

  return { component: label, isComponent: false }
}
</script>

<template>
  <TheNavbar />
  <div class="container mx-auto py-12">
    <h2 class="px-4 text-2xl font-semibold text-gray-800 sm:px-6">Shop</h2>
    <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="absolute inset-0 grid h-full w-full place-items-center" v-if="loading">
        <TheSpinner class="!text-blue-500 sm:h-6 sm:w-6" />
      </div>
      <div v-else>
        <div
          v-if="products.length > 0"
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div v-else class="text-center text-xl text-gray-800">
          We couldn't find any products that fit your search. Please adjust your filters and search
          again.
        </div>
      </div>
    </div>
    <div v-if="!loading" class="mt-5 px-4 sm:px-6 lg:px-8">
      <nav
        v-if="productsStore.total > productsStore.per_page"
        class="relative z-0 inline-flex justify-center gap-1 rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          v-for="(link, i) of productsStore.links"
          :key="i"
          @click.prevent="getProductsForPage(link)"
          :aria-current="link.active ? 'page' : ''"
          class="relative inline-flex items-center whitespace-nowrap border px-4 py-2 font-medium"
          :class="[
            link.active
              ? 'z-10 border-yellow-primary bg-yellow-primary text-white'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
            !link.url ? 'hidden' : ''
          ]"
        >
          <component
            v-if="displayedLabel(link.label).isComponent"
            :is="displayedLabel(link.label).component"
            class="size-5"
          />
          <span v-else>{{ displayedLabel(link.label).component }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
