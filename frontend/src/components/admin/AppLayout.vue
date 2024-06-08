<script setup>
import SidebarView from '@/components/admin/SidebarView.vue'
import AdminNavbar from '@/components/admin/AdminNavbar.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TheSpinner from '@/components/core/TheSpinner.vue'

const isLoading = ref(true)
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})

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
  <div v-if="isLoading" class="flex h-screen w-full items-center justify-center bg-gray-100">
    <TheSpinner class="h-12 w-12 !text-blue-500 sm:h-14 sm:w-14" />
  </div>

  <div v-else class="flex min-h-screen items-start bg-gray-100">
    <!-- Sidebar -->

    <sidebar-view
      @close-sidebar="toggleSidebar"
      :isSidebarOpen="isOpen"
      :class="{ '-ml-64': !isOpen }"
    ></sidebar-view>
    <!-- Sidebar -->

    <div :class="[isOpen ? 'lg:ml-64' : '', 'flex-1']">
      <!-- header -->
      <admin-navbar @toggle-sidebar="toggleSidebar" />
      <!-- header -->

      <main class="p-3 sm:p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
