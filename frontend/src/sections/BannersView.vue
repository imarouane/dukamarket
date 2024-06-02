<script setup>
import BannerCard from '@/components/user/BannerCard.vue'
import { bannerItems } from '@/constants.js'
</script>

<template>
  <div class="container mx-auto grid grid-cols-3 justify-between gap-3 py-6">
    <BannerCard v-for="banner in bannerItems" :key="banner.title" :banner="banner" />
  </div>
</template>

<style lang="scss" scoped></style>
