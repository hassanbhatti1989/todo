<script setup>
// import libraries
import axios from 'axios';
import { useRouter } from 'vue-router';
import {ref} from 'vue';
// import components
import AppContainer from "../components/AppContainer.vue"
//import store
import { getToken } from '@/stores/token';

const authToken = getToken();
const router = useRouter();
const error = ref('');
// submit function
const onSubmit = async e => {
  const form = new FormData(e.target);
  const inputs = Object.fromEntries(form.entries());
  console.log(inputs);
  try{
    let res = await axios.post('login', inputs);
    if(res && res.status == 200) {
      localStorage.setItem('token', res.data.user.token);
      authToken.setToken(res.data.user.token);
      await router.push('/home');
    }
  }catch(e){
    console.log(e);
    error.value = 'username or password is incorrect'
  }
  // console.log(res);
  // console.log(res.data.user.token);
  // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
}
</script>

<template>
  <app-container>
    <div class="h-[100vh-80px] flex items-center justify-center">
      <div class="w-[600px] mx-auto my-[100px]">
        <h1 class="text-center text-red-500">{{error}}</h1>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" class="form-control" name="email" type="email" placeholder="type your email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" class="form-control" name="password" type="password" placeholder="type your password" required />
          </div>
          <button type="submit" class="text-center w-full bg-sky-400 text-white rounded-lg p-4 text-lg hover:bg-sky-500" >Submit</button>
        </form>
      </div>
    </div>
  </app-container>
</template>
<style scoped>
</style>