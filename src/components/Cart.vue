<template>
  <div class="px-48 pt-24 mb-8">
    <h2 class="text-4xl font-bold mb-6">Your Cart</h2>
    
    <!-- Tampilkan spinner saat data masih dimuat -->
    <p v-if="loading">Loading your cart...</p>

    <!-- Tampilkan list game di dalam cart --> 
    <ul v-else-if="cart.length > 0" class="bg-white py-6 flex flex-col gap-3">
      <li v-for="game in cart" :key="game.id" class="border-b border-gray-200 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="game.thumbnail" alt="Product image" class="w-32 h-20 object-cover mr-4 rounded-md">
          <div>
            <h2 class="font-semibold text-xl">{{ game.fulltitle }}</h2>
            
            <!-- Tampilkan harga diskon jika ada -->
            <div v-if="game.discount" class="font-semibold mt-2">
              <div class="flex items-center">
                <div class="text-red-600 text-sm line-through mr-2">
                  {{ formatCurrency(game.price) }}
                </div>
                <div class="bg-indigo-400 py-1 px-2 rounded-md text-[10px] text-white">
                  {{ game.discount }}%
                </div>
              </div>
              <div class="text-xl font-semibold">
                {{ formatCurrency(discountedPrice(game.price, game.discount)) }}
              </div>
            </div>

            <!-- Jika tidak ada diskon, tampilkan harga normal -->
            <div v-else>
              <p class="text-xl">{{ formatCurrency(game.price) }}</p>
            </div>
          </div>
          </div>
          <button @click="removeFromCart(game.id)" class="btn btn-danger text-[9px] text-red-500 mt-2">Remove</button>
        </div>
      </li>
    </ul>

    <!-- Tampilkan pesan jika cart kosong -->
    <p v-else>No games in your cart.</p>

    <!-- Bagian subtotal dan total -->
    <div class="mt-6 p-6 bg-white border border-gray-400 border-opacity-50 rounded-lg">
      <div class="flex justify-between">
        <div>
          <p>SUBTOTAL</p>
          <p class="text-xl font-bold">TOTAL</p>
        </div>
        <div class="text-right">
          <p>Rp. {{ formatCurrency(subtotal) }}</p>
          <p class="text-xl font-bold">Rp. {{ formatCurrency(total) }}</p>
        </div>
      </div>
      <button class="mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium px-6 py-2 rounded-lg" v-if="cart.length > 0" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../components/store/cart'; // Akses store cart
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth

const cartStore = useCartStore();
const auth = getAuth();
const loading = ref(true); // Status loading data cart

onMounted(() => {
  // Tunggu state user login Firebase Auth
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;  // Ambil user ID
      cartStore.setUserId(userId);  // Set user ID ke store cart
      await cartStore.fetchCart();  // Fetch cart data setelah user login
    } else {
      console.error('User is not logged in');
    }
    loading.value = false;  // Set loading false setelah data diambil
  });
});

// Akses reaktif ke cart
const cart = computed(() => cartStore.cart || []);

// Fungsi untuk menghitung harga setelah diskon
const discountedPrice = (price, discount) => {
  return price - (price * (discount / 100));
};

// Menghitung subtotal (total harga setelah diskon jika ada)
const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    const price = Number(item.price); // Konversi price ke number
    const qty = item.qty || 1; // Pastikan qty minimal 1
    const finalPrice = item.discount ? discountedPrice(price, item.discount) : price;
    return sum + (finalPrice * qty);
  }, 0);
});

// Total keseluruhan (dalam hal ini sama dengan subtotal)
const total = computed(() => subtotal.value);

// Fungsi untuk remove item dari cart
const removeFromCart = (gameId) => {
  cartStore.removeFromCart(gameId);
};

// Fungsi checkout
const checkout = () => {
  cartStore.checkout();  // Tambah logic checkout seperti redirect, update database
};

// Format harga ke mata uang Indonesia
const formatCurrency = (amount) => {
  if (isNaN(amount)) return '0'; // Pastikan tidak ada NaN
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
