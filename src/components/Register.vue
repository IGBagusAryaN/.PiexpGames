<script setup>
import Close from './ImageComponent/CloseComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../../src/vue-firebase-auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const nickname = ref(''); // Add a ref for the nickname
const router = useRouter();
const db = getFirestore(); // Initialize Firestore

const register = async (e) => {
  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Update the displayName with the nickname
    await updateProfile(user, {
      displayName: nickname.value,
    });

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      nickname: nickname.value,
      email: email.value,
    });

    alert(`Account created for ${user.email} with nickname ${nickname.value}`);
    router.push('/signin');
  } catch (err) {
    alert(err.message);
  }
};
</script>

<template>
  <div class="flex relative">
    <router-link to="/">
      <Close class="absolute right-32 mt-10 transform transition-transform duration-500 hover:scale-110" />
    </router-link>
    <div
      class="w-[50%] h-[100vh]"
      style="background-image: url('https://img.freepik.com/premium-photo/unleash-your-fortnite-battle-royale-skills-with-latest-cover-release_1015980-110499.jpg'); background-size: cover; background-position: center"
    ></div>
    <div class="w-[50%] h-[100vh] text-center flex flex-col justify-center items-center gap-3">
      <div class="text-[36px] font-bold">Register</div>
      <form class="w-full flex flex-col justify-center items-center gap-3" @submit.prevent="register">
        <input
          type="text"
          class="border border-solid border-[gray] w-[60%] py-1 px-4 rounded-md"
          placeholder="Nickname"
          v-model="nickname"
        />
        <input
          type="email"
          class="border border-solid border-[gray] w-[60%] py-1 px-4 rounded-md"
          placeholder="ID Masuk (Alamat Email)"
          v-model="email"
        />
        <input
          type="password"
          class="border border-solid border-[gray] w-[60%] py-1 px-4 rounded-md"
          placeholder="Password"
          v-model="password"
        />
        <button type="submit" class="w-[60%] bg-gray-800 hover:bg-gray-900 py-1 px-4 text-white rounded-md font-bold">
          REGISTER
        </button>
      </form>
      <router-link to="/signin" class="cursor-pointer">Already a user? Login</router-link>
    </div>
  </div>
</template>
