<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/solid'
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeSidebar'])

function handleEmit() {
  if (window.innerWidth <= 1024) {
    emit('closeSidebar')
  }
}
</script>

<template>
  <div
    class="fixed z-20 h-screen w-full max-w-64 rounded-br-3xl rounded-tr-3xl bg-indigo-600 py-4 pl-3 pr-4 transition-all duration-150"
  >
    <div
      v-if="props.isSidebarOpen"
      class="absolute left-0 top-0 -z-[9999] h-full w-screen bg-black/25 lg:w-0"
      @click="$emit('closeSidebar')"
    >
      <button
        class="absolute right-6 top-1 rounded-lg bg-indigo-700 p-2 text-white hover:bg-indigo-600"
      >
        <XMarkIcon class="size-9" />
      </button>
    </div>
    <h2 class="px-1 text-2xl font-semibold leading-9 tracking-wide text-white">
      <router-link :to="{ name: 'app.dashboard' }" class="flex items-center gap-1"
        ><ShoppingBagIcon class="size-6" />LV Market</router-link
      >
    </h2>

    <ul
      class="mt-6 flex flex-col gap-2 font-roboto text-sm font-medium tracking-wider text-gray-200"
      @click="handleEmit"
    >
      <li>
        <router-link
          :to="{ name: 'app.dashboard' }"
          class="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-black/20"
          ><span><HomeIcon class="size-6" /></span>Dashboard</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'app.products' }"
          class="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-black/20"
          ><span><ShoppingCartIcon class="size-6" /></span>Products</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'app.users' }"
          class="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-black/20"
          ><span><UsersIcon class="size-6" /></span>Users</router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'app.reports' }"
          class="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-black/20"
          ><span><ChartBarIcon class="size-6" /></span>Reports</router-link
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul li a.router-link-active {
  @apply bg-black/20 text-white;
}
</style>
