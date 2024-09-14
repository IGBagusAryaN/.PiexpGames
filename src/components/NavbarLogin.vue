<script setup>
import Logo from './ImageComponent/LogoComponent.vue'
import Cart from './ImageComponent/CartComponent.vue'
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { auth } from '../../src/vue-firebase-auth';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const user = ref(null);

async function signout() {
  await signOut(auth).then((res) => {
    router.push('/');
  }).catch((err) => {
    console.error('Sign out error', err);
  });
}

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});
</script>

<template>
    <div class="flex justify-between pt-10 px-32 w-full fixed z-50">
        <div class="flex items-center gap-10">
            <Logo/>
            <div class="flex items-center gap-5">
                <routerLink to="/" class="home-page font-semibold cursor-pointer text-[12px]  hover:text-indigo-400 active:text-indigo-400">Store</routerLink>
                <routerLink to="/Search" class="home-page font-semibold cursor-pointer text-[12px]  hover:text-indigo-400 active:text-indigo-400">Games</routerLink>
                <routerLink to="/" class="home-page font-semibold cursor-pointer text-[12px]  hover:text-indigo-400 active:text-indigo-400">News</routerLink>
            </div>  
        </div>
        <div class="flex items-center gap-5">
            <div v-if="user">{{user?.email}} <button @click="signout" class="bg-red-500 text-white py-1 px-4 rounded-md">Sign Out</button></div>
            <Button class=""><Cart/></Button>
        </div>
    </div>
    
</template>
