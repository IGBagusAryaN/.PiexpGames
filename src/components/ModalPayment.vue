<script setup>
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const showModal = ref(false);
const selectedGame = ref(null);
let stripe, cardElement;

const paymentMethod = ref('credit-card');
const clientSecret = ref(null); // Add clientSecret

onMounted(async () => {
  stripe = await loadStripe('your-publishable-key-here');
});

const handleSubmit = async () => {
  console.log('Payment initiated');
  
  if (!clientSecret.value) {
    alert('Gagal mendapatkan client secret');
    return;
  }

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: 'Your Customer Name',  // Ganti dengan nama pelanggan yang sesuai
      },
    }
  });

  if (error) {
    console.error('Payment failed:', error.message);
    alert('Pembayaran gagal: ' + error.message);
  } else {
    console.log('Payment successful:', paymentIntent);
    alert('Pembayaran berhasil!');
    closeModal();
  }
};

const handleAlternativePayment = () => {
  if (paymentMethod.value === 'dana') {
    alert('Pembayaran melalui Dana sedang diproses.');
    // Implementasi pembayaran dana di sini
  } else if (paymentMethod.value === 'paypal') {
    alert('Pembayaran melalui PayPal sedang diproses.');
    // Implementasi pembayaran PayPal di sini
  } else if (paymentMethod.value === 'bank-transfer') {
    alert('Instruksi transfer bank sedang diproses.');
    // Implementasi pembayaran transfer bank di sini
  }
  closeModal();
};

const openModal = async (game) => {
  selectedGame.value = game;
  showModal.value = true;
  if (paymentMethod.value === 'credit-card') {
    // Dapatkan clientSecret dari server untuk PaymentIntent yang baru
    const response = await fetch('/path/to/your-server/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: selectedGame.value.price }) // Kirim harga atau informasi lain yang dibutuhkan server
    });

    const data = await response.json();
    clientSecret.value = data.clientSecret;

    nextTick(() => {
      const elements = stripe.elements();
      cardElement = elements.create('card');
      cardElement.mount('#card-element');
    });
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
   <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div class="bg-white p-8 rounded-lg shadow-lg w-[70%] grid grid-cols-6 gap-10">
                  <div class="col-span-2">
                    <h2 class="text-xl font-bold mb-6">Checkout</h2>
                    <div class="overflow-y-auto max-h-[300px] px-2 scrollbar-left mb-3"> 
                      <div>
                        <img :src="selectedGame.videoSets.videos[0].thumbnail" :alt="selectedGame.title" width="250" class="rounded-lg">
                      </div>
                      <p class="text-lg font-semibold mt-2">{{ selectedGame.title }}</p>
                      <p class="font-semibold mb-4 text-xs">{{ selectedGame.price }}</p>
                      <div class="flex mb-3">
                          <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                          <label for="link-checkbox" class="ms-2 text-xs text-justify">
                            Click here to agree to share your email with Game Science Interactive Technology Co., Ltd.. Game Science Interactive Technology Co., Ltd. will use your email address for marketing and otherwise in accordance with its <a href="#" class="text-blue-600 hover:underline">privacy policy</a>, so we encourage you to read it </label>
                      </div>
                      <div class="text-xs">
                      <!-- Form pembayaran -->
                      <div v-if="paymentMethod === 'credit-card'" id="card-element" class="mb-4">
                        <!-- Elemen Stripe akan di-mount di sini -->
                      </div>
                      <div v-else-if="paymentMethod === 'dana'" class="mb-4">
                        <p>Proses pembayaran menggunakan dana.</p>
                        <!-- Implementasi dana di sini -->
                      </div>
                      <div v-else-if="paymentMethod === 'paypal'" class="mb-4">
                        <p>Proses pembayaran menggunakan PayPal.</p>
                        <!-- Implementasi PayPal di sini -->
                      </div>
                      <div v-else-if="paymentMethod === 'bank-transfer'" class="mb-4">
                        <p>Proses pembayaran menggunakan Transfer Bank.</p>
                        <!-- Implementasi Transfer Bank di sini -->
                      </div>
                    </div>
                  </div>
                  <button
                        v-if="paymentMethod === 'credit-card'"
                        type="button" class="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full" disabled
                        @click="handleSubmit"
                      >
                        Bayar
                      </button>
                      <button
                        v-else
                        type="submit"
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                        @click="handleAlternativePayment"
                      >
                        Bayar
                      </button>

                </div>
                <div class="col-span-4 relative">
                  
                  <button
                    class=" text-gray-500 hover:text-gray-700 absolute top-0 right-0"
                    @click="closeModal"
                  >
                    x
                  </button>
                  <div class="mb-4 overflow-y-auto max-h-[300px] mt-12 px-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Metode Pembayaran</label>
                    
                    <!-- Kartu Kredit -->
                    <!-- <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="credit-card" type="radio" value="credit-card" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="credit-card" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Kartu Kredit</label>
                    </div> -->
                    
                    <!-- dana -->
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="dana" type="radio" value="dana" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="dana" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Dana</label>
                    </div>

                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="shopee" type="radio" value="shopee" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="shopee" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">ShopeePay</label>
                    </div>
                    
                    <!-- PayPal -->
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="paypal" type="radio" value="paypal" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="paypal" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Ovo</label>
                    </div>
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="paypal" type="radio" value="paypal" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="paypal" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">PayPal</label>
                    </div>
                    
                    <!-- Transfer Bank -->
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg">
                      <input id="bank-transfer" type="radio" value="bank-transfer" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
                      <label for="bank-transfer" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Transfer Bank</label>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
                </div>
</template>