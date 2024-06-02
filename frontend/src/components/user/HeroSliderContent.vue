<script setup>
import BaseButton from '@/components/core/BaseButton.vue'
const  props  = defineProps({
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
          <h2 class="text-left text-3xl font-semibold uppercase md:text-nowrap lg:text-4xl">
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
        <figure class="w-full max-w-[360px]">
          <img :src="content.sliderImage" alt="slider image" class="" />
        </figure>
      </div>
    </div>
  </div>
</template>

<style>
.swiper {
  min-height: 500px;
  width: 100%;
  background: #1e40af;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero_swiper .swiper-pagination-bullet {
  background-color: #fff;
}

.hero_swiper .swiper-pagination-bullet-active {
  background-color: #fcbe00;
  border-radius: 10px;
  opacity: 1;
  position: relative;
  width: 35px;
}
</style>
