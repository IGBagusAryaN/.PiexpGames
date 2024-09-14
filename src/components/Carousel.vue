<template>
  <section id="hero" class="relative overflow-hidden h-[80vh] my-20 text-center">
    <div class="container mx-auto w-[70%] h-full relative overflow-hidden rounded-md">
      <div
        id="slide"
        class="flex transition-transform duration-700 ease"
        :style="{ transform: `translateX(-${currentTranslate}%)`, transition: `${noTransition ? 'none' : 'transform 0.7s ease'}` }"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="item.id"
          class="item relative flex-shrink-0 w-full h-full cursor-pointer"
          @click="$router.push({ name: 'GameDetail', params: { id: item.id } })"
        >
          <img :src="item.image" alt="Slide Image" class="w-full h-full object-cover" />
          <div class="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black to-transparent opacity-90"></div>
          <div class="absolute top-80 left-10 w-96 text-left" :key="item.name + currentIndex">
            <div class="text-2xl font-bold mb-1 text-white animate-text">{{ item.name }}</div>
            <div class="text-sm mb-3 text-white animate-text">{{ item.description }}</div>
          </div>
        </div>
      </div>
      <button @click="handleSlidePrev" class="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-3 py-1 rounded-full shadow-lg">
        ‹
      </button>
      <button @click="handleSlideNext" class="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-3 py-1 rounded-full shadow-lg">
        ›
      </button>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const currentTranslate = ref(0);
const noTransition = ref(false);
const currentIndex = computed(() => currentTranslate.value / 100);

const items = ref([]); // Awalnya kosong, akan diisi dari API
const visibleItems = ref([]);

let interval = null;

const fetchData = async () => {
  try {
    const response = await fetch("https://api.npoint.io/88ef2dfd522ced4ff2d8"); // ganti dengan URL npoint yang benar
    const data = await response.json();

    items.value = data.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
    }));

    visibleItems.value = [...items.value, items.value[0]]; // Tambahkan slide pertama di akhir untuk looping
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const startAutoSlide = () => {
  interval = setInterval(() => {
    slideNext();
  }, 6000);
};

const stopAutoSlide = () => {
  clearInterval(interval);
};

const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

const slideNext = () => {
  if (currentTranslate.value >= items.value.length * 100) {
    noTransition.value = true;
    currentTranslate.value = 0; // Loop kembali ke slide pertama
    setTimeout(() => {
      noTransition.value = false;
      currentTranslate.value += 100; // Pindah ke slide kedua setelah reset
    }, 50);
  } else {
    currentTranslate.value += 100;
  }
};

const slidePrev = () => {
  if (currentTranslate.value === 0) {
    // Jika di slide pertama, pindah ke slide terakhir dengan mulus
    noTransition.value = true;
    currentTranslate.value = items.value.length * 100; // Pindah ke slide terakhir
    setTimeout(() => {
      noTransition.value = false;
      currentTranslate.value -= 100; // Mulai bergerak dari slide terakhir
    }, 50);
  } else {
    currentTranslate.value -= 100;
  }
};

const onTransitionEnd = () => {
  if (currentTranslate.value >= items.value.length * 100) {
    noTransition.value = true;
    currentTranslate.value = 0; // Loop kembali ke slide pertama
    setTimeout(() => {
      noTransition.value = false;
    }, 50);
  }
};

const handleSlideNext = () => {
  slideNext();
  resetAutoSlide();
};

const handleSlidePrev = () => {
  slidePrev();
  resetAutoSlide();
};

onMounted(async () => {
  await fetchData();
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.item {
  transition: transform 0.7s ease;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animate-text {
  animation: fadeInUp 1.2s ease-out forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
