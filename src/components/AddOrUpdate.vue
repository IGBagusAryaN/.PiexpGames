<script setup>
import {defineComponent, ref, onMounted} from 'vue' 
import {db} from '../../src/vue-firebase-auth';
import {collection, addDoc, doc, updateDoc} from 'firebase/firestore'

const props = defineProps({
    data: Object,
    isNew: Boolean,
})

defineComponent({
    name : "AddOrUpdate"
})

onMounted(() => {
    game.value = {...game.value, ...props.data}
})

const emits = defineEmits(['close'])

const game = ref({
    name: '',
    description: '',
    price: '',
    image: '',
    discountprice:'',
    type1:'',
    type2:'',
    discount:''
})

async function addOrUpdate() {
    if (props.isNew){
        await addDoc(collection(db, 'Games'), game.value).then((res) =>{
            emits('close')
        })
    }
    else{
        await updateDoc(doc(db, 'Games', props.data.id), game.value).then((res)=> {
            emits('close')
        })
        
        }
    }
</script>

<template>
    <transition name="modal">
        <div class="absolute w-[100vw] h-[100vh] top-0 left-0 transition-opacity duration-300 ease-in-out z-50 overflow-hidden">
            <div class="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
                <div class="w-[90%] max-w-lg bg-white text-center border border-gray-300 p-5 rounded-lg shadow-lg ">
                    <input type="text" placeholder="Enter your Name" v-model="game.name" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter your Image URL" v-model="game.image" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter Discount Price" v-model="game.discountprice" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter Discount" v-model="game.discount" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter Type 1" v-model="game.type1" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter Type 2" v-model="game.type2" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <input type="text" placeholder="Enter Price" v-model="game.price" 
                        class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                    <textarea placeholder="Enter your Description" v-model="game.description" 
                            class="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"></textarea>
                    <div class="flex justify-between">
                        <button @click="emits('close')"
                                class="text-sm font-medium border border-black px-4 py-2 rounded-md transition duration-300 ease-in-out 
                                    hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:ring-indigo-300">
                            Close
                        </button>
                        <button @click="addOrUpdate()"
                                class="text-sm font-medium border border-black px-4 py-2 rounded-md transition duration-300 ease-in-out 
                                    bg-black text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
                            {{isNew ? 'Add' : 'Update'}}
                        </button>
                    </div>

                    </div>
                    
                </div>
            </div>
    </transition>
</template>