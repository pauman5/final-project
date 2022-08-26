<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex flex-row items-center mt-8 mb-3 text-emerald-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 mr-3 drop-shadow-lg">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
    <h1 class="text-4xl text-center font-bold drop-shadow-lg md:text-6xl">TareApp</h1>
    </div>
    <h3 class="text-base mb-3 text-slate-600 drop-shadow-lg md:text-xl">
      ¡¡Empieza ya a organizar tus tareas!!
    </h3>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style></style>

