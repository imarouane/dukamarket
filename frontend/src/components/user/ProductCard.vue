<script setup>
import { StarIcon } from '@heroicons/vue/24/solid'
import { StarIcon as EmptyStarIcon, HeartIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  product: {
    type: Object
  }
})
</script>

<template>
  <div class="border-gray-10 group relative flex flex-col gap-2 rounded-sm border p-4">
    <div class="mx-auto flex h-60 w-64 items-center justify-center overflow-hidden rounded-md">
      <router-link :to="{ name: 'productDetails', params: { id: product.id, slug: product.slug } }">
        <img
          :src="props.product.image_url"
          :alt="product.title"
          class="h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </router-link>
    </div>
    <h3 class="font-semibold leading-5 text-gray-700">
      <router-link
        :to="{ name: 'productDetails', params: { id: product.id, slug: product.slug } }"
        class="line-clamp-2"
      >
        {{ product.title }}
      </router-link>
    </h3>
    <div class="flex gap-2">
      <div class="flex gap-0.5">
        <StarIcon class="size-5 text-yellow-400" />
        <StarIcon class="size-5 text-yellow-400" />
        <StarIcon class="size-5 text-yellow-400" />
        <StarIcon class="size-5 text-yellow-400" />
        <EmptyStarIcon class="size-5 text-yellow-400" />
      </div>
      <span class="text-sm font-medium text-gray-500">(12 review)</span>
    </div>
    <div class="flex items-center justify-between gap-2">
      <h5 class="text-lg font-semibold text-gray-900">${{ product.price }}</h5>
      <span>Sold: 10/60</span>
    </div>
    <div class="mt-auto flex gap-2">
      <button
        class="grow text-nowrap bg-yellow-primary px-2 py-2 font-semibold uppercase text-gray-800 transition-all duration-200 hover:bg-yellow-500"
      >
        Add to cart
      </button>
      <button
        class="flex items-center justify-center gap-2 text-nowrap border border-gray-200 px-3 py-2 font-semibold uppercase text-gray-800 transition-all duration-200 hover:bg-white/80"
      >
        <heart-icon class="size-6" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
