<script setup>
const count = defineModel('count', { type: Number, default: 1 })

function inc() {
  count.value++
}

function dec() {
  count.value > 1 ? count.value-- : 1
}
</script>

<template>
  <div class="flex w-fit items-center border border-gray-200 px-4 py-2">
    <button @click="dec()" class="px-1 text-xl font-semibold text-gray-800">-</button>
    <input
      readonly
      type="number"
      min="0"
      v-model="count"
      class="max-w-28 appearance-none border-0 py-0 text-center focus:outline-none focus:outline-offset-0 focus:ring-0"
    />
    <button @click="inc()" class="px-1 text-xl font-semibold text-gray-800">+</button>
  </div>
</template>

<style>
/* Hide the increment and decrement buttons */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
