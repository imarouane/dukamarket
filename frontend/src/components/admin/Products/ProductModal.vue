<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import BaseInput from '@/components/core/BaseInput.vue'
import BaseInputFile from '@/components/core/BaseInputFile.vue'
import BaseTextarea from '@/components/core/BaseTextarea.vue'
import { ref, onUpdated } from 'vue'
import { useProductsStore } from '@/stores/products'
import TheSpinner from '@/components/core/TheSpinner.vue'

const productStore = useProductsStore()

const isVisible = defineModel()
const loading = ref(false)

const errors = ref(null)
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

const product = ref({ ...props.product, image: null })

onUpdated(() => {
  product.value = { ...props.product, image: null }
})

function closeModal() {
  isVisible.value = false
  errors.value = null
}

async function createProduct() {
  loading.value = true
  try {
    await productStore.createProduct(product.value)
    productStore.getProducts()
    closeModal()
    loading.value = false
  } catch (error) {
    errors.value = error.response.data.errors
    loading.value = false
  } finally {
    loading.value = false
  }
}

async function updateProduct() {
  loading.value = true
  try {
    await productStore.updateProduct({ ...product.value })
    productStore.getProducts()
    closeModal()
    loading.value = false
  } catch (error) {
    errors.value = error.response.data.errors
    loading.value = false
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <TransitionRoot appear :show="isVisible" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ action === 'create' ? 'Create new Product' : `Edit Product: #${product?.id}` }}
              </DialogTitle>
              <div class="mt-4">
                <form
                  method="POST"
                  @submit.prevent="action === 'create' ? createProduct() : updateProduct()"
                >
                  <div class="">
                    <BaseInput
                      label="Title"
                      v-model="product.title"
                      name="title"
                      type="text"
                      :error-msg="errors?.title?.[0]"
                    />
                  </div>
                  <div class="mt-2">
                    <BaseInputFile label="Image" v-model="product.image" name="image" />
                  </div>
                  <div class="mt-2">
                    <BaseTextarea
                      label="Description"
                      v-model="product.description"
                      name="description"
                      type="number"
                    />
                  </div>
                  <div class="mt-2">
                    <BaseInput
                      label="Price"
                      step="0.01"
                      v-model="product.price"
                      name="price"
                      type="number"
                      append="$"
                      :error-msg="errors?.price?.[0]"
                    />
                  </div>
                  <div class="mt-2"></div>
                  <div class="mt-4 flex gap-2">
                    <button
                      type="submit"
                      class="inline-flex justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2"
                    >
                      <TheSpinner v-if="loading" />
                      {{ action === 'create' ? 'Create' : 'Update' }}
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped></style>
