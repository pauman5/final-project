<template>
   <div class="bg-white p-5 max-w-md mx-auto rounded shadow-lg shadow-slate-300">
    <h2 v-if="!errorMsg" class="text-3xl font-bold text-emerald-300 px-4 ">¡Registrate!</h2>
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>
    <div class="mt-2 space-y-2">
        <input
          class="w-full border rounded h-12 px-4 focus:outline-none"
          placeholder="Introduce tu email"
          type="email"
          v-model="email"
        />
        <div class="flex items-center ">
          <input
            class="w-full border rounded h-12 px-4 focus:outline-none -mr-7"
            placeholder="Contraseña"
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
        <div class="flex items-center ">
          <input
            class="w-full border rounded h-12 px-4 focus:outline-none -mr-7"
            placeholder="Confirmar contraseña"
            type="password"
            v-model="confirmPassword"
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
              class="w-full border-x border-y border-emerald-400 px-2 py-1 rounded-md text-emerald-400 text-s font-bold hover:bg-emerald-400 hover:text-slate-50 hover:transition hover:duration-3000"
              @click="signUp"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
</div>
<p
  class="text-gray-400 text-sm self-center md:self-auto mt-3 md:mt-3"
>
  ¿Ya te has registrado?
  <strong><PersonalRouter :route="route" :buttonText="buttonText" class="hover:text-gray-800" /></strong>
</p>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { createConditionalExpression } from "@vue/compiler-core";

// Route Variables
const route = "/auth/login";
const buttonText = "Log In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");
// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Show hide confrimPassword variable:
// const confirmPasswordFieldType = computed(() =>
//   passwordField.value ? "none" : "flex"
// );
// const hideconfrimPassword = ref(true)

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value,password.value);
      redirect.push({ path: route });
    }catch(error) {
      errorMsg.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
    }
  } else {
    errorMsg.value = "Error: Contraseña y confirmar contraseña no coinciden!";
    password.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<style></style>
