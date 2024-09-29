<script setup>
import { ref, watch, computed } from 'vue';
import Logo from './ImageComponent/LogoComponent.vue';
import Cart from './ImageComponent/CartComponent.vue';
import { auth, db } from '../vue-firebase-auth';
import { RouterLink, useRouter } from 'vue-router';  
import { useAuth } from '../components/useAuth';
import ProfileImage from '../components/ProfilePicture.vue';
import { doc, getDoc } from 'firebase/firestore';
import { useCartStore } from '../components/store/cart'; // Import store cart

const cartStore = useCartStore();

// Computed property untuk menghitung jumlah item di keranjang
const cartItemCount = computed(() => cartStore.itemCount);  // Mengakses getter itemCount

const profileImage = ref('');
const { isLoggedIn, currentUser } = useAuth();
const isDropdownOpen = ref(false);
const displayName = ref('Guest');  // Set default displayName as 'Guest'
const router = useRouter();

// Fetch user's nickname from Firestore
const fetchNickname = async (uid) => {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    displayName.value = userData.nickname || 'Guest';  // Use nickname or fallback to 'Guest'
  }
};

// Watch for changes in currentUser and update displayName
watch(currentUser, (newUser) => {
  if (newUser) {
    fetchNickname(newUser.uid);  // Fetch nickname from Firestore
  } else {
    displayName.value = 'Guest';  // Reset to Guest when user logs out
  }
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function logout() {
  auth.signOut().then(() => {
    router.push('/signin');  // Redirect to signin page after logout
  }).catch((error) => {
    console.error('Logout failed: ', error);  // Handle error during logout
  });
}
</script>

<template>
  <div class="flex justify-between pt-5 px-48 w-full fixed z-50 bg-white">
    <div class="flex items-center gap-10">
      <Logo />
      <div class="flex items-center gap-5">
        <RouterLink
          to="/"
          class="home-page font-semibold cursor-pointer text-[12px] hover:text-indigo-400 active:text-indigo-400"
          >Store</RouterLink
        >
        <RouterLink
          to="/Search"
          class="home-page font-semibold cursor-pointer text-[12px] hover:text-indigo-400 active:text-indigo-400"
          >Games</RouterLink
        >
        <RouterLink
          to="/"
          class="home-page font-semibold cursor-pointer text-[12px] hover:text-indigo-400 active:text-indigo-400"
          >News</RouterLink
        >
      </div>
    </div>
    <div class="flex items-center gap-5">
      <router-link
        v-if="!isLoggedIn"
        to="/signin"
        class="font-semibold cursor-pointer text-[12px] hover:text-indigo-400 active:text-indigo-400"
        >Sign In</router-link
      >
      <div v-if="isLoggedIn" class="flex items-center gap-2 relative">
        
        <button
          v-on:click="toggleDropdown"
          class="btn px-2 py-1 font-semibold text-[12px] flex items-center"
        >
        <ProfileImage class="w-7 h-7 rounded-lg me-1" :profileImage="profileImage" :uploadEnabled="false"></ProfileImage>
        
         <span class="text-[12px] font-semibold">{{ displayName }}</span> <!-- Use displayName here -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
        <div
          v-if="isDropdownOpen"
          class="absolute top-10 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
        >
          <RouterLink
            to="/profile"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >View Profile</RouterLink
          >
          <RouterLink
            to="/settings"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Settings</RouterLink
          >
          <button
            v-on:click="logout"
            class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
            >Logout</button
          >
        </div>
        <router-link to="/cart" class="relative">
          <Cart />
          <!-- Notifikasi hanya ditampilkan jika cartItemCount > 0 -->
          <span v-if="cartItemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {{ cartItemCount }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
