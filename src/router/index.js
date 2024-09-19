import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/views/Home.vue';
import Search from '../components/views/Search.vue';
import SignIn from '../components/views/LoginPage.vue'
import SignUp from '../components/views/RegisterPage.vue'
import Details from '../components/views/DetailGamesView.vue'
import Cart from '../components/views/CartPage.vue'
import DashboardAdmin from '../views/adminviews/Dashboardviews.vue'
import AddDataAdmin from '../views/adminviews/AddDataViews.vue'
import CheckoutAdmin from '../views/adminviews/CheckoutVIews.vue'
import test from '../components/views/testview.vue'
import ProfilePictureViews from '../components/views/ProfileView.vue'

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
  {
    path: '/dashboard',
    name: 'dashboardviews',
    component: DashboardAdmin,
  },
  {
    path: '/adddata',
    name: 'adddataviews',
    component: AddDataAdmin,
  },
  {
    path: '/checkout',
    name: 'checkoutviews',
    component: CheckoutAdmin,
  },
  {
    path: '/test',
    name: 'checkoutviews',
    component: test,
  },
  {
    path: '/profile',
    name: 'profilepictureviews',
    component: ProfilePictureViews,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use import.meta.env.BASE_URL
  routes,
});

export default router;

