<template>
  <div class="px-48 pt-24 mb-8">
    <h1 class="text-4xl font-bold mb-6">My Cart</h1>
    <div class="bg-white py-6">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b border-gray-200 py-4">
        <div class="flex items-center">
          <img :src="item.image" alt="Product image" class="w-28 h-18 object-cover mr-4 rounded-md">
          <div>
            <h2 class="font-semibold text-xl">{{ item.name }}</h2>
            <div class="flex gap-2">
              <p class="px-2 py-1 border rounded text-[9px]" v-for="platform in item.platforms" :key="platform">{{ platform }}</p>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-lg">IDR.{{ formatCurrency(item.price) }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 p-6 bg-white border border-gray-400 border-opacity-50 rounded-lg ">
      <div class="flex justify-between">
        <div>
        <p>SUBTOTAL</p>
        <p class="text-xl font-bold">TOTAL</p>
      </div>
      <div class="text-right">
        <p>Rp.{{ formatCurrency(subtotal) }}</p>
        <p class="text-xl font-bold">Rp.{{ formatCurrency(total) }}</p>
      </div>
      </div>
      <button class="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg ">Checkout</button>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: 'Black Myth Wukong',
          image: 'https://jagatplay.com/wp-content/uploads/2024/08/black-myth-wukong-jagatplay-1.jpg',
          platforms: ["PS4", "PS5"],
          price: 850000,
          qty: 1,
        },
        {
          id: 2,
          name: 'Dragon Ball Xenoverse 2',
          image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/454650/capsule_616x353.jpg?t=1720409020',
          platforms: ["PS4"],
          price: 450000,
          qty: 3,
        },
      ]
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    total() {
      return this.subtotal;
    }
  },
  methods: {
    decreaseQuantity(item) {
      if (item.qty > 1) item.qty--;
    },
    increaseQuantity(item) {
      item.qty++;
    },
    formatCurrency(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>
