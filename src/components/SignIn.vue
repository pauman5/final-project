<template>
  <div v-if="errorMsg" class="border border-red-400 px-2 py-1 mb-2 rounded-md text-red-400">
      <p>{{ errorMsg }}</p>
  </div>
  <div class="bg-white p-5 max-w-md mx-auto rounded shadow-lg shadow-slate-300">
    <h2 class="text-3xl font-bold text-emerald-300 px-4">¡Bienvenid@!</h2>
    <div class="mt-2 space-y-2">
      <input
        class="w-full border rounded h-12 px-4 focus:outline-none"
        placeholder="Email"
        type="email"
        v-model="email"
      />
      <div class="flex items-center">
        <input
          class="w-full border rounded h-12 px-4 focus:outline-none -mr-7"
          placeholder="Contraseña"
          :type="passwordFieldType"
          v-model="password"
        />
        <svg
          v-if="hidePassword"
          @click="changeHidePassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-slate-400 -w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
        <svg
          v-if="!hidePassword"
          @click="changeHidePassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-slate-400 w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div>
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <button
            class="w-full border-x border-y border-emerald-400 px-2 py-1 rounded-md text-emerald-400 text-s font-bold hover:bg-emerald-400 hover:text-slate-50 hover:transition hover:duration-3000"
            @click="signIn"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  </div>
  <p class="text-gray-400 text-sm self-center md:self-auto mt-3 md:mt-3">
    ¿Aún no te has registrado?
    <strong
      ><PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="hover:text-gray-800"
    /></strong>
  </p>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const route = "/auth/sign-up";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");

const errorMsg = ref("");

const hidePassword = ref(true);

const changeHidePassword = () => {
  hidePassword.value = !hidePassword.value;
};

const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

const redirect = useRouter();

const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
