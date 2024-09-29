<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../vue-firebase-auth'; 
import { useRouter } from 'vue-router';
import ProfileImage from '../components/ProfilePicture.vue';

const email = ref('');
const nickname = ref('');
const profileImage = ref('');
const router = useRouter();
const auth = getAuth();
let unsubscribe = null;  // To store the snapshot listener reference

// Fetch user data from Firestore and set up onSnapshot listener for real-time updates
const fetchUserData = (user) => {
  const userDocRef = doc(db, 'users', user.uid);

  // Set up onSnapshot to listen for real-time updates
  unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      console.log('Real-time update received:', userData);  // Debugging log
      email.value = userData.email || user.email;  // Email from Firestore or Auth
      nickname.value = userData.nickname || '';    // Nickname from Firestore
      profileImage.value = userData.profileImage || ''; // Profile image from Firestore
      localStorage.setItem('userEmail', email.value);  // Save to localStorage
    } else {
      console.log('No such document!');  // Debugging log
    }
  }, (error) => {
    console.error('Error in onSnapshot:', error);  // Debugging log
  });
};

// Update nickname in Firestore
const updateNickname = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, { nickname: nickname.value });  // Update nickname in Firestore
      console.log('Nickname updated to:', nickname.value);  // Debugging log
      alert('Nickname updated successfully!');
    } catch (error) {
      console.error('Error updating nickname:', error);
      alert('Failed to update nickname.');
    }
  }
};

onMounted(() => {
  // Use onAuthStateChanged to detect authenticated users after refresh
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User authenticated:', user.email);  // Debugging log
      fetchUserData(user);  // Fetch user data if authenticated
    } else {
      // Redirect to login if user not authenticated
      const savedEmail = localStorage.getItem('userEmail');  // Check localStorage
      if (savedEmail) {
        email.value = savedEmail;  // Display email from localStorage if available
      } else {
        console.log('No user authenticated, redirecting to login');  // Debugging log
        router.push('/login');  // Redirect to login if no user is found
      }
    }
  });
});

// Clean up onSnapshot listener when component is destroyed
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();  // Unsubscribe from Firestore updates
    console.log('Unsubscribed from Firestore updates');  // Debugging log
  }
});
</script>


<template>
    <div class="pt-24 px-48">
      <div class="font-bold text-[24px] text-[#0F051D]">Settings Your Account</div>
      <div class="grid grid-cols-4">
        <div class="mt-5 col-span-1">
          <label class="font-medium" for="profileImage">Profile Image</label>
          <ProfileImage
            :profileImage="profileImage"
            :uploadEnabled="true"
            alt="Profile"
            class="rounded-md w-48 h-48"
            id="profileImage"
          ></ProfileImage>
        </div>
        <div class="mt-10 col-span-3">
          <label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label>
          <!-- Input yang bisa diubah untuk nickname -->
          <input
            id="nickname"
            v-model="nickname"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Nickname"
          />
  
          <label for="email" class="block text-sm font-medium text-gray-700 mt-3">Email</label>
          <!-- Tampilkan email di div -->
          <div
            id="email"
            class="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
          >
            {{ email }}
          </div>
  
          <!-- Tombol untuk menyimpan nickname -->
          <button
            class="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  px-4 py-2 rounded-md"
            @click="updateNickname"
          >
            Save Nickname
          </button>
        </div>
      </div>
    </div>
  </template>
  