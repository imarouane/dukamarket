<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  imgUrl: {
    type: String
  }
})
async function logout() {
  const { success, error } = await userStore.logout()
  if (success) {
    router.push({ name: 'login' })
  } else {
    console.error(error)
  }
}

onMounted(async () => {
  await userStore.getUser()
})
const user = computed(() => userStore.userData.value)
</script>

<template>
  <div class="text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="flex items-center">
          <img :src="props.imgUrl" alt="user iamge" class="mr-4 size-10 rounded-full" />
          <span class="font-semibold">{{ user?.name }}</span>
          <ChevronDownIcon
            class="-mr-1 ml-1 h-5 w-5 text-gray-400 hover:text-violet-100"
            aria-hidden="true"
          />
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
          class="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-indigo-100 text-gray-800' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                ]"
              >
                Your Profile
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="logout"
                :class="[
                  active ? 'bg-indigo-100 text-gray-800' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                ]"
              >
                Sign out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
