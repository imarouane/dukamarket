<script setup>
import SidebarView from '@/components/SidebarView.vue'
import TheHeader from '@/components/TheHeader.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(true)

const toggleSidebar = () => (isOpen.value = !isOpen.value)

function handleResize() {
  isOpen.value = window.innerWidth >= 1024
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="flex min-h-full items-start">
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

      <main class="p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
