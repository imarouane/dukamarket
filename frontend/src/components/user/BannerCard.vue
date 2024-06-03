<script setup>
const { banner } = defineProps({
  banner: {
    type: Object
  }
})
</script>

<template>
  <div
    class="group relative flex min-h-52 items-center overflow-hidden px-6 font-medium text-white last-of-type:max-lg:col-span-2 last-of-type:max-sm:col-span-1"
  >
    <div>
      <h4 class="text-2xl">{{ banner.priority }}</h4>
      <h3 class="text-2xl">{{ banner.title }}</h3>
      <p class="mt-4">{{ banner.description }}</p>
    </div>
    <img
      :src="banner.image"
      alt=""
      class="absolute inset-0 -z-10 h-full w-full transition duration-500 group-hover:scale-[1.09]"
    />
  </div>
</template>

<style lang="scss" scoped></style>
