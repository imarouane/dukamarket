<script setup>
const model = defineModel()
const { name, label } = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    require: true
  }
})
</script>

<template>
  <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-gray-900"
    >{{ label }}:</label
  >
  <div class="mt-2">
    <textarea
      v-model="model"
      :name="name"
      :id="name"
      v-bind="$attrs"
      class="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 caret-yellow-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
      rows="5"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped></style>
