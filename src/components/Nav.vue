<template>
  <div>
    <img src="" alt="">
    <div>
      <p>Bienvenido de nuevo ${user.name}!!</p>
      <button @click="signIn">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signOut(email.value);
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
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
