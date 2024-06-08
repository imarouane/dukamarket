<script setup>
import { Menu, MenuItems, MenuButton } from '@headlessui/vue'

const props = defineProps({
  width: {
    type: String,
    default: '10rem'
  }
})
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <slot></slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-50 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        :style="{ width: props.width }"
      >
        <slot name="items"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
