<script setup>
import BannerCard from '@/components/user/BannerCard.vue'
import { bannerItems } from '@/constants.js'
</script>

<template>
  <div
    class="container mx-auto grid grid-cols-1 justify-between gap-6 px-4 py-6 sm:grid-cols-2 sm:px-2 lg:grid-cols-3 lg:!px-0"
  >
    <BannerCard v-for="banner in bannerItems" :key="banner.title" :banner="banner" />
  </div>
</template>

<style lang="scss" scoped></style>
