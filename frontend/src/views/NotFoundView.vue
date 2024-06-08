<script setup></script>

<template>
  <main class="grid min-h-screen place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-lg font-semibold text-blue-700">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          :to="{ name: 'home' }"
          class="self rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Go back home
        </router-link>
        <!-- <router-link class="text-sm font-semibold text-gray-900"
          >Contact support <span aria-hidden="true">&rarr;</span></router-link
        > -->
      </div>
    </div>
  </main>
</template>
