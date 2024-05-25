<script setup>
import TheSpinner from '@/components/core/TheSpinner.vue'
import { PRODUCTS_PER_PAGE } from '@/constants'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  getProducts()
})

function getProducts(url = null) {
  productsStore.getProducts(url, search.value, perPage.value)
  // console.log(search.value)
}

const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref('')

const { productsData: products, loading } = storeToRefs(productsStore)

function getProductsForPage(event, link) {
  if (!link.url || link.active) {
    return
  }

  getProducts(link.url)
}
</script>

<template>
  <div class="mb-3 mt-10 flex items-center justify-between">
    <h2 class="text-3xl font-semibold">Products</h2>
    <button
      class="flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
    >
      Add new Product
    </button>
  </div>
  <div class="rounded-lg bg-white p-4 shadow">
    <div class="flex justify-between border-b-2 border-gray-100 pb-3">
      <div class="flex items-center">
        <label class="mr-3 block whitespace-nowrap text-sm font-medium leading-6" for="perPage">
          Per Page
        </label>
        <select
          name="perPage"
          id="perPage"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          @change="getProducts(null)"
          v-model="perPage"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <input
          type="search"
          @change="getProducts(null)"
          v-model="search"
          class="relative block w-56 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500"
          placeholder="Type to search products"
        />
      </div>
    </div>

    <div class="mt-4">
      <div v-if="loading" class="mt-4 flex items-center justify-center">
        <TheSpinner class="text-indigo-500" />
      </div>
      <template v-else>
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th class="border-b-2 p-2 text-left">ID</th>
              <th class="border-b-2 p-2 text-left">Title</th>
              <th class="border-b-2 p-2 text-left">Image</th>
              <th class="border-b-2 p-2 text-left">Price</th>
              <th class="border-b-2 p-2 text-left">Last Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="border-b p-2">{{ product.id }}</td>
              <td class="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap border-b p-2">
                {{ product.title }}
              </td>
              <td class="border-b p-2">
                <img class="w-16" :src="product.image" alt="product.title" />
              </td>
              <td class="border-b p-2">{{ product.price }}</td>
              <td class="border-b p-2">{{ product.updated_at }}</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-5 flex items-center justify-between">
          <span v-if="productsStore.from"
            >Showing from {{ productsStore.from }} to {{ productsStore.to }}</span
          >

          <nav
            v-if="productsStore.total > productsStore.per_page"
            class="-space-x-psx relative z-0 inline-flex justify-center rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              v-for="(link, i) of productsStore.links"
              :key="i"
              :disabled="!link.url"
              @click.prevent="getProductsForPage($event, link)"
              :aria-current="link.active ? 'page' : ''"
              class="relative inline-flex items-center whitespace-nowrap border px-4 py-2 text-sm font-medium"
              :class="[
                link.active
                  ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
                !link.url ? 'cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-white' : '',
                i === 0 ? 'rounded-l-md' : '',
                i === productsStore.links.length - 1 ? 'rounded-r-md' : ''
              ]"
              v-html="link.label"
            ></button>
          </nav>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
