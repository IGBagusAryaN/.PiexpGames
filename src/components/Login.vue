<script setup>
import Close from './ImageComponent/CloseComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../../src/vue-firebase-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const router = useRouter();

const login= async (e) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    alert(`You are Logged in as ${user.email}`);
    router.push('/');
  } catch (err) {
    alert(err.message);
  }
};
</script>

<template>
    <div class="flex relative">
        <router-link to="/"><Close class="absolute right-32 mt-10 transform transition-transform duration-500 hover:scale-110"/></router-link> 
        <div class="w-[50%] h-[100vh]" style="background-image: url(https://img.freepik.com/premium-photo/unleash-your-fortnite-battle-royale-skills-with-latest-cover-release_1015980-110499.jpg); background-size: cover; background-position: center">
        </div>
        <div class="w-[50%] h-[100vh] text-center flex flex-col justify-center items-center gap-3">
            <div class="text-[36px] font-bold">Login</div>
            <form class="w-full flex flex-col justify-center items-center gap-3" @submit.prevent="login">
                <input type="email" class="border border-solid border-[gray] w-[60%] py-1 px-4 rounded-md" placeholder="ID Masuk (Alamat Email)" v-model="email">
                <input type="password" class="border border-solid border-[gray] w-[60%] py-1 px-4 rounded-md" placeholder="Password" v-model="password">
                <button type="submit" class="w-[60%] bg-gray-800 hover:bg-gray-900 py-1 px-4 text-white rounded-md font-bold">LOGIN</button>
            </form>
            <router-link to="/signup" class="cursor-pointer">Not a user? Register</router-link>
        </div>
    </div>
</template>


