import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const getToken = defineStore("token", () => {
    const tokenValue = ref(localStorage.getItem('token'));
    const myToken = computed(() => tokenValue.value);
    const setToken = (value) => {
      console.log(value, 'store token value');
      tokenValue.value = value;
    };

  return { setToken, tokenValue, myToken };
});
