// src/firebaseCart.js
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../vue-firebase-auth'; // Import Firestore instance

// Menambahkan item ke cart di Firestore
export const addToCart = async (userId, item) => {
  const cartRef = doc(db, 'carts', userId);

  try {
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      await updateDoc(cartRef, {
        items: arrayUnion(item) // Tambahkan item ke array 'items' di cart
      });
    } else {
      await setDoc(cartRef, { items: [item] }); // Buat dokumen cart baru jika belum ada
    }
  } catch (error) {
    console.error("Error adding to cart: ", error);
  }
};

// Mengambil cart dari Firestore
export const getCart = async (userId) => {
  const cartRef = doc(db, 'carts', userId);

  try {
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items;
    } else {
      console.log("No cart found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting cart: ", error);
    return [];
  }
};

// Menghapus item dari cart di Firestore
export const removeFromCart = async (userId, item) => {
  const cartRef = doc(db, 'carts', userId);

  try {
    await updateDoc(cartRef, {
      items: arrayRemove(item)
    });
  } catch (error) {
    console.error("Error removing from cart: ", error);
  }
};
 