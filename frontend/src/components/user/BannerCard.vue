<script setup>
const { banner } = defineProps({
  banner: {
    type: Object
  }
})
</script>

<template>
  <div>{{ banner.title }}</div>
</template>

<style lang="scss" scoped></style>
