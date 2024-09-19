<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State untuk menyimpan daftar games
const games = ref([]);
const isLoading = ref(true);

// Fetch games
const fetchGames = async () => {
  try {
    const response = await axios.get(
      'https://firestore.googleapis.com/v1/projects/my-project-1-e56ef/databases/(default)/documents/games'
    );
    
    // Map data dari Firestore ke format yang sesuai
    games.value = response.data.documents.map(doc => ({
      id: doc.name.split('/').pop(),
      title: doc.fields.title.stringValue,
      description: doc.fields.description.stringValue,
      image: doc.fields.image.stringValue,
      price: doc.fields.price.doubleValue
    }));
  } catch (error) {
    console.error('Error fetching games:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch data saat komponen dimount
onMounted(() => {
  fetchGames();
});
</script>

<template>
  <div class="pt-24">
    <h1 class="text-2xl font-bold mb-6">Upcoming Wishlist</h1>

    <div v-if="isLoading">
      <p>Loading games...</p>
    </div>

    <div v-else class="grid grid-cols-5 gap-6">
      <div v-for="game in games" :key="game.id" @click="$router.push({ name: 'GameDetail', params: { id: game.id } })" class="cursor-pointer">
        <img :src="game.image" alt="Game Image" class="rounded-lg w-full h-48 object-cover" v-if="game.image" />
        <h2 class="font-bold text-lg mt-2">{{ game.title }}</h2>
        <p class="text-sm text-gray-500">{{ game.description }}</p>
        <span class="block font-semibold mt-1">IDR {{ game.price.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
