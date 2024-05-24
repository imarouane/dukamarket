<script setup>
import TheSpinner from '@/components/core/TheSpinner.vue'
import { useProductsStore } from '@/stores/products'
import { ref } from 'vue'

const productsStore = useProductsStore()
const perPage = ref(10)
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
    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <label class="mr-3 block whitespace-nowrap text-sm font-medium leading-6" for="pre_page">
          Per Page
        </label>
        <select
          name="per_page"
          id="per_page"
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
          @change="getProducts"
          class="relative block w-56 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500"
          placeholder="Type to search products"
        />
      </div>
      <TheSpinner v-if="products.loading" />
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
            <tr v-for="product in products.data" :key="product.id">
              <td class="border-b p-2">{{ product.id }}</td>
              <td class="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap border-b p-2">
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
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
