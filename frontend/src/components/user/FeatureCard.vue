<script setup>
const { features } = defineProps({
  features: {
    type: Object
  }
})
</script>
<template>
  <div
    class="flex w-full max-w-[300px] items-center gap-4 text-nowrap rounded-sm px-6 py-8 sm:bg-gray-100"
  >
    <div>
      <features.icon class="size-10 text-yellow-500" />
    </div>
    <div class="flex flex-col gap-2 text-gray-900">
      <h3 class="font-semibold">{{ features.title }}</h3>
      <p class="text-sm">{{ features.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
