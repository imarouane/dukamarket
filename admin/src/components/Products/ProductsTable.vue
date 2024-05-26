<script setup>
import TheSpinner from '@/components/core/TheSpinner.vue'
import TableHeaderCell from '@/components/core/Table/TableHeaderCell.vue'
import { PRODUCTS_PER_PAGE } from '@/constants'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  getProducts()
})

const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref('')
const sortField = ref('updated_at')
const sortDirection = ref('desc')

function getProducts(url = null) {
  productsStore.getProducts(url, search.value, perPage.value, sortField.value, sortDirection.value)
}

const { productsData: products, loading } = storeToRefs(productsStore)

function getProductsForPage(event, link) {
  if (!link.url || link.active) {
    return
  }

  getProducts(link.url)
}

function sortProducts(field) {
  if (field === sortField.value) {
    if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = 'desc'
    }
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }

  getProducts()
}
</script>

<template>
  <div class="rounded-lg bg-white p-4 pb-6 shadow">
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
      <table class="w-full table-auto">
        <thead>
          <tr>
            <table-header-cell
              @sort-by-head="sortProducts"
              :sort-field="sortField"
              field="id"
              :sort-direction="sortDirection"
            >
              ID</table-header-cell
            >
            <table-header-cell
              @sort-by-head="sortProducts"
              :sort-field="sortField"
              field="title"
              :sort-direction="sortDirection"
            >
              Title</table-header-cell
            >
            <th class="border-b-2 bg-gray-50 p-2 text-left">Image</th>
            <table-header-cell
              @sort-by-head="sortProducts"
              :sort-field="sortField"
              field="price"
              :sort-direction="sortDirection"
            >
              Price</table-header-cell
            >
            <table-header-cell
              @sort-by-head="sortProducts"
              :sort-field="sortField"
              field="updated_at"
              :sort-direction="sortDirection"
            >
              Last Updated At</table-header-cell
            >
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="5" class="py-4">
              <TheSpinner class="mx-auto !text-indigo-500" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
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

      <div v-if="!loading" class="mt-5 flex items-center justify-between">
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
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
