<template>
  <div class="flex flex-row justify-between px-2 py-2 items-center bg-emerald-400 text-gray-100">
    <div class="flex flex-row items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
      </svg>
      <h1 class="text-2xl font-bold">TaskApp</h1>
    </div>
    <p class="pr-4 text-center">Bienvenido <strong>{{ userMailClean }}</strong>!!</p>
    <button class="border-x border-y border-gray-100 px-2 py-1 rounded-md text-gray-100 font-bold hover:bg-gray-100 hover:text-emerald-400 transition duration-3000" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
//constant to save a variable that will hold the use router method
import { useRouter } from "vue-router";
// constant to save a variable that will get the user from store with a computed function imported from vue
import { useUserStore } from "../stores/user";

// constant that calls user email from the useUSerStore
const userMail = useUserStore().user.email;

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// constant that saves the user email and cleans out the @client from the user
const userMailClean = userMail.split("@")[0];

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logOut
    await useUserStore().signOut();
    // redirects user to the logIn Page
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    console.log (error);
  }
};
</script>

<style>
</style>
