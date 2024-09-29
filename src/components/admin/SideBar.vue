<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useRoute } from 'vue-router'

const route = useRoute();

onMounted(() => {
    initFlowbite();
})
</script>
<template>
    
<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-5 pb-4 overflow-y-auto bg-white ">
      <ul class="space-y-2 font-medium">
         <li>
            <router-link to="/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-10 group relative">
              <span :class="{ 'indicator absolute -left-5 w-1.5 h-full bg-[#302F41] rounded-e-sm': route.path === '/dashboard',
              'indicator absolute -left-5 w-1.5 h-full bg-transparent group-hover:bg-[#302F41] rounded-e-sm': route.path !== '/dashboard'}"></span>
               <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ms-3">Dashboard</span>
            </router-link>
         </li>
         <li>
            <router-link to="/adddata" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group relative">
                <span :class="{ 'indicator absolute -left-5 w-1.5 h-full bg-[#302F41] rounded-e-sm': route.path === '/adddata',
              'indicator absolute -left-5 w-1.5 h-full bg-transparent group-hover:bg-[#302F41] rounded-e-sm': route.path !== '/adddata'}"></span>
                  <font-awesome-icon :icon="['fas', 'gamepad']" class="text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Add Data</span>
            </router-link>
         </li>
         
         <li>
            <router-link to="/checkout" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-10 group relative">
                <span :class="{ 'indicator absolute -left-5 w-1.5 h-full bg-[#302F41] rounded-e-sm': route.path === '/checkout',
              'indicator absolute -left-5 w-1.5 h-full bg-transparent group-hover:bg-[#302F41] rounded-e-sm': route.path !== '/checkout'}"></span>
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Checkout</span>
            </router-link>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-10 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

</template>