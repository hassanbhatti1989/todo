<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
// import components
import AppContainer from '@/components/AppContainer.vue';
import AppButton from '@/components/AppButton.vue';
// import stores
import { getToken } from '@/stores/token'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// app functions
const token = getToken();
const itemId = route.params.id;
const title = ref('');
const description = ref('');
const config = {
    headers: { Authorization: `Bearer ${token.myToken}` }
};
const updateItem = async (e) => {
    const form = new FormData(e.target);
    const inputs = Object.fromEntries(form.entries());
    console.log(inputs, 'input');
    // return false;
    await axios.put(`item/${itemId}`, inputs, config);
    await router.push('/home');
}
onMounted( async () => {
  try {
    let res = await axios.get(`item/${itemId}`, config);
    if(res && res.status == 200) {
        title.value = res.data.item.title;
        description.value = res.data.item.description;
    }
  }catch(e) {
    console.log(e);
  }
})
</script>
<template>
    <app-container>
        <form class="my-10" @submit.prevent="updateItem">
            <div class="input-group mb-6">
                <input class="form-control" type="text" placeholder="your title" name="title" v-model="title" required>
            </div>
            <div class="input-group mv-6">
                <textarea class="form-control" name="description" v-model="description" id="description" cols="30" rows="10" placeholder="your description" required></textarea>
            </div>
            <button class="text-center w-full bg-sky-400 text-white rounded-lg p-4 text-lg hover:bg-sky-500" type="submit" >Update Todo Item</button>            
        </form>
    </app-container>
</template>
