<script setup>
import { ref } from 'vue'

const { name, label, modelValue } = defineProps({
  modelValue: {
    type: File,
    require: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    require: true
  }
})
const emit = defineEmits(['update:modelValue'])
const file = ref(modelValue)

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  emit('update:modelValue', file.value)
}
</script>

<template>
  <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-gray-900"
    >{{ label }}:</label
  >
  <div class="mt-2">
    <input
      type="file"
      :name="name"
      :id="name"
      @change="handleFileChange"
      accept="image/*"
      class="block w-full rounded-full text-sm text-slate-500 file:mr-3 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-indigo-600"
    />
  </div>
</template>

<style lang="scss" scoped></style>
