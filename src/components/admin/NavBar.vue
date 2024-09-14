<script setup>
import SideBar from './SideBar.vue';
import Logo from '../ImageComponent/LogoIcon.vue'
import Searchinput from './SearchInput.vue';
</script>

<template>    
<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-20">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
               <!-- ganti -->
            </svg>
         </button>
        <a href="https://flowbite.com" class="">
          <Logo/>
        </a>
        <Searchinput class="ms-32"/>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ms-3">
            <font-awesome-icon :icon="['far', 'bell']" class="me-12 text-[22px]" />
            
            <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 focus:ring-4 focus:ring-gray-100"
                type="button"
            >
                <span class="sr-only">Open user menu</span>
                <img
                class="w-9 h-9 me-2 rounded-sm"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAXajNKBH2HgywTG1FWAB6F6yQTcsxWgjDjA&s"
                alt="user photo"
                />
                <div class="text-left">
                    <div class="flex items-center">
                        <div class="font-semibold text-gray-900 text-[12px]">Schawn Miles</div>
                        <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                        </svg>
                    </div>
                    <div class="text-gray-500 text-[10px] -mt-1">Admin</div>
                </div>
            </button>

            <!-- Dropdown menu -->
            <div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <div class="px-4 py-3 text-sm text-gray-900">
                <div class="font-medium ">Pro User</div>
                <div class="truncate">name@flowbite.com</div>
                </div>
                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                </li>
                </ul>
                <div class="py-2">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</a>
                </div>
            </div>

            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow " id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 " role="none">
                  Neil Sims
                </p>
                <p class="text-sm font-medium text-gray-900 truncate" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<SideBar/>


</template>