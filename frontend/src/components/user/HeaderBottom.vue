<script setup>
import { Bars3Icon } from '@heroicons/vue/24/solid'
import BaseButton from '@/components/core/BaseButton.vue'
</script>

<template>
  <div class="padding-x">
    <div
      class="container mx-auto flex items-center justify-between"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="100"
      :duration="200"
    >
      <BaseButton class="py-2 lg:hidden lg:opacity-0">
        <Bars3Icon class="size-7" />
      </BaseButton>
      <div class="flex items-center gap-1 max-lg:hidden max-lg:opacity-0">
        <div class="group">
          <button
            class="group flex gap-3 py-3 pl-5 pr-12 font-semibold transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-gray-900"
          >
            <Bars3Icon
              class="size-6 font-bold transition-all duration-300 group-hover:text-gray-900"
            />
            SHOP BY DEPARTMENT
          </button>
        </div>

        <nav class="border-l border-gray-50/20 pl-8">
          <ul class="flex gap-3 text-base font-semibold uppercase transition">
            <li>
              <router-link :to="{ name: 'home' }" class="hover:text-yellow-400">HOME</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'home' }" class="hover:text-yellow-400">Shop</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'home' }" class="hover:text-yellow-400">ABOUT</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'home' }" class="hover:text-yellow-400"
                >Contact</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p class="text-sm font-medium">
          Spend <span class="font-semibold text-yellow-400">$120</span> more and get free shipping!
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
