<script setup>
const props = defineProps({
  head: String
})
</script>

<template>
  <div class="mb-3 mt-12 flex items-center justify-between">
    <h2 class="text-2xl font-semibold leading-none sm:text-3xl">{{ props.head }}</h2>
    <slot></slot>
  </div>
</template>
