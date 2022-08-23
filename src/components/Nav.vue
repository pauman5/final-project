<template>
  <div>
    <img src="" alt="">
    <div>
      <p>Bienvenido de nuevo {{ userMailClean }}!!</p>
      <button @click="signOut">Sign Out</button>
    </div>
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

<style></style>
