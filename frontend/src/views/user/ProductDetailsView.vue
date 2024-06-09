<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

onMounted(() => {
  console.log(props.slug)
})
</script>
<template>
  <div>
    {{ slug }}
  </div>
</template>

<style lang="scss" scoped></style>
