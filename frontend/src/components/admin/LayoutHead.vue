<script setup>
const props = defineProps({
  head: String
})
</script>

<template>
  <div class="mt-12 mb-3 flex items-center justify-between">
    <h2 class="text-3xl font-semibold leading-none">{{ props.head }}</h2>
    <slot></slot>
  </div>
</template>
