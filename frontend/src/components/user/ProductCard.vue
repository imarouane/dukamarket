<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object
  }
})

const displayedTitle = computed(() => {
  if (props.product.title.length > 50) {
    return props.product.title.slice(0, 60) + '...'
  } else {
    return props.product.title
  }
})
</script>

<template>
  <div class="group relative">
    <div
      class="aspect-none flex w-full items-center justify-center overflow-hidden rounded-md bg-gray-200 lg:h-64"
    >
      <img
        :src="props.product.image_url"
        :alt="product.title"
        class="w-full object-cover object-center transition-all duration-300 group-hover:scale-110 lg:w-full"
        loading="lazy"
      />
    </div>
    <div class="mt-4 flex justify-between gap-1">
      <div>
        <h3 class="text-sm text-gray-700">
          <router-link :to="{ name: 'productDetails', params: { slug: product.slug } }">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ displayedTitle }}
          </router-link>
        </h3>
        <p class="mt-1 text-sm text-gray-500">White</p>
      </div>
      <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
