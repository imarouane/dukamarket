<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { onBeforeMount, inject } from 'vue'
import { storeToRefs } from 'pinia'

const emitter = inject('emitter')
const userStore = useUserStore()
const router = useRouter()
async function logout() {
  const { success, error } = await userStore.logout()
  if (success) {
    emitter.emit('notify')
    router.push({ name: 'adminLogin' })
  } else {
    console.error(error)
  }
}

onBeforeMount(async () => {
  await userStore.getUser()
})
const { userData: user } = storeToRefs(userStore)
import DropdownMenu from '@/components/core/DropdownMenu.vue'
defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="flex h-16 items-center justify-between bg-white px-4 py-4 shadow-sm">
    <div
      class="flex items-center justify-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-indigo-200"
    >
      <button><Bars3Icon class="size-8" @click="$emit('toggleSidebar')" /></button>
    </div>
    <div class="text-right">
      <DropdownMenu>
        <div class="flex items-center">
          <img src="https://picsum.photos/200" alt="user iamge" class="mr-4 size-10 rounded-full" />
          <span class="font-semibold">{{ user.value?.name }}</span>
          <ChevronDownIcon
            class="-mr-1 ml-1 h-5 w-5 text-gray-400 hover:text-violet-100"
            aria-hidden="true"
          />
        </div>
        <template #items>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-yellow-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                ]"
              >
                Your Profile
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-red-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                ]"
                @click="logout"
              >
                Sign out
              </button>
            </MenuItem>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </header>
</template>

<style scoped></style>
