<script setup>
import TheNavbar from '@/sections/TheNavbar.vue'
import { MenuItem, MenuButton } from '@headlessui/vue'
import DropdownMenu from '@/components/core/DropdownMenu.vue'
</script>

<template>
  <TheNavbar />
  <div class="mt-10 flex items-center justify-center">
    <DropdownMenu>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >Login</MenuButton
      >
      <template #items>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Edit
            </button>
          </MenuItem>
        </div>
      </template>
    </DropdownMenu>
  </div>
</template>

<style lang="scss" scoped></style>
