<template>
    <div class="tabs w-full px-48 pb-20">
      <div class="tab-buttons flex justify-center ">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['px-4 py-2 rounded-md transition-all', { 'bg-slate-900 text-white': activeTab === tab, 'text-gray-700': activeTab !== tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="tab-content py-5">
        <div v-if="activeTab === 'Recent releases'">
          

<div class="grid grid-cols-6 gap-3">
    <router-link to="/details">
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://assets-prd.ignimgs.com/2023/06/12/dragonsdogma2-1686609309622.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
    </router-link>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://image.api.playstation.com/vulcan/ap/rnd/202312/1404/39743389302fa977d0faaf43afc5c4fe3ff62f164a8f1219.png" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://image.api.playstation.com/vulcan/ap/rnd/202306/0113/38ad0cc5b92af440d46ccebf5d1f271213d656684fce3385.png" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://image.api.playstation.com/vulcan/ap/rnd/202312/0701/3401bb6ae0d4f912f2d18e92501235c0e6f0fa1c5fe58961.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/09e726154938805.64947f37d43cb.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://store-images.s-microsoft.com/image/apps.42697.14512105128062645.af9dfbf6-f9ff-4b06-990d-523df7195906.b335ec1f-a21b-4ddf-8c6c-acd2f010ee93?q=90&w=480&h=270" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://admin.esports.gg/wp-content/uploads/2024/01/Horizon-Forbidden-West-PC-Release.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://cdn.mobygames.com/covers/8437192-the-legend-of-zelda-breath-of-the-wild-nintendo-switch-front-cov.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://blog.playstation.com/tachyon/2024/01/00b432c63c88b14d3bcf796380edb26e37c01032.jpeg?resize=1088%2C612&crop_strategy=smart" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://gamebrott.com/wp-content/uploads/2021/02/ratchet-and-clank-rift-apart-cover.jpg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://www.pieuvre.ca/wp-content/uploads/2022/03/tsushima-poster.jpeg" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    <div >
        <img class="h-36 max-w-full rounded-lg object-cover" src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1924490/capsule_616x353.jpg?t=1717106915" alt="">
        <div class="text-[12px]">Dragon Dogma 2</div>
      </div>
    
</div>
        </div>
        <div v-if="activeTab === 'Free-to-play'">
          <h2 class="text-xl font-semibold">Free-to-play</h2>
          <p>Ini adalah konten untuk permainan gratis.</p>
        </div>
        <div v-if="activeTab === 'Sports'">
          <h2 class="text-xl font-semibold">Sports</h2>
          <p>Ini adalah konten untuk olahraga.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: ['Recent releases', 'Free-to-play', 'Sports', 'Indies'],
        activeTab: 'Recent releases',
      };
    },
  };
  </script>
  
