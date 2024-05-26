<script setup>
import SidebarView from '@/components/SidebarView.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TheSpinner from './core/TheSpinner.vue'
import { storeToRefs } from 'pinia'

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

const userStore = useUserStore()

const { userData } = storeToRefs(userStore)

const isOpen = ref(true)

const toggleSidebar = () => (isOpen.value = !isOpen.value)

function handleResize() {
  isOpen.value = window.innerWidth >= 1024
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div v-if="userData?.id" class="flex h-full w-full items-center justify-center bg-gray-100">
    <TheSpinner class="h-12 w-12 text-indigo-500" />
  </div>

  <div v-else class="flex min-h-full items-start bg-gray-100">
    <!-- Sidebar -->

    <sidebar-view
      @close-sidebar="toggleSidebar"
      :isSidebarOpen="isOpen"
      :class="{ '-ml-64': !isOpen }"
    ></sidebar-view>
    <!-- Sidebar -->

    <div :class="[isOpen ? 'lg:ml-64' : '', 'flex-1']">
      <!-- header -->
      <the-header @toggle-sidebar="toggleSidebar" />
      <!-- header -->

      <main class="p-3 sm:p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
