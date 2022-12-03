<script setup>
import AppContainer from '@/components/AppContainer.vue';
import { onMounted, onUpdated } from "@vue/runtime-core";
import axios from 'axios';
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref } from 'vue';
import AppNav from "./components/AppNav.vue";
import { getToken } from './stores/token'
const router = useRouter();
const isLoggedin = ref(false);
const token = getToken();
const logout = () => {
  localStorage.removeItem('token');
  isLoggedin.value = false;
  router.push('/login');
}
onMounted(()=>{
  if(localStorage.getItem('token')) {
    isLoggedin.value = true;
    router.push('/home');
  }
  console.log(token.myToken, 'my token');
})
onUpdated(()=>{
  console.log(token.myToken, 'my token');
})
console.log(token.myToken, 'my token');
</script>

<template>
  <nav class="app_nav">
      <app-container>
          <div class="app_nav__container">
              <h1 class="mr-auto text-3xl text-black">TODO LIST</h1>
              <ul class="app_nav__list">
                  <li class="app_nav__item">
                      <router-link class="app_nav__link" :to="isLoggedin ? '/' : '/login'">
                        <template v-if="isLoggedin">
                          <span  @click="logout">logout</span>
                        </template>
                        <template v-else>
                          <span>login</span>
                        </template>
                      </router-link>
                  </li>
                  <li class="app_nav__item">
                      <router-link class="app_nav__link" to="/register">Register</router-link>
                  </li>
              </ul>
          </div>
      </app-container>
      {{isLoggedin}}
    </nav>
  <RouterView />
</template>

<style scoped>
.app_nav {
    @apply shadow bg-white py-4;
}
.app_nav__container {
    @apply flex items-center;
}
.app_nav__list {
    @apply flex items-center;
}
.app_nav__item {
    @apply ml-4;
}
.app_nav__link {
    @apply p-4 inline-flex items-center justify-center bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full sm:w-auto dark:bg-sky-500 dark:hover:bg-sky-400;
}
</style>
