import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/views/Home.vue';
import Search from '../components/views/Search.vue';
import SignIn from '../components/views/LoginPage.vue'
import SignUp from '../components/views/RegisterPage.vue'
import Details from '../components/views/DetailGamesView.vue'
import Cart from '../components/views/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/game/:id',
    name: 'GameDetail',
    component: Details,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use import.meta.env.BASE_URL
  routes,
});

export default router;

