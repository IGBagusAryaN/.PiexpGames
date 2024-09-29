<template>
  <transition name="fade" mode="out-in">
      <router-view />
    </transition>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { useCartStore } from '../src/components/store/cart';
import { auth } from '../src/vue-firebase-auth'; // Pastikan impor auth sudah benar

export default {
  name: 'App',

  created() {
    const cartStore = useCartStore();

    // Listener global Firebase Authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        cartStore.setUserId(user.uid);  // Set userId di store
        console.log('User logged in with ID:', user.uid);
      } else {
        console.error('No user is signed in');
      }
    });
  }
};
</script>