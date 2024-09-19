<template>
  <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-[70%] grid grid-cols-6 gap-10">
      <div class="col-span-2">
        <h2 class="text-xl font-bold mb-6">Checkout</h2>
        <div class="overflow-y-auto max-h-[300px] px-2 scrollbar-left mb-3">
          <img :src="game.thumbnail" width="250" class="rounded-lg">
          <p class="text-lg font-semibold mt-2">{{ game.title }}</p>
          <div class="flex space-x-1 my-1">
            <div class="px-2 py-1 border rounded text-[9px]">{{ game.availableOn.join(',') }}</div>
          </div>
          <div class="mb-3">
            <div v-if="game.discount" class="font-semibold">
              <div class="text-red-600 text-xs line-through mr-2">{{ formattedPrice(game.price) }}</div>
              <div class="font-semibold text-[16px]">{{ discountedPrice }}</div>
            </div>
            <div v-else class="font-semibold text-[16px]">{{ formattedPrice(game.price) }}</div>
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
        
        <!-- Tombol checkout dengan kondisi disabled -->
        <button
          type="submit"
          :disabled="!paymentMethod"
          :class="{'cursor-not-allowed bg-gray-400': !paymentMethod, 'bg-blue-600 hover:bg-blue-700': paymentMethod}" 
          class="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full"
          @click="handleAlternativePayment"
        >
          Checkout
        </button>
      </div>

      <div class="col-span-4 relative">
        <button
          class="text-gray-500 hover:text-gray-700 absolute top-0 right-0"
          @click="closeModal"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <div class="mb-4 mt-12 px-3">
          <label class="block mb-2 text-sm font-medium text-gray-900">Metode Pembayaran</label>
          
          <!-- dana -->
          <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
            <input id="dana" type="radio" value="dana" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
            <Dana class="ms-3 w-[20px]"/>
            <label for="dana" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Dana</label>
          </div>

          <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
            <input id="shopee" type="radio" value="shopee" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
            <Shopee class="ms-3 w-[20px]"/>
            <label for="shopee" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">ShopeePay</label>
          </div>
          
          <!-- Ovo -->
          <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
            <input id="ovo" type="radio" value="ovo" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
            <Ovo class="ms-3 w-[20px]"/>
            <label for="ovo" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Ovo</label>
          </div>

          <!-- PayPal -->
          <div class="flex items-center ps-4 border border-gray-200 rounded-lg mb-2">
            <input id="paypal" type="radio" value="paypal" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
            <Paypal class="ms-3 w-[20px]"/>
            <label for="paypal" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">PayPal</label>
          </div>
          
          <!-- Transfer Bank -->
          <div class="flex items-center ps-4 border border-gray-200 rounded-lg">
            <input id="bank-transfer" type="radio" value="bank-transfer" v-model="paymentMethod" name="paymentMethod" class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-50">
            <Bank class="ms-3 w-[20px]"/>
            <label for="bank-transfer" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Transfer Bank</label>
          </div>
        </div>            
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import Ovo from '../components/ImageComponent/OvoIcon.vue'
import Dana from '../components/ImageComponent/DanaIcon.vue'
import Shopee from '../components/ImageComponent/ShopeeIcon.vue'
import Paypal from '../components/ImageComponent/PaypalIcon.vue'
import Bank from '../components/ImageComponent/BankIcon.vue'

// Props from parent component
const props = defineProps({
  showModal: Boolean,
  game: Object,
  discountedPrice: String,
  formattedPrice: Function,
});

// Emit events to parent component
const emit = defineEmits(['close-modal', 'submit-payment']);

// Define reactive variables
const paymentMethod = ref(null);

const closeModal = () => {
  emit('close-modal');
};

// Watch for changes to props.showModal
watch(() => props.showModal, (newValue) => {
  if (!newValue) {
    closeModal();
  }
});

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
</script>
