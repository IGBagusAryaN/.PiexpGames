<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { onSnapshot, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { storage, db } from '../../vue-firebase-auth'; // Firebase config

// Game form data
const newGame = ref({
  id: '',
  fulltitle: '',
  title: '',
  minititle: '',
  type: '',
  description: '',
  image: '',
  images: ['', '', '', ''],
  price: '',
  video: '',
  logo: '',
  discount: 0,
  rating: 0,
  availableOn: '',
  genres: ''
});

// Game list data
const games = ref([]);

// Modal state to control success modal visibility
const showSuccessModal = ref(false);

// Set up Firestore real-time listener
const setupGameListener = () => {
  const gamesCollection = collection(db, 'games'); // Reference to 'games' collection in Firestore

  // Listen for real-time updates
  onSnapshot(gamesCollection, (snapshot) => {
    games.value = snapshot.docs.map(doc => ({
      id: doc.id,
      fulltitle: doc.data().fulltitle || '',
      title: doc.data().title || 'No Title',
      minititle: doc.data().minititle || 'No Minititle',
      type: doc.data().type || '',
      description: doc.data().description || 'No Description',
      image: doc.data().image || '',
      images: doc.data().images || [],
      price: doc.data().price || 0,
      video: doc.data().video || '',
      thumbnail: doc.data().thumbnail || '',
      logo: doc.data().logo || '',
      discount: doc.data().discount || 0,
      rating: doc.data().rating || 0,
      availableOn: doc.data().availableOn || [],
      genres: doc.data().genres || []
    }));
  });
};

// Save or update game
const saveGame = async () => {
  try {
    // Basic validation for required fields
    if (!newGame.value.title || !newGame.value.description || !newGame.value.price) {
      console.error('Missing required fields');
      return;
    }

    const gameDoc = doc(db, 'games', newGame.value.id || undefined); // Use the provided ID for updates or generate a new ID

    const payload = {
      fulltitle: newGame.value.fulltitle,
      title: newGame.value.title,
      description: newGame.value.description,
      image: newGame.value.image,
      images: newGame.value.images,
      thumbnail: newGame.value.thumbnail,
      minititle: newGame.value.minititle,
      type: newGame.value.type,
      price: parseFloat(newGame.value.price),
      video: newGame.value.video,
      logo: newGame.value.logo,
      discount: parseInt(newGame.value.discount, 10),
      rating: parseFloat(newGame.value.rating),
      availableOn: newGame.value.availableOn,
      genres: newGame.value.genres
    };

    // Save the game to Firestore (merge if updating)
    await setDoc(gameDoc, payload, { merge: true });

    resetForm(); // Reset form input

    // Show success modal when game is saved successfully
    showSuccessModal.value = true;

  } catch (error) {
    // Log full error details for debugging
    console.error('Error saving game:', error);
  }
};

// Delete game
const deleteGame = async (id) => {
  try {
    const gameDoc = doc(db, 'games', id);
    await deleteDoc(gameDoc); // Delete the game document from Firestore
  } catch (error) {
    console.error('Error deleting game:', error);
  }
};

// Edit game (prepopulate form with game data)
const editGame = (game) => {
  newGame.value = {
    id: game.id,
    fulltitle: game.fulltitle,
    title: game.title,
    minititle: game.minititle,
    type: game.type,
    description: game.description,
    image: game.image,
    images: game.images.slice(), // Copy array to maintain reactivity
    thumbnail: game.thumbnail,
    price: game.price,
    video: game.video,
    logo: game.logo,
    discount: game.discount,
    rating: game.rating,
    availableOn: game.availableOn.slice(), // Convert array to string for form input
    genres: game.genres.slice() // Convert array to string for form input
  };
};

// Reset form
const resetForm = () => {
  newGame.value = {
    id: '',
    fulltitle: '',
    title: '',
    minititle: '',
    type: '',
    description: '',
    image: '',
    images: ['', '', '', ''],
    thumbnail: '',
    price: '',
    video: '',
    logo: '',
    discount: 0,
    rating: 0,
    availableOn: '',
    genres: ''
  };
};

// Fetch games on mount
onMounted(() => {
  setupGameListener(); // Setup the real-time listener
});
</script>


<template>
  <div class="ms-56 pt-24 px-5">
    <h1 class="font-bold text-2xl mb-6">Upcoming Wishlist</h1>

    <!-- Form untuk tambah/edit game -->
    <form @submit.prevent="saveGame" class="mb-6 flex items-center flex-wrap gap-x-5">
      <div class="flex flex-col w-1/4">
        <label for="title">Full Title</label>
      <input v-model="newGame.fulltitle" placeholder="Game Title" class="border border-gray-300  p-2 mb-2" id="title" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="title">Title</label>
      <input v-model="newGame.title" placeholder="Game Title" class="border border-gray-300 p-2 mb-2" id="title" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="minititle">Mini Title</label>
      <input v-model="newGame.minititle" placeholder="Game Title" class="border border-gray-300 p-2 mb-2" id="minititle"/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="type">Type</label>
      <input v-model="newGame.type" placeholder="Game Type" class="border border-gray-300 p-2 mb-2" id="type" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="desc">Description</label>
        <input v-model="newGame.description" placeholder="Game Description" class="border border-gray-300 p-2 mb-2" id="desc" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="cover">Cover Games</label>
        <input v-model="newGame.image" placeholder="Image Cover" class="border border-gray-300 p-2 mb-2" id="cover" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="images1">Image Gameplay</label>
        <input v-model="newGame.images[0]" placeholder="Image URL 1" id="images1" class="border border-gray-300  p-2 mb-2" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="images2">Image Gameplay</label>
        <input v-model="newGame.images[1]" placeholder="Image URL 2" id="images2" class="border border-gray-300 p-2 mb-2" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="images3">Image Gameplay</label>
        <input v-model="newGame.images[2]" placeholder="Image URL 3" id="images3" class="border border-gray-300 p-2 mb-2" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="thumbnail">Thumbnail</label>
        <input v-model="newGame.thumbnail" placeholder="Image URL 3" id="thumbnail" class="border border-gray-300 p-2 mb-2" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="price">Price</label>
        <input v-model="newGame.price" placeholder="Price" type="number" class="border border-gray-300 text-gray-300  p-2 mb-2" id="price" required />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="video">Video Trailer</label>
        <input v-model="newGame.video" placeholder="Video Trailer" class="border border-gray-300 p-2 mb-2" id="video" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="logo">Logo</label>
        <input v-model="newGame.logo" placeholder="Logo URL" class="border border-gray-300  p-2 mb-2" id="logo" required/>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="discount">Discount</label>
        <input v-model="newGame.discount" placeholder="Discount %" type="number" class="border border-gray-300 p-2 mb-2" id="discount" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="rating">Rating</label>
        <input v-model="newGame.rating" placeholder="Rating" type="number" step="0.1" max="5" min="0" class="border border-gray-300 p-2 mb-2" id="rating" />
      </div>
      <div class="flex flex-col w-1/4">
        <label for="availableOn">Available On</label>
        <multiselect 
          v-model="newGame.availableOn" 
          :options="['PC', 'PlayStation5','PlayStation4', 'Xbox', 'Nintendo', 'Mobile']" 
          :multiple="true"
          :taggable="true"
          placeholder="Choose Platforms"
          id="availableOn"
          class=""
        ></multiselect>
      </div>
      <div class="flex flex-col w-1/4">
        <label for="genres">Genres</label>
        <multiselect 
          v-model="newGame.genres" 
          :options="['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports']" 
          :multiple="true"
          :taggable="true"
          placeholder="Choose Genres"
          id="genres"
          class="multiselect_option--highlight"
      ></multiselect>

      </div>
      <button class="bg-green-400 px-5 py-3 text-white font-bold rounded-md text-sm" type="submit">Save</button>
      <button @click.prevent="resetForm" class="bg-red-400 px-5 py-3 text-white font-bold rounded-md text-sm">Reset</button>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-md text-center">
        <h2 class="text-2xl mb-4">Success!</h2>
        <p>Game successfully saved.</p>
        <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded" @click="showSuccessModal = false">Close</button>
      </div>
    </div>

    <!-- Games list -->

    <table class="table-auto w-full border-collapse border border-gray-200 mt-4 text-left">
      <thead>
        <tr>
          <th class="border px-4 py-2">Title</th>
          <th class="border px-4 py-2">Description</th>
          <th class="border px-4 py-2">Price</th>
          <th class="border px-4 py-2">Discount</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td class="border px-4 py-2 max-w-[200px] truncate">{{ game.fulltitle }}</td>
          <td class="border px-4 py-2 max-w-xs truncate">{{ game.description }}</td>
          <td class="border px-4 py-2">IDR {{ game.price.toLocaleString() }}</td>
          <td class="border px-4 py-2">{{ game.discount }}%</td>
          <td class="border px-4 py-2">
            <button @click="editGame(game)" class="text-blue-500 mr-2">Edit</button>
            <button @click="deleteGame(game.id)" class="text-red-500">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .multiselect__option--highlight {
    background-color: blue !important; 
    color: white;
  }
</style>
