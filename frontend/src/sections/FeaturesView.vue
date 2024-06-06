<script setup>
import FeatureCard from '@/components/user/FeatureCard.vue'
import { features } from '@/constants.js'
</script>

<template>
  <section
    class="container mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-4 px-4 py-6 md:justify-between"
  >
    <FeatureCard v-for="feature in features" :key="feature.title" :features="feature" />
  </section>
</template>

<style lang="scss" scoped></style>
