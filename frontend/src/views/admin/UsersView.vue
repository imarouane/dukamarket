<script setup>
import LayoutHead from '@/components/admin/LayoutHead.vue'
</script>

<template>
  <LayoutHead head="Users"
    ><button
      class="flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
      @click="addProduct()"
    >
      Add new User
    </button></LayoutHead
  >
</template>

<style lang="scss" scoped></style>
