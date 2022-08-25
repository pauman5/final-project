<template>
<div class="bg-white p-5 max-w-md mx-auto rounded shadow shadow-slate-300">
    <h2 class="text-3xl px-4 ">Sign In</h2>
    <div class="mt-2 space-y-2">
        <input
          class="w-full border rounded h-12 px-4 focus:outline-none"
          placeholder="Email adress "
          type="email"
          v-model="email"
        />

        <div class="flex items-center ">
          <input
            class="w-full border rounded h-12 px-4 focus:outline-none -mr-7"
            placeholder="Password"
            type="password"
            v-model="password"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17.607"
            height="17.076"
            viewBox="0 0 17.607 17.076"
          >
            <path
              id="eye-off"
              d="M12.392,16.769a8.718,8.718,0,0,1-9.935-5.938A8.675,8.675,0,0,1,3.817,8.2m5.1.79a2.611,2.611,0,1,1,3.692,3.692M8.914,8.985,12.6,12.675M8.916,8.986,6.053,6.124m6.554,6.554,2.863,2.863M2.929,3,6.053,6.124m0,0a8.7,8.7,0,0,1,13.011,4.707,8.723,8.723,0,0,1-3.6,4.708m0,0,3.123,3.123"
              transform="translate(-1.957 -2.293)"
              fill="none"
              stroke="#949090"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="1"
            />
          </svg>
        </div>
        <div>
          <div class="flex flex-col md:flex-row md:items-center justify-between ">
            <button
              class="w-full border-x border-y border-emerald-400 px-2 py-1 rounded-md text-emerald-400 text-s font-bold hover:bg-slate-50 hover:text-emerald-400 transition duration-3000"
              @click="signIn"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
</div>
<p
  class="text-gray-400 text-sm self-center md:self-auto mt-2 md:mt-2"
>
  Don’t have an account?
  <strong><PersonalRouter :route="route" :buttonText="buttonText" /></strong>
</p>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import moment from "moment";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

const time = moment().format("MMM Do YYYY")

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
