<script setup>
import TheSpinner from '@/components/core/TheSpinner.vue'
import TableHeaderCell from '@/components/core/Table/TableHeaderCell.vue'
import DropdownMenu from '@/components/core/DropdownMenu.vue'
import { MenuItem } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PRODUCTS_PER_PAGE } from '@/constants'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted, ref, inject } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const productsStore = useProductsStore()
const notificationStore = useNotificationStore()
const emitter = inject('emitter')

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

function getProductsForPage(link) {
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

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this Product')) {
    return
  }

  try {
    await productsStore.deleteProduct(id)
    notificationStore.setNotification('Product deleted successfully!')
    emitter.emit('notify')
    getProducts()
  } catch (error) {
    // console.log(error)
    notificationStore.setNotification(
      'We encountered a problem deleting the product. Please try again'
    )
    emitter.emit('notify')
  }
}
const emit = defineEmits(['editClicked'])
async function editProduct(product) {
  emit('editClicked', product)
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
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
            <th class="border-b-2 bg-gray-50 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="5" class="py-4">
              <TheSpinner class="mx-auto !text-blue-500" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="border-b" v-for="product in products" :key="product.id">
            <td class="p-2">{{ product.id }}</td>
            <td class="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap p-2">
              {{ product.title }}
            </td>
            <td class="p-2">
              <img class="w-16" :src="product.image_url" alt="product.title" />
            </td>
            <td class="p-2">{{ product.price }}</td>
            <td class="p-2">{{ product.updated_at }}</td>
            <td class="text-center">
              <DropdownMenu width="7rem">
                <div class="flex items-center">
                  <EllipsisVerticalIcon
                    class="h-5 w-5 text-gray-400 transition-all hover:text-blue-600"
                  />
                </div>
                <template #items>
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="editProduct(product)"
                        :class="[
                          active ? 'bg-blue-100 text-blue-500' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                        ]"
                      >
                        <PencilSquareIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-blue-500"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                    </MenuItem>
                  </div>
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-red-100 text-red-500' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                        ]"
                        @click="deleteProduct(product.id)"
                      >
                        <TrashIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-red-500"
                          aria-hidden="true"
                          :class="{ 'text-red-500': active }"
                        />
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </template>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!loading" class="mt-5 flex items-center justify-between">
        <span v-if="productsStore.from"
          >Showing from {{ productsStore.from }} to {{ productsStore.to }}</span
        >

        <nav
          v-if="productsStore.total > productsStore.per_page"
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            v-for="(link, i) of productsStore.links"
            :key="i"
            :disabled="!link.url"
            @click.prevent="getProductsForPage(link)"
            :aria-current="link.active ? 'page' : ''"
            class="relative inline-flex items-center whitespace-nowrap border px-4 py-2 text-sm font-medium"
            :class="[
              link.active
                ? 'z-10 border-blue-500 bg-blue-50 text-blue-600'
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
