<template>
  <div>Sign Up</div>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <div>
    <input 
      type="email"
      placeholder="Introduce un nombre de usuario"
      v-model= "email"
    >
    <input 
      type="password"
      placeholder="Introduce una contraseña"
      v-model= "password"
    >
    <button @click="signUp">Sign up</button>
  </div>
    
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
const signUp = async () => {
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
}
</script>

<style></style>
