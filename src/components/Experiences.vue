<template>
    <div class="px-48">
      <!-- Loop melalui semua game di JSON -->
      <div v-for="game in games" :key="game.id" class="flex mb-10">
        <video class="w-96 h-full rounded-md" controlsList="nodownload" controls :poster="game.poster">
          <source :src="game.video" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="ml-4 -m-2">
          <div class="font-bold text-[24px]">{{ game.name }} Experiences</div>
          <div class="text-[12px] text-justify">{{ game.description }}</div>
          <button class="bg-gray-800 hover:bg-gray-900 text-white p-2 px-5 mt-10 rounded-md"  @click="$router.push({ name: 'GameDetail', params: { id: game.id } })">Play For Free</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import fortniteVideo from '../assets/Video/Fortnite.mp4';
  import valorantVideo from '../assets/Video/Valorant.mp4';
  // Data JSON yang diubah
  const games = [
    {
      id: 6,
      name: 'Fortnite',
      description: 'Fortnite offers an exhilarating experience where players drop into a vibrant, dynamic world filled with intense battles and creative challenges. Whether you\'re building structures to outsmart opponents or engaging in fast-paced firefights, Fortnite combines strategy, teamwork, and quick reflexes. The game’s ever-evolving map and frequent updates ensure fresh, thrilling gameplay, while its distinctive art style and wide array of customization options allow for a unique and immersive experience.',
      poster: 'https://i.ytimg.com/vi/5uE0XFJSVZA/maxresdefault.jpg',
      video: fortniteVideo
    },
    {
      id: 7,
      name: 'Valorant',
      description: 'Valorant is a tactical first-person shooter that blends precise gunplay with unique character abilities, creating a highly strategic and intense experience. Set in a near-future world, players choose from a diverse roster of agents, each with their own distinct powers, to outmaneuver and outgun the opposing team. The game demands sharp reflexes, teamwork, and careful planning, as every round can shift the tide of battle.',
      poster: 'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-5eff1895cb16cfb2bbbaaef1f6e90223',
      video: valorantVideo
    }
  ]
  
  // Fungsi untuk mengarahkan ke halaman detail game
  // const goToGameDetail = (id) => {
  //   // Misalnya kita menggunakan router untuk pindah ke halaman GameDetail
  //   // Di sini, `id` dari game akan digunakan sebagai parameter
  //   $router.push({ name: 'GameDetail', params: { id: id } })
  // }
  </script>
  