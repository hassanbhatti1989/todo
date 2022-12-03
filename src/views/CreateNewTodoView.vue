<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// import components
import AppContainer from '@/components/AppContainer.vue';
import AppButton from '@/components/AppButton.vue';
// import stores
import { getToken } from '@/stores/token'

// app functions
const token = getToken();
const todoArray = ref([]);
const router = useRouter();
const addItem = async (e) => {
  const form = new FormData(e.target);
  const inputs = Object.fromEntries(form.entries());
  console.log(inputs);
  try{
    const headerToken = {
      headers: { Authorization: `Bearer ${token.myToken}` }
    };
    let res = await axios.post('item', inputs, headerToken);
    if(res && res.status == 200) {
      console.log(res, 'response add item');
      await router.push('/home');
    }
  }catch(e){
    console.log(e);
  }
}
</script>

<template>
    <main>
        <app-container>
            <h1 class="text-3xl text-center my-5">Create New Todo Item</h1>
            <form @submit.prevent="addItem">
                <div class="form-group">
                    <input class="form-control" placeholder="add title" name="title" required />
                </div>
                <div class="form-group">
                    <textarea class="form-control" placeholder="add description" name="description" id="description" cols="30" rows="10" required></textarea>
                </div>
                <button type="submit" class="text-center w-full bg-sky-400 text-white rounded-lg p-4 text-lg hover:bg-sky-500" >Add Todo list</button>
            </form>
        </app-container>
    </main>    
</template>

<style scoped>

</style>