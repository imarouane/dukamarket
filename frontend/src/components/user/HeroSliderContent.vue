<script setup>
import BaseButton from '@/components/core/BaseButton.vue'
const props = defineProps({
  content: {
    type: Object
  }
})
</script>

<template>
  <div class="padding-y container mx-auto px-4 text-white sm:px-2 lg:px-28">
    <div class="flex flex-col justify-between gap-4 md:flex-row">
      <div class="flex flex-col justify-center gap-10">
        <div class="flex flex-col items-start gap-4">
          <span
            class="rounded-sm bg-yellow-500 px-2 py-1 text-sm font-bold uppercase text-gray-900"
            >{{ content.priority }}</span
          >
          <h2
            class="text-left text-3xl font-semibold uppercase md:text-nowrap lg:text-4xl xl:text-5xl"
          >
            <span class="mb-1 block">{{ props.content.title }}</span>
            <span>Collection 2024</span>
          </h2>
          <p>
            Exclusive offer <span>-{{ content.discount }}%</span> off this week
          </p>
        </div>
        <BaseButton
          class="mt-2 self-start rounded-sm bg-white px-8 py-2 font-medium text-gray-900 transition duration-200 hover:bg-yellow-500"
          >Shop Now</BaseButton
        >
      </div>
      <div class="flex justify-center">
        <figure class="max-h-[360px] w-full max-w-[360px]">
          <img :src="content.sliderImage" alt="slider image" class="h-full" />
        </figure>
      </div>
    </div>
  </div>
</template>

<style></style>
