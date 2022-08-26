<template>
  <div class="flex flex-row justify-between px-2 py-2 items-center bg-emerald-400 text-gray-100">
    <div class="flex flex-row items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 w-6 md:w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
      </svg>
      <h1 class="text-xl font-bold md:text-2xl ">TareApp</h1>
    </div>
    <p class="text-sm pr-4 text-center sm:text-base">Bienvenid@ <strong>{{ userMailClean }}</strong>!!</p>
    <button class="border-x border-y border-gray-100 px-2 py-1 rounded-md text-gray-100 font-bold hover:bg-gray-100 hover:text-emerald-400 transition duration-3000 hidden md:flex" @click="signOut">Sign Out</button>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3 md:hidden" @click="signOut">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
const userMail = useUserStore().user.email;
const redirect = useRouter();
const userMailClean = userMail.split("@")[0];
const signOut = async () => {
  try {
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    console.log (error);
  }
};
</script>

<style>
</style>
