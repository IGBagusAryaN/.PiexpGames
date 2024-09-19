<script setup>
import { ref, onMounted } from 'vue';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage, db } from '../vue-firebase-auth'; // Import Firebase configuration

// State data
const profileImage = ref(new URL('../assets/default.png', import.meta.url).href); // Gambar default
const selectedFile = ref(null); // File gambar yang dipilih
const user = ref(null); // Menyimpan informasi pengguna yang sedang login

// Fungsi untuk menangani perubahan file
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // Update UI untuk menampilkan gambar yang dipilih
    };
    reader.readAsDataURL(file);
  }
};

// Fungsi untuk mengunggah gambar ke Firebase Storage
const uploadImage = async () => {
  const auth = getAuth(); // Dapatkan instance Auth
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User UID:", user.uid);

      if (!selectedFile.value) {
        alert("Pilih file terlebih dahulu.");
        return;
      }

      // Gunakan UID user sebagai nama file untuk memastikan file lama tertimpa
      const fileRef = storageRef(storage, `profile-pictures/${user.uid}/profile.jpg`); // Nama file disimpan di folder user dengan nama tetap

      try {
        console.log("Uploading file...");
        await uploadBytes(fileRef, selectedFile.value); // Unggah file ke Firebase Storage

        const downloadURL = await getDownloadURL(fileRef); // Dapatkan URL file yang diunggah
        console.log("Download URL:", downloadURL);

        // Simpan URL gambar di Firestore
        const userDoc = doc(db, "users", user.uid); // Referensi ke dokumen user di Firestore
        await setDoc(userDoc, { profileImage: downloadURL }, { merge: true }); // Timpa URL yang lama dengan yang baru

        alert("Foto profil berhasil diunggah!");
        profileImage.value = downloadURL; // Update UI dengan gambar yang baru diunggah

      } catch (error) {
        console.error("Error uploading file:", error);
        alert(`Gagal mengunggah file. Error: ${error.message}`);
      }
    } else {
      // alert("Anda belum login!");
    }
  });
};

// Fungsi untuk mengambil gambar profil dari Firestore
const fetchProfileImage = async () => {
  if (!user.value) {
    // alert("Anda belum login!");
    return;
  }

  console.log("Fetching profile image for UID:", user.value.uid);
  const userDoc = doc(db, "users", user.value.uid); // Referensi ke dokumen user di Firestore
  const docSnapshot = await getDoc(userDoc); // Ambil dokumen user

  if (docSnapshot.exists()) {
    profileImage.value = docSnapshot.data().profileImage || profileImage.value; // Update gambar profil jika ada
  } else {
    console.log("No profile image found, using default.");
  }
};

// Fungsi untuk menginisialisasi pengguna
const initUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      fetchProfileImage(); // Ambil gambar profil setelah user login
    } else {
      user.value = null;
      profileImage.value = new URL('../assets/default.png', import.meta.url).href; // Reset ke gambar default jika tidak ada yang login
      // alert("Anda belum login!");
    }
  });
};

// Panggil initUser saat komponen di-mount
onMounted(() => {
  initUser();
});

const props = defineProps({
  profileImage: {
    type: String,
    required: true
  },
  uploadEnabled: {
    type: Boolean,
    default: true // Menentukan apakah input dan tombol "Upload" akan ditampilkan
  }
});
</script>

<template>
  <div class="flex flex-col items-center">
    <div :class="[$attrs.class, 'w-32 h-32 rounded-full object-cover']" >
      <!-- Menampilkan gambar profil -->
      <img :src="profileImage" alt="Profile Picture" :class="[$attrs.class, 'w-full h-full rounded-full object-cover']" />
    </div>
    <!-- Input untuk memilih file gambar -->
    <input v-if="uploadEnabled" type="file" @change="onFileChange" class="text-sm" />
    <!-- Tombol untuk mengunggah gambar -->
    <button v-if="uploadEnabled" @click="uploadImage" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Upload</button>
  </div>
</template>
