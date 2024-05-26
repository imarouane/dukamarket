<script setup>
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'

const { field, sortField, sortDirection } = defineProps({
  field: String,
  sortField: String,
  sortDirection: String
})
</script>

<template>
  <th
    @click="$emit('sortByHead', field)"
    class="cursor-pointer border-b-2 bg-gray-50 p-2 text-left"
    :class="field === sortField ? 'bg-indigo-50' : ''"
  >
    <div class="flex justify-between">
      <slot></slot>
      <div v-if="field === sortField">
        <ChevronUpIcon class="size-5" v-if="sortDirection === 'asc'" />
        <ChevronDownIcon class="size-5" v-else />
      </div>
      <ChevronDownIcon class="size-5" v-else />
    </div>
  </th>
</template>

<style lang="scss" scoped></style>
