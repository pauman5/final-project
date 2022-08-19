<template>
  <div>Sign Up</div>
  <PersonalRouter :route="route" :buttonText="buttonText" />
    <input 
      type="email"
      placeholder="Introduce un nombre de usuario"
      v-model= "email"
      />
    <input 
      type="password"
      placeholder="Introduce una contraseña"
      v-model= "password"
      />
    <button @click="signUpHere">Sign up</button>
  <p>Good Music, Patience and a lot effort</p>
  <p>Keep calm and code on!</p>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { createConditionalExpression } from "@vue/compiler-core";

const storeUser = useUserStore();

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields
const email = ref("");
const password = ref("");

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
async function signUpHere () {
  try {
    await storeUser.signUp(email.value,password.value);
    console.log("Registro enviado");
  }catch(e) {
    console.log(e)  
  }
}
</script>

<style></style>
