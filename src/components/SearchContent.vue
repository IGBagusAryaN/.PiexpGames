<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from '../../src/vue-firebase-auth';
import { getDocs, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import AddOrUpdate from './AddOrUpdate.vue';
import BtnVisit from './Button.vue';
import Nintendo from './ImageComponent/NintendoComponent.vue';
import Playstation4 from './ImageComponent/Ps4Component.vue';
import Playstation5 from './ImageComponent/Ps5Component.vue';
import Playstation45 from './ImageComponent/Ps4&5Component.vue';

const games = ref([]);  // State untuk menyimpan games
const show = ref(false);  // Menyimpan status apakah komponen tambah/update ditampilkan
const data = ref({});  // Menyimpan data game yang akan ditambah/diedit
const isNew = ref(true);  // Apakah sedang menambah game baru atau mengedit

// Mengambil data dari Firestore secara real-time
onMounted(() => {
  const gamesCollectionRef = collection(db, 'Games');
  
  // Menggunakan onSnapshot untuk mendapatkan update secara real-time
  onSnapshot(gamesCollectionRef, (snapshot) => {
    games.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
});

// Fungsi untuk menampilkan form tambah/update
function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData;
  isNew.value = isNewDoc;
  show.value = !show.value;
}

// Fungsi untuk menghapus record dari Firestore
async function deleteRecord(id) {
  await deleteDoc(doc(db, 'Games', id));
}
</script>

<template>
  <div class="px-32 relative overflow-hidden pt-24">
    <div class="flex justify-center">
      <div class="w-4/5 mt-5">
        <input class="border border-solid w-full py-2 px-5 rounded-2xl focus:outline-none focus:ring focus:ring-violet-300" type="text" placeholder="Search" />
      </div>
    </div>

    <AddOrUpdate @close="toggleComponent" v-if="show" :data="data" :isNew="isNew" />

    <button @click="toggleComponent()" class="text-sm font-medium text-black border border-black px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring focus:ring-indigo-300 active:bg-indigo-600 active:text-white mt-2">
      Add new
    </button>

    <div class="mt-5">
      <div class="grid grid-cols-3 gap-9">
        <div
          class="w-[305px] object-cover hover:translate-y-[-10px] ease-in duration-300 focus:ring focus:ring-violet-300"
          v-for="game in games"
          :key="game.id"
          @click="toggleComponent(game, false)"
        >
          <div class="card border border-solid p-3 rounded-md">
            <div class="w-full h-36 overflow-hidden rounded-[12px]">
              <img class="w-full h-full object-cover" :src="game.image" alt="" />
            </div>
            <div class="flex justify-between text-[10px] pt-3">
              <div class="flex items-center justify-between gap-1">
                <div class="border border-solid bg-[#E9E9E9] px-2 rounded-[5px]">{{ game.type1 }}</div>
                <div class="border border-solid bg-[#E9E9E9] px-2 rounded-[5px]">{{ game.type2 }}</div>
              </div>
            </div>
            <div class="mt-1">
              <div class="text-[16px] font-bold">{{ game.name }}</div>
              <div class="text-[10px] text-[#7B7583]">{{ game.description }}</div>
            </div>
            <div class="flex items-center justify-between mt-3">
              <div class="flex gap-3">
                <div class="text-[10px] text-red-600"><s>{{ game.discountprice }}</s></div>
                <div class="bg-indigo-400 text-[10px] px-1 rounded-sm text-white">{{ game.discount }}</div>
              </div>
              <div class="font-bold">{{ game.price }}</div>
            </div>
            <div class="flex items-center justify-between mt-3">
              <button class="border border-solid text-[12px] p-2 rounded-md font-bold">Add to Cart</button>
              <button class="border border-solid text-[12px] p-2 rounded-md bg-black text-white font-bold">Purchase</button>
            </div>
          </div>
          <button class="btn bg-green-600 text-white p-2 rounded-md mt-1 me-3" @click.stop="deleteRecord(game.id)">Update</button>
          <button class="btn bg-red-600 text-white p-2 rounded-md mt-1" @click.stop="deleteRecord(game.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <div class="mt-10">
            <div class="grid grid-cols-3 gap-9 ">
                <div class="w-[305px] object-cover text-center cursor-pointer hover:translate-y-[-10px] ease-in duration-300 focus:ring focus:ring-violet-300" v-for="game in filteredgames" :key="game.id">
                    <div class="object-cover">
                        <img class="rounded-2xl w-full h-[250px]" :src="game.image" alt="">
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
        </div> -->
<!-- 
// const games = ref([]);
// const gameComponentMap = {
//     'Nintendo': Nintendo,
//     'Playstation4': Playstation4,
//     'Playstation5': Playstation5,
//     'Playstation4&5': Playstation45,
// };
// onMounted(() => {
//     fetch('https://api.npoint.io/e6e470c3a16c80b57dca')
//         .then(res => res.json())
//         .then(data => {
//             games.value = data;
//         })
//         .catch(err => {
//             console.log("Error fetching data:", err.message);
//         });
// });


// // Mengikat input pencarian ke variabel
// const searchQuery = ref('')

// // Computed property untuk memfilter game berdasarkan pencarian
// const filteredgames = computed(() => {
//   return games.value.filter(game =>
//     game.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
//   )
// })
// -->

