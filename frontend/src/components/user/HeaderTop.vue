<script setup>
import AppLogo from '@/components/AppLogo.vue'
import BaseButton from '@/components/core/BaseButton.vue'
import {
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'
</script>
<template>
  <div class="padding-x">
    <div
      class="container mx-auto items-center gap-2 border-b border-gray-50/30 py-7 md:grid md:grid-cols-12"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="200"
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
            <router-link to="/" class="group flex gap-2 transition-all hover:text-yellow-500">
              <UserIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
              <span class="flex flex-col text-nowrap text-xs font-medium"
                ><span class="text-gray-300 group-hover:text-yellow-500">Login</span>My
                Account</span
              >
            </router-link>
          </li>
          <li>
            <router-link to="/" class="group flex gap-2 transition-all hover:text-yellow-500">
              <div class="relative">
                <HeartIcon class="size-8 sm:size-9 lg:size-7 xl:size-8" />
                <span
                  class="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 font-semibold text-gray-900"
                  >0</span
                >
              </div>
              <span class="flex flex-col text-nowrap text-xs font-medium">
                <span class="text-gray-300 group-hover:text-yellow-500">Favorite</span>
                My wishlist
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="group flex gap-2 transition-all hover:text-yellow-500">
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
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
