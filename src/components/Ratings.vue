<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});

const getStars = (rating) => {
  const cappedRating = Math.min(rating, 5); // Membatasi rating maksimal 5
  const fullStars = Math.floor(cappedRating); // Bintang penuh
  const partialStar = cappedRating % 1; // Bagian desimal dari bintang
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0); // Hitung bintang kosong
  return {
    fullStars,
    partialStar,
    emptyStars,
  };
};
</script>

<template>
  <div class="flex items-center mt-2 mb-4">
    <!-- Bintang Penuh -->
    <template v-for="n in getStars(rating).fullStars" :key="'full-' + n">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        class="w-5 h-5 text-yellow-300"
      >
        <path
          d="M12 .587l3.668 7.429 8.21 1.191-5.939 5.787 1.402 8.177L12 18.896l-7.341 3.875 1.402-8.177-5.939-5.787 8.21-1.191z"
        />
      </svg>
    </template>

    <!-- Bintang Parsial -->
    <template v-if="getStars(rating).partialStar > 0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 h-5 text-yellow-300"
        style="position: relative"
      >
        <defs>
          <!-- Mask untuk menampilkan bagian kuning di kiri -->
          <mask id="partialStarMask">
            <rect width="24" height="24" fill="black" />
            <rect :width="getStars(rating).partialStar * 24" height="24" fill="white" />
          </mask>
        </defs>
        <!-- Bintang Full dengan warna abu-abu -->
        <path
          fill="#9ca3af"
          d="M12 .587l3.668 7.429 8.21 1.191-5.939 5.787 1.402 8.177L12 18.896l-7.341 3.875 1.402-8.177-5.939-5.787 8.21-1.191z"
        />
        <!-- Bagian kuning di atas bintang -->
        <path
          fill="currentColor"
          d="M12 .587l3.668 7.429 8.21 1.191-5.939 5.787 1.402 8.177L12 18.896l-7.341 3.875 1.402-8.177-5.939-5.787 8.21-1.191z"
          mask="url(#partialStarMask)"
        />
      </svg>
    </template>

    <!-- Bintang Kosong -->
    <template v-for="n in getStars(rating).emptyStars" :key="'empty-' + n">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        class="w-5 h-5 text-gray-400"
      >
        <path
          d="M12 .587l3.668 7.429 8.21 1.191-5.939 5.787 1.402 8.177L12 18.896l-7.341 3.875 1.402-8.177-5.939-5.787 8.21-1.191z"
        />
      </svg>
    </template>

    <!-- Tampilan Angka Rating -->
    <span class="ml-2 text-sm font-medium">{{ rating.toFixed(1) }}</span>
  </div>
</template>
