<script setup>
import HeroSliderContent from '@/components/user/HeroSliderContent.vue'
import { heroContent } from '@/constants.js'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
const modules = [Autoplay, Pagination]
</script>

<template>
  <section>
    <swiper
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="hero_swiper"
    >
      <swiper-slide v-for="content in heroContent" :key="content.title">
        <HeroSliderContent :content="content" />
      </swiper-slide>
    </swiper>
  </section>
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

.swiper img {
  width: 100%;
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

<!-- :autoplay="{
  delay: 4000,
  disableOnInteraction: false
}" -->
