<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'
import HeaderDropdown from '@/components/HedearDropdown.vue'

defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="flex h-16 items-center justify-between bg-white px-4 py-4 shadow-sm">
    <div
      class="flex items-center justify-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-indigo-200"
    >
      <button><Bars3Icon class="size-8" @click="$emit('toggleSidebar')" /></button>
    </div>
    <HeaderDropdown username="Marouane" imgUrl="https://picsum.photos/200" />
  </header>
</template>

<style scoped></style>
