<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import ModalPayment from '../components/ModalPayment.vue'
import axios from 'axios';
import Rating from '../components/Ratings.vue'
import ModalLogin from './ModalLogin.vue';
import { useAuth } from '../components/useAuth';
import { useCartStore } from '../components/store/cart';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../vue-firebase-auth';  // Firebase Firestore instance

const cartStore = useCartStore();
const gameUid = 'gameUid';

const { isLoggedIn, showLoginModal, showPaymentModal } = useAuth();
const route = useRoute();
const router = useRouter();
const gameId = route.params.id;
const game = ref(null);
const isLoading = ref(true);


const fetchGameData = async (gameUid) => {
  try {
    const gameDocRef = doc(db, 'games', gameUid);
    const gameDoc = await getDoc(gameDocRef);
    if (gameDoc.exists()) {
      game.value = gameDoc.data();
    } else {
      console.log('No such game exists!');
    }
  } catch (error) {
    console.error("Error fetching game data: ", error);
  }
};

const isInCart = (gameId) => {
  return cartStore.cart.some(item => item.id === gameId);
};

const addToCart = () => {
  if (game.value) {
    cartStore.addToCart(game.value);  // Akses data game dari .value
  }
};

const viewCart = () => {
  router.push('/cart');
};

onMounted(() => {
  fetchGameData(gameUid);  // Fetch game data on component mount
});


const fetchGameDetail = async () => {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/my-project-1-e56ef/databases/(default)/documents/games/${gameId}`
    );
    
    const doc = response.data;
    game.value = {
      id: doc.name.split('/').pop(),
      fulltitle: doc.fields.fulltitle.stringValue,
      title: doc.fields.title.stringValue,
      description: doc.fields.description.stringValue,
      image: doc.fields.image.stringValue,
      images: doc.fields?.images?.arrayValue?.values?.map(val => val.stringValue) || [],
      price: doc.fields.price.doubleValue,
      video: doc.fields.video.stringValue,
      thumbnail: doc.fields.thumbnail.stringValue,
      logo: doc.fields.logo.stringValue,
      discount: doc.fields.discount.integerValue,
      rating: doc.fields.rating.doubleValue,
      availableOn: doc.fields?.availableOn?.arrayValue?.values?.map(val => val.stringValue) || [],
      genres: doc.fields?.genres?.arrayValue?.values?.map(val => val.stringValue) || []
    };
  } catch (error) {
    console.error('Error fetching game details:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch game detail on mount
onMounted(() => {
  fetchGameDetail();
});

const currentImageIndex = ref(0);
const isVideo = ref(true); // Mulai dengan video

// Fungsi untuk memilih gambar saat thumbnail diklik
const selectImage = (index) => {
  currentImageIndex.value = index;
  isVideo.value = false; // Ubah tampilan ke gambar ketika thumbnail diklik
};
// Function to slide to the previous image or video
const prevSlide = () => {
  if (isVideo.value) {
    // If currently at video (first slide), move to the last image
    currentImageIndex.value = game.value.images.length - 1;
    isVideo.value = false;
  } else if (currentImageIndex.value === 0) {
    // If at the first image, move back to the video
    isVideo.value = true;
  } else {
    // Otherwise, move to the previous image
    currentImageIndex.value--;
  }
};

// Function to slide to the next image or video
const nextSlide = () => {
  if (isVideo.value) {
    // If currently at video, move to the first image
    currentImageIndex.value = 0;
    isVideo.value = false;
  } else if (currentImageIndex.value === game.value.images.length - 1) {
    // If at the last image, loop back to the video
    isVideo.value = true;
  } else {
    // Otherwise, move to the next image
    currentImageIndex.value++;
  }
};


// Fungsi untuk mendapatkan ID video dari URL
const getYouTubeVideoId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const discountedPrice = computed(() => {
  const price = game.value.price || 0; // Default ke 0 jika tidak ada harga
  const discount = game.value.discount || 0; // Default ke 0 jika tidak ada diskon

  if (discount > 0 && discount <= 100) {
    const discounted = price - (price * (discount / 100));
    return formattedPrice(discounted);
  }
  return formattedPrice(price);
});

function formattedPrice(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'IDR 0';
  }
  return 'IDR ' + value.toLocaleString('id-ID');
}

const showModal = ref(false); // State untuk menampilkan modalme yang dipilih untuk dibeli
const showModalLog = ref(false); // State untuk menampilkan modalme yang dipilih untuk dibeli

// Open Login Modal
const openLoginModal = () => {
  showModalLog.value = true;
};

const openModal = (game) => {
  game.value = game;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handlePayment = (paymentMethod) => {
  console.log(`Pembayaran dengan metode: ${paymentMethod}`);
  closeModal(); // Tutup modal setelah pembayaran diproses
};
</script>

<template>
  <div class="pt-24 px-48 mb-48">
    <div v-if="isLoading">
      <p>Loading game details...</p>
    </div>

    <div v-else>
      <div class="text-[28px] font-semibold">
        {{ game.fulltitle }}
      </div>
      <div class="flex items-center text-[12px] mb-3">
        <div class="flex items-center space-x-2">
          <span>Available on</span>
          <div class="flex space-x-1">
            <div
            v-for="(availableOn, index) in game.availableOn"
              :key="index"
              class="px-2 py-1 border rounded text-[9px]"
            >
            {{ availableOn }}
            </div>
          </div>
        </div>
        <div class="border-l h-5 mx-2 border-gray-500"></div>
        <div class="flex items-center space-x-2">
          <span>Genre</span>
          <div class="flex space-x-1">
            <div
            v-for="(genres, index) in game.genres"
              :key="index"
              class="px-2 py-1 bg-gray-100 rounded text-[9px]"
            >
            {{ genres }}
            </div>
        </div>
        </div>
      </div>

      <div class="mb-12">
        <div class="grid grid-cols-3 gap-10">
          <div class="relative  col-span-2">
            <div class="overflow-hidden rounded-l">
              <iframe
                v-if="isVideo"
                :src="`https://www.youtube.com/embed/${getYouTubeVideoId(game.video)}`"
                frameborder="0"
                allowfullscreen
                class="w-full h-[300px] rounded-lg"
              ></iframe>
              <img
                v-else
                :src="game.images[currentImageIndex]"
                alt="Selected Image"
                class="w-full h-[300px] rounded-lg object-cover"
              />
            </div>
            <div class="flex justify-center mt-4">
  <!-- Thumbnail for Video -->
          <img
            v-if="game.video"
            :src="game.thumbnail"
            class="w-20 h-12 mx-2 cursor-pointer rounded-md transition-opacity duration-200"
            @click="isVideo = true"
            :class="{'opacity-70': isVideo}"
            alt="YouTube Thumbnail"
          />

          <!-- Thumbnails for Images -->
          <img
            v-for="(image, index) in game.images"
            :key="index"
            :src="image"
            :class="[
              'w-20 h-12 mx-2 cursor-pointer rounded-md transition-opacity duration-200',
              { 'opacity-70': !isVideo && currentImageIndex === index }
            ]"
            @click="selectImage(index)"
            alt="Image Thumbnail"
          />
          
        </div>
        <p class="text-justify text-[12px] mt-10 text-[#7B7583]">
              {{ game.description }}
            </p>

            <!-- Tombol Previous -->
            <button
              @click="prevSlide"
              class="absolute top-[342px] left-0 transform -translate-y-1/2"
            >
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>

            <!-- Tombol Next -->
            <button
              @click="nextSlide"
              class="absolute top-[342px] right-0 transform -translate-y-1/2"
            >
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
          <div class="col-span-1">
            <img :src="game.logo" alt="">
            <div class="mt-10 text-[24px]">
              <div>
              <!-- Jika game memiliki diskon, tampilkan harga asli yang dicoret dan harga diskon -->
              <div v-if="game.discount" class="font-semibold">
                <div class="flex items-center">
                  <div class="text-red-600 text-xl line-through mr-2">
                    {{ formattedPrice(game.price) }}
                  </div>
                  <div class="bg-indigo-400 py-1 px-2 rounded-md text-[12px] text-white">
                    {{ game.discount }}%
                  </div>
                </div>
                <div :class="{'font-semibold': game.discount}">
                  {{ discountedPrice}}
                </div>
              </div>
              <Rating :rating="game.rating" />
           
              <div>
        <!-- Show login button if not logged in -->
              <button
                v-if="!isLoggedIn"
                @click="openLoginModal" 
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
              >
                Login to Buy
              </button>

              <!-- Show payment modal button if logged in -->
              <button
                v-else
                @click="openModal"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
              >
                Buy Now
              </button>

              <!-- Login Modal -->
              <ModalLogin
                v-if="showModalLog"
                :showModalLog="showModalLog"
                @close-modal="closeLoginModal"
              />

              <!-- Payment Modal -->
              <ModalPayment
                v-if="showModal"
                :showModal="showModal"
                :game="game"
                :discountedPrice="discountedPrice"
                :formattedPrice="formattedPrice"
                @close-modal="closeModal"
                @submit-payment="handlePayment"
              />
              </div>
              <div>
                <button
                  v-if="isInCart(game.id)"
                  @click="viewCart"
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
                >
                  View in Cart
                </button>
                <button v-else v-if="isLoggedIn" @click="addToCart()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full">Add to Cart</button>
              </div>
            </div>
          </div>
          </div>
        </div>       
      </div>
    </div>
  </div>
</template>

