import { defineStore } from 'pinia';
import { collection, addDoc, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../../vue-firebase-auth'; // Pastikan path ke Firebase instance benar
import { getAuth } from "firebase/auth";

// Helper function to get current user ID safely
const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],           // Menyimpan game yang ada di cart
    userId: null,       // User ID akan diinisialisasi saat user login
  }),
  getters: {
    // Getter untuk menghitung jumlah item di cart
    itemCount(state) {
      return state.cart.length;
    }
  },
  actions: {
    // Set userId setelah user login
    setUserId(userId) {
      console.log('Setting User ID:', userId); // Debugging log
      this.userId = userId;
    },

    // Tambah game ke cart
    async addToCart(game) {
      try {
        if (this.userId) {
          // Check if the game is already in the cart
          const existingGame = this.cart.find(item => item.id === game.id);
          if (existingGame) {
            console.log('Game is already in the cart');
            return; // Exit if the game is already in the cart
          }

          const cartRef = collection(db, `carts/${this.userId}/games`);
          await addDoc(cartRef, game);

          // Update the cart state
          this.cart.push(game);
        } else {
          console.error('User ID is missing');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },

    // Menghapus game dari cart
    async removeFromCart(gameId) {
      try {
        if (this.userId) {
          const cartRef = collection(db, `carts/${this.userId}/games`);
          const q = query(cartRef, where('id', '==', gameId));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);  // Menghapus dari Firestore
          });

          // Menghapus dari state cart
          this.cart = this.cart.filter(game => game.id !== gameId);
        } else {
          console.error('User ID is missing');
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },

    // Fungsi checkout
    async checkout() {
      try {
        if (this.userId && this.cart.length > 0) {
          console.log('Processing checkout...');

          // Kosongkan cart dari Firestore
          const cartRef = collection(db, `carts/${this.userId}/games`);
          const querySnapshot = await getDocs(cartRef);

          querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);  // Hapus setiap game dari Firestore
          });

          // Kosongkan cart di state setelah checkout berhasil
          this.cart = [];
        } else {
          console.error('No items in cart or User ID is missing');
        }
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    },

    // Memuat data cart dari Firestore
    async fetchCart() {
      try {
        if (this.userId) {
          const cartRef = collection(db, `carts/${this.userId}/games`);
          const snapshot = await getDocs(cartRef);
          
          // Hapus duplikat berdasarkan ID
          const uniqueGames = [];
          const gameIds = new Set();  // Set untuk melacak game yang sudah ada
          
          snapshot.docs.forEach(doc => {
            const game = doc.data();
            if (!gameIds.has(game.id)) {  // Periksa apakah ID sudah ada
              uniqueGames.push({
                id: doc.id,
                ...game,
              });
              gameIds.add(game.id);  // Tambahkan ID ke set
            }
          });
          
          this.cart = uniqueGames;  // Simpan game unik di cart
        } else {
          console.error('User ID is missing');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  }
});
