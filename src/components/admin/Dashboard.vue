<template>
    <div class="p-6 ms-56 mt-16">
      <!-- Dashboard Heading -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
      </div>
  
      <!-- Welcome Banner -->
      <div class="bg-[#302F41] text-white rounded-lg p-6 flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold mb-2">Welcome to .PiexpGames</h2>
          <p class="mb-4">The best place for pension schemes</p>
          <button class="bg-white text-indigo-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
            Learn More
          </button>
        </div>
        <!-- Illustration (replace with an actual image or SVG) -->
        <div class="ml-6 -m-10">
          <!-- Tempatkan gambar atau ilustrasi di sini -->
          <img src="../../assets/Banner.png" alt="Illustration" class="w-96 h-auto me-20">
        </div>
      </div>
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- User Profile -->
        <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Add Data Games History</h2>
            <div class="bg-white p-3 rounded-lg shadow-md">
                <Table :tables="tables1" :headers="headers"/>
            </div>
        </div>

        <!-- Beneficiaries -->
        <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Checkout Info</h2>
            <div class="bg-white p-3 rounded-lg shadow-md">
                <Table :tables="tables1" :headers="headers"/>
            </div>
        </div>  
    </div>
    </div>
    
  </template>
  
  <script setup>
import Table from './Table.vue';
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import axios from 'axios';

const tables1 = ref([]);
const headers = [
  { label: 'User ID', field: 'id' },
  { label: 'Username', field: 'field1' },
  { label: 'Email', field: 'field2' },
  { label: 'Password', field: 'field3' },
  { label: 'Role', field: 'field4' },
  { label: 'Subscription Type', field: 'field5' },
  { label: 'Subscription Status', field: 'field6' }
];

onMounted(() => {
  axios.get('https://api.npoint.io/3471b9537f5282e32e23')
    .then(response => {
      tables1.value = response.data;
    })
    .catch(err => {
      console.log("Error fetching tables1 data:", err.message);
    });
});
  </script>
  
  <style scoped>
  </style>
  