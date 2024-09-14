<template>
  <div class="pt-24 px-48 mb-48">
    <!-- Konten game -->
    <div v-if="selectedGame">
      <!-- Detail game -->
      <div class="text-[28px] font-semibold">
        {{ selectedGame.title }}
      </div>
      <div class="flex items-center text-[12px] mb-3">
        <div class="flex items-center space-x-2">
          <span>Available on</span>
          <div class="flex space-x-1">
            <div
              v-for="platform in selectedGame.availableOn"
              :key="platform"
              class="px-2 py-1 border rounded text-[9px]"
            >
              {{ platform }}
            </div>
          </div>
        </div>

        <div class="border-l h-5 mx-2 border-gray-500"></div>

        <div class="flex items-center space-x-2">
          <span>Genres</span>
          <div class="flex space-x-1">
            <div
              v-for="genre in selectedGame.genres"
              :key="genre"
              class="px-2 py-1 bg-gray-100 rounded text-[9px]"
            >
              {{ genre }}
            </div>
          </div>
        </div>
      </div>

      <!-- Video dan Deskripsi -->
      <div class="mb-12">
        <div class="grid grid-cols-3 gap-10">
          <div class="relative col-span-2">
            <!-- Video dan thumbnail -->
            <div class="overflow-hidden rounded-lg">
              <template v-for="(video, index) in selectedGame.videoSets.videos" :key="index">
                <iframe
                  v-if="video.type === 'youtube'"
                  :src="video.src"
                  :title="video.title"
                  :width="video.width"
                  :height="video.height"
                  v-show="activeIndex === index"
                  class="w-full h-[300px] rounded-lg"
                  :frameborder="video.attributes.frameborder"
                  :allow="video.attributes.allow"
                  :referrerpolicy="video.attributes.referrerpolicy"
                  :allowfullscreen="video.attributes.allowfullscreen"
                ></iframe>
                <img
                  v-else
                  :src="video.thumbnail"
                  v-show="activeIndex === index"
                  class="w-full h-[300px] rounded-lg"
                />
              </template>
            </div>

            <div class="flex justify-center mt-4">
              <img
                v-for="(video, index) in selectedGame.videoSets.videos"
                :key="index"
                :src="video.thumbnail"
                @click="setActiveIndex(index)"
                :class="[
                  'w-20 h-12 mx-2 cursor-pointer rounded-md transition-opacity duration-200',
                  { 'opacity-70': activeIndex !== index },
                ]"
              />
            </div>

            <button
              @click="prevSlide"
              class="absolute top-[342px] left-0 transform -translate-y-1/2"
            >
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
            <button
              @click="nextSlide"
              class="absolute top-[342px] right-0 transform -translate-y-1/2 "
            >
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>

            <p class="text-justify text-[12px] mt-10 text-[#7B7583]">
              {{ selectedGame.description }}
            </p>
          </div>
          <div class="col-span-1">
            <img :src="selectedGame.logo" alt="">
            <div class="mt-10 text-[24px]">
              <div>
              <!-- Jika game memiliki diskon, tampilkan harga asli yang dicoret dan harga diskon -->
              <div v-if="selectedGame.disc" class="font-semibold">
                <div class="flex items-center">
                  <div class="text-red-600 text-xl line-through mr-2">
                    {{ formattedPrice(selectedGame.price) }}
                  </div>
                  <div class="bg-indigo-400 py-1 px-2 rounded-md text-[12px] text-white">
                    {{ selectedGame.disc }}%
                  </div>
                </div>
                <div :class="{'font-semibold': selectedGame.disc}">
                  {{ discountedPrice }}
                </div>
              </div>

              <!-- Jika harga game adalah 0, tampilkan 'Free' -->
              <div v-else-if="selectedGame.price === 0" class="font-semibold text-xl">
                Free
              </div>

              <!-- Jika tidak ada diskon dan game tidak gratis, tampilkan hanya harga asli -->
              <div v-else class="font-semibold text-xl">
                {{ formattedPrice(selectedGame.price) }}
              </div>
            </div>

              <Ratings :rating="selectedGame.rating.score"/>
              <div class="mt-3">
                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full" @click="openModal(selectedGame)">Buy Now</button>
              </div>
              
              <div v-if="showLoginModal">
                <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                  <div class="bg-white p-8 rounded-lg shadow-lg w-[30%] flex flex-col justify-center items-center">
                    <img src="../assets/danger.png" alt="" width="100">
                    <div>
                      OOPS Login dulu lah!!!
                    </div>
                    <router-link to="/signin" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 mt-5">
                      Login
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- Modal Pembayaran -->
              <div v-if="showPaymentModal">
                <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div class="bg-white p-8 rounded-lg shadow-lg w-[70%] grid grid-cols-6 gap-10">
                  <div class="col-span-2">
                    <h2 class="text-xl font-bold mb-6">Checkout</h2>
                    <div class="overflow-y-auto max-h-[300px] px-2 scrollbar-left mb-3"> 
                      <div>
                        <img :src="selectedGame.videoSets.videos[0].thumbnail" :alt="selectedGame.title" width="250" class="rounded-lg">
                      </div>
                      <p class="text-lg font-semibold mt-2">{{ selectedGame.title }}</p>
                      <div class="flex space-x-1 my-1">
                        <div
                          v-for="platform in selectedGame.availableOn"
                          :key="platform"
                          class="px-2 py-1 border rounded text-[9px]"
                        >
                          {{ platform }}
                        </div>
                      </div>
                      <div class="mb-3">
                        <!-- Jika game memiliki diskon, tampilkan harga asli yang dicoret dan harga diskon -->
                        <div v-if="selectedGame.disc" class="font-semibold">
                        <div class="text-red-600  text-xs line-through mr-2">
                          {{ formattedPrice(selectedGame.price) }}
                        </div>
                        <div :class="{'font-semibold text-[16px]': selectedGame.disc}">
                          {{ discountedPrice }}
                        </div>
                      </div>
                        <!-- Jika tidak ada diskon, tampilkan hanya harga asli -->
                        <div v-else class="font-semibold text-[16px]">
                          {{ formattedPrice(selectedGame.price) }}
                        </div>
                      </div>
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
                        <p>Proses pembayaran menggunakan Dana.</p>
                        <!-- Implementasi dana di sini -->
                      </div>
                      <div v-else-if="paymentMethod === 'shopee'" class="mb-4">
                        <p>Proses pembayaran menggunakan ShopeePay.</p>
                        <!-- Implementasi PayPal di sini -->
                      </div>
                      <div v-else-if="paymentMethod === 'ovo'" class="mb-4">
                        <p>Proses pembayaran menggunakan Ovo.</p>
                        <!-- Implementasi PayPal di sini -->
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
                        type="button" class="text-white bg-[#AFAFAF] cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full" disabled
                        @click="handleSubmit"
                      >
                        Checkout
                      </button>
                      <button
                        v-else
                        type="submit"
                        class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                        @click="handleAlternativePayment"
                      >
                        Checkout
                      </button>

                </div>
                <div class="col-span-4 relative"> 
                  <button
                    class=" text-gray-500 hover:text-gray-700 absolute top-0 right-0"
                    @click="closeModal"
                  >
                   <font-awesome-icon icon="fa-solid fa-xmark" />
                  </button>
                  <div class="mb-4 mt-12 px-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Metode Pembayaran</label>
                    
                    <!-- Kartu Kredit -->
                    <!-- <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="credit-card" type="radio" value="credit-card" v-model="paymentMethod" name="paymentMethod" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <label for="credit-card" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Kartu Kredit</label>
                    </div> -->
                    
                    <!-- dana -->
                    
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="dana" type="radio" value="dana" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <Dana class="ms-3 w-[20px]"/>
                      <label for="dana" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Dana</label>
                    </div>

                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="shopee" type="radio" value="shopee" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <Shopee class="ms-3 w-[20px]"/>
                      <label for="shopee" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">ShopeePay</label>
                    </div>
                    
                    <!-- PayPal -->
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="ovo" type="radio" value="ovo" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <Ovo class="ms-3 w-[20px]"/>
                      <label for="ovo" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Ovo</label>
                    </div>
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
                      <input id="paypal" type="radio" value="paypal" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <Paypal class="ms-3 w-[20px]"/>
                      <label for="paypal" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">PayPal</label>
                    </div>
                    
                    <!-- Transfer Bank -->
                    <div class="flex items-center ps-4 border border-gray-200 rounded-lg">
                      <input id="bank-transfer" type="radio" value="bank-transfer" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
                      <Bank class="ms-3 w-[20px]"/>
                      <label for="bank-transfer" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Transfer Bank</label>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
                </div>
              </div>
             
              
              <!-- Add to cart -->
              <div>
                <button v-if="isLoggedIn"  type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Ovo from '../components/ImageComponent/OvoIcon.vue'
import Dana from '../components/ImageComponent/DanaIcon.vue'
import Shopee from '../components/ImageComponent/ShopeeIcon.vue'
import Paypal from '../components/ImageComponent/PaypalIcon.vue'
import Bank from '../components/ImageComponent/BankIcon.vue'
import { useAuth } from '../components/useAuth';
import Ratings from "../components/Ratings.vue"

const { isLoggedIn, showLoginModal, showPaymentModal } = useAuth();


const showModal = ref(false);
const paymentMethod = ref('credit-card');


const openModal = (game) => {
  selectedGame.value = game;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleAlternativePayment = () => {
  if (paymentMethod.value === 'dana') {
    alert('Pembayaran melalui Dana sedang diproses.');
    simulatePaymentSuccess();
  } else if (paymentMethod.value === 'shopee') {
    alert('Pembayaran melalui ShopeePay sedang diproses.');
    simulatePaymentSuccess();
  } else if (paymentMethod.value === 'ovo') {
    alert('Pembayaran melalui Ovo sedang diproses.');
    simulatePaymentSuccess();
  } else if (paymentMethod.value === 'paypal') {
    alert('Pembayaran melalui PayPal sedang diproses.');
    simulatePaymentSuccess();
  } else if (paymentMethod.value === 'bank-transfer') {
    alert('Instruksi transfer bank sedang diproses.');
    simulatePaymentSuccess();
  }
};

const simulatePaymentSuccess = () => {
  // Simulasikan penundaan seolah-olah sedang memproses pembayaran
  setTimeout(() => {
    alert('Pembayaran berhasil! Terima kasih atas pembelian Anda.');
    closeModal();
    // Anda bisa mengarahkan ke halaman lain jika diperlukan
    // window.location.href = '/confirmation-page';
  }, 2000); // Simulasi penundaan 2 detik
};

const route = useRoute();
const gameId = route.params.id - 1;

const selectedGame = ref(null);

const activeIndex = ref(0);

onMounted(() => {
  fetch(`https://api.npoint.io/58a6853500e5bb8a1697/${gameId}`)
    .then(res => res.json())
    .then(data => {
      selectedGame.value = data;
    })
    .catch(err => {
      console.log("Error fetching data:", err.message);
    });
});


const discountedPrice = computed(() => {
  console.log('Price:', selectedGame.value.price);
  console.log('Discount:', selectedGame.value.disc);

  if (typeof selectedGame.value.disc === 'number' && selectedGame.value.disc > 0 && selectedGame.value.disc <= 100) {
    const discounted = selectedGame.value.price - (selectedGame.value.price * (selectedGame.value.disc / 100));
    return formattedPrice(discounted);
  }
  return formattedPrice(selectedGame.value.price);
});

function formattedPrice(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'IDR 0'; // Kembalikan format default jika nilai tidak valid
  }
  return 'IDR ' + value.toLocaleString('id-ID');
}
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

const prevSlide = () => {
  if (selectedGame.value && selectedGame.value.videoSets && selectedGame.value.videoSets.videos) {
    activeIndex.value = (activeIndex.value + selectedGame.value.videoSets.videos.length - 1) % selectedGame.value.videoSets.videos.length;
  }
};

const nextSlide = () => {
  if (selectedGame.value && selectedGame.value.videoSets && selectedGame.value.videoSets.videos) {
    activeIndex.value = (activeIndex.value + 1) % selectedGame.value.videoSets.videos.length;
  }
};
</script>
