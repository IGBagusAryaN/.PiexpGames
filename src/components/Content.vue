<script setup>
import { ref, onMounted } from 'vue';
import BtnVisit from './Button.vue';
import Nintendo from './ImageComponent/NintendoComponent.vue'
import Playstation4 from './ImageComponent/Ps4Component.vue'
import Playstation5 from './ImageComponent/Ps5Component.vue'
import Playstation45 from './ImageComponent/Ps4&5Component.vue'

const games = ref([]);
const gameComponentMap = {
    'Nintendo': Nintendo,
    'Playstation4': Playstation4,
    'Playstation5': Playstation5,
    'Playstation4&5': Playstation45,
};

onMounted(() => {
    fetch('https://api.npoint.io/6470517fbf6c78f8c165')
        .then(res => res.json())
        .then(data => {
            games.value = data;
        })
        .catch(err => {
            console.log("Error fetching data:", err.message);
        });
});

</script>
<template>
    <div class="px-48 h-[80vh] relative overflow-hidden mt-16">
      <div class="flex justify-between items-center">
        <div class=" text-center font-bold text-[24px] text-[#0F051D]">Upcoming Wishlist</div>
        <router-link to="/search" class="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-violet-300 text-white text-[12px] p-2 px-5 rounded-xl">
          Explore
        </router-link>
      </div>
      
      <div class="mt-5">
        <div class="grid grid-cols-5 gap-10">
          <div
            v-for="game in games"
            :key="game.id"
            class="w-[150px] object-cover text-center cursor-pointer hover:translate-y-[-10px] ease-in duration-300"
            @click="$router.push({ name: 'GameDetail', params: { id: game.id } })"
          >
            <div class="object-cover">
              <img class="rounded-2xl w-full h-[210px]" :src="game.image" alt="">
            </div>
            <div class="mt-2">
              <div class="text-[16px] font-bold">{{ game.title }}</div>
              <div class="text-[12px] text-[#7B7583]">{{ game.minititle }}</div>
            </div>
            <div class="w-full flex justify-center mt-2">
              <component :is="gameComponentMap[game.games]"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  