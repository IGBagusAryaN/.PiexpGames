
<script setup>
import BtnVisit from './Button.vue';
</script>

<template>
    <div class="flex items-center px-48 h-[100vh] relative overflow-hidden mb-20">
        <div class="pt-16">
            <div class="font-bold text-[40px] text-[#0F051D]">
                <div>Unlock Exclusive Game </div>
                <div class="mt-[-15px]">Digital Treasures</div>
            </div>
            <div class="text-[12px] text-[#7B7583] max-w-md">Your premier source for games, consoles, accessories, and collectibles. Explore gaming excellence today!</div>
            <!-- <router-link><Button class="bg-[#0F051D] hover:bg-indigo-400 active:bg-indigo-400 focus:outline-none focus:ring focus:ring-violet-300 mt-5 text-white text-[12px] p-2 px-5 rounded-xl">Visit Games</Button></router-link> -->
        </div>
        <div class="">
            <div>
                <img class="pt-24 ml-[50px] z-50 updown-animation" src="../assets/Hero.png" alt="" width="390">
                <img class="absolute top-[60px] ml-[-75px] -z-50 " src="../assets/Bg-hero.png" alt="" width="800">
            </div>
        </div>
    </div>
   
</template>

<style>
.updown-animation {
    animation-name: infiniteupdown;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    transition: all .3s;
}

@keyframes infiniteupdown {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>