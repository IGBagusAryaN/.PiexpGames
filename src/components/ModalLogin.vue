<template>
    <div v-if="showModalLog" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-[30%] flex flex-col justify-center items-center">
        <img src="../assets/login.png" alt="" width="100">
        <div>Yuk Login...!</div>
        <router-link to="/signin" class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-10 py-2.5 mt-5">
          Login
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    showModalLog: Boolean,
  });
  </script>
  