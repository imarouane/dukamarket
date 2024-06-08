<script setup>
import { inject } from 'vue'
import { useUserStore } from '@/stores/user'
import AppLogo from '@/components/AppLogo.vue'
import BaseButton from '@/components/core/BaseButton.vue'
import { useRouter } from 'vue-router'
import {
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'
import { MenuItem } from '@headlessui/vue'
import DropdownMenu from '@/components/core/DropdownMenu.vue'
import { storeToRefs } from 'pinia'

const emitter = inject('emitter')
const userStore = useUserStore()
const router = useRouter()
const { isLoggedIn } = storeToRefs(userStore)

async function logout() {
  const { success, error } = await userStore.logout()
  if (success) {
    emitter.emit('notify')
    router.push({ name: 'login' })
  } else {
    console.error(error)
  }
}
</script>
<template>
  <div class="padding-x">
    <div
      class="container mx-auto items-center gap-2 border-b border-gray-50/30 py-7 md:grid md:grid-cols-12"
    >
      <div class="md:col-span-2">
        <AppLogo />
      </div>
      <!-- search form -->
      <div class="max-lg:hidden max-lg:opacity-0 lg:col-span-5 lg:col-start-4">
        <div
          class="flex rounded-sm border-2 border-transparent bg-white transition has-[input:focus-within]:border-yellow-500"
        >
          <input
            type="text"
            name="search"
            id="search"
            placeholder="I'm searching for..."
            class="flex-1 border-none py-2 text-gray-900 outline-none ring-0 placeholder:font-normal placeholder:text-gray-700 focus:outline-none focus:ring-0"
          />
          <BaseButton type="submit" class="bg-yellow-500 px-2 transition hover:bg-yellow-500/90"
            ><MagnifyingGlassIcon class="size-6 text-gray-900"
          /></BaseButton>
        </div>
      </div>
      <!-- header action -->
      <div class="max-md:mt-4 md:col-span-4 md:col-start-9">
        <ul class="flex justify-between gap-6 md:justify-end lg:gap-4">
          <li>
            <router-link
              :to="{ name: 'wishlist' }"
              class="group flex gap-2 transition-all hover:text-yellow-500"
            >
              <div class="relative">
                <HeartIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
                <span
                  class="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 font-semibold text-gray-900"
                  >0</span
                >
              </div>
              <span class="flex flex-col text-nowrap text-xs font-medium">
                <span class="text-gray-300 group-hover:text-yellow-500">Favorite</span>
                Wishlist
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'cart' }"
              class="group flex gap-2 transition-all hover:text-yellow-500"
            >
              <div class="relative">
                <ShoppingBagIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
                <span
                  class="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 font-semibold text-gray-900"
                  >0</span
                >
              </div>

              <span class="flex flex-col text-nowrap text-xs font-medium"
                ><span class="text-gray-300 group-hover:text-yellow-500">Your Cart:</span>
                $0.00</span
              >
            </router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              :to="{ name: 'login' }"
              class="group flex gap-2 transition-all hover:text-yellow-500"
            >
              <UserIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
              <span class="flex flex-col justify-center text-nowrap text-sm font-medium">
                <span class="text-xs text-gray-300 group-hover:text-yellow-500">Login</span>
                Account
              </span>
            </router-link>
          </li>
          <li v-else>
            <DropdownMenu>
              <div
                class="group flex items-center justify-center gap-1 transition-all hover:text-yellow-500"
              >
                <UserIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
                <span class="text-nowrap text-sm font-medium">Account</span>
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
                      My Account
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
                      v-if="isLoggedIn"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </template>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
