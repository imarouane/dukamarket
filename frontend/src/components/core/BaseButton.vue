<script setup>
const props = defineProps({
  type: String
})
</script>

<template>
  <button :type="props.type">
    <slot></slot>
  </button>
</template>
