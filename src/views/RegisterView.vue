<script setup>
// import libraries
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// import components
import AppContainer from "../components/AppContainer.vue"
const router = useRouter();
const msg = ref('');
// submit function
const onSubmit = async e => {
  const form = new FormData(e.target);
  const inputs = Object.fromEntries(form.entries());
  console.log(inputs, 'input');
  // return false;
  await axios.post('register', inputs);
  msg.value = 'please visit your email to verify';
  setTimeout(async () => {
    await router.push('/login');
  }, 2000);
}
</script>

<template>
  <app-container>
    <div class="h-[100vh-80px] flex items-center justify-center">
      <div class="w-[600px] mx-auto my-[100px]">
        <h1 class="text-center text-green-500 text-2xl" v-if="msg">{{msg}}</h1>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" class="form-control" name="email" type="email" placeholder="type your email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" class="form-control" name="password" type="password" placeholder="type your password" required />
          </div>
          <div class="form-group">
            <label for="confirm">Confirm Password</label>
            <input id="confirm" class="form-control" name="password_confirmation" type="password" placeholder="confirm your password" required />
          </div>
          <button type="submit" class="text-center w-full bg-sky-400 text-white rounded-lg p-4 text-lg hover:bg-sky-500" >Submit</button>
        </form>
      </div>
    </div>
  </app-container>
</template>
<style scoped>
.form-group {
  @apply mb-6;
}
.form-control {
  @apply w-full rounded-lg p-4 border border-gray-200 bg-white text-gray-500;
}
</style>