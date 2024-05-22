<script setup>
import { useCounterStore } from '@/stores/counter'
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <main class="font-poppins">
    <h1 class="text-xl text-blue-600">{{ count }}</h1>

    <button @click="increment">Increment</button>
  </main>
</template>
