import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../vue-firebase-auth';
import { getAuth } from "firebase/auth";

export const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};


export function useAuth() {
  const isLoggedIn = ref(false);
  const currentUser = ref(null);
  const showLoginModal = ref(false);
  const showPaymentModal = ref(false);
  const router = useRouter();
    
  onMounted(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        isLoggedIn.value = true;
        currentUser.value = user;
        showLoginModal.value = false; // Sembunyikan modal login
        showPaymentModal.value = true; // Tampilkan modal pembayaran setelah login
      } else {
        isLoggedIn.value = false;
        currentUser.value = null;
        showLoginModal.value = true; // Tampilkan modal login
        showPaymentModal.value = false; // Sembunyikan modal pembayaran
      }
    });
  });

  return { isLoggedIn, currentUser, showLoginModal, showPaymentModal, router };
}
