<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
// import components
import AppContainer from '@/components/AppContainer.vue';
import AppButton from '@/components/AppButton.vue';
// import stores
import { getToken } from '@/stores/token'
// header for axios
const config = ref({});
// post per page
const page = ref(1);
// app functions
const token = getToken();
const todoArray = ref([]);
const scrollComponent = ref(null)
onMounted(() => {
  getItem(page.value);
  window.addEventListener("scroll", handleScroll);
})
 onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
 })
 const handleScroll = (e) => {
    let element = scrollComponent.value
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      page.value++;
      getItem(page.value);
    }
  }
// get item
const getItem = async (page) => {
    try {
      let res = await axios.get(`items?page=${page}`, {headers: { Authorization: `Bearer ${token.myToken}` }});
      const post_per_page = res.data.items.per_page;
      const currentPage = res.data.items.current_page;
      const maxPage = res.data.items.last_page;
      if(res && res.status == 200 && currentPage <= maxPage) {
        let newPost = res.data.items.data;
        for(let i = 0; i < post_per_page; i++){
          todoArray.value.push({
            id: newPost[i].id,
            title: newPost[i].title,
            description: newPost[i].description,
          })
        }        
      }
    }catch(e) {
      console.log(e);
    }
  }
// delete item
const deleteItem = async(id) => {
  console.log(id);
  try {
    let res = await axios.delete(`item/${id}`, {headers: { Authorization: `Bearer ${token.myToken}` }});
    await getItem();
    console.log(res, 'delete response');
  }catch(e) {
    console.log(e);
  }
}
</script>

<template>
  <main ref="scrollComponent"> 
    <app-container>
      <h1 class="text-3xl text-center my-5">Your Todo List</h1>
      
      <div class="todo_list my-10">
        <div class="flex justify-center mb-10">
          <app-button variant="btn blue" to="/create">Add New Todo List Items</app-button>
        </div>
        <ul>
          <li class="todo_list__item mb-6 flex items-center justify-between" v-for="(item, index) in todoArray" :key="index">
            <router-link :to="{
                    name: 'update',
                    params: { id: item.id },
                }">
                <div class="todo_list__content">
                  <h1 class="text-2xl font-bold">{{parseInt(index + 1)}} - {{item.title}}</h1>
                  <p>{{item.description}}</p>
                </div>
            </router-link>
            <div class="todo_list__actions flex items-center gap-4">
              <app-button variant="btn blue" :to="{
                    name: 'update',
                    params: { id: item.id },
                }">view/update</app-button>
              <app-button variant="btn red" @click="deleteItem(item.id)">delete</app-button>
            </div>
          </li>
        </ul>
      </div>
    </app-container>
  </main>
</template>
