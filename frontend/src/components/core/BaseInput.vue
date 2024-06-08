<script setup>
import { computed } from 'vue'

const model = defineModel()
const { name, label, append, errorMsg } = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    require: true,
    default: 'text'
  },
  append: String,
  errorMsg: String
})

const inputClasses = computed(() => {
  const classes = [
    'block w-full appearance-none rounded-sm border-0 py-2 text-gray-900 caret-yellow-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-yellow-500 sm:leading-6'
  ]

  return classes.join(' ')
})
</script>

<template>
  <label v-if="label" :for="name" class="mb-2 block font-medium leading-6 text-gray-900">{{
    label
  }}</label>
  <div class="relative mt-1" :class="{ 'flex items-center': append }">
    <input v-bind="$attrs" v-model="model" :name="name" :id="name" :class="inputClasses" />
    <span
      v-if="append"
      class="absolute right-0 inline-flex h-full items-center justify-center rounded-r-sm bg-gray-200 px-2.5 font-medium text-gray-700 ring-1 ring-inset ring-gray-300"
      >{{ append }}</span
    >
  </div>
  <p v-if="errorMsg" class="mt-1 font-medium text-red-500">
    {{ errorMsg }}
  </p>
</template>

<style lang="scss" scoped></style>
