import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { createPinia } from 'pinia'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHouse, faChevronRight, faChevronLeft, faXmark, faGamepad} from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(faHouse, faChevronRight, faChevronLeft, faXmark, faBell, faGamepad)

const app = createApp(App);
const pinia = createPinia()

/* create the app instance */

// Tambahkan Pinia ke aplikasi
app.use(createPinia());


/* register the font-awesome-icon component */
app.component("font-awesome-icon", FontAwesomeIcon);

/* use the router */
app.use(router);

/* mount the app to the DOM */
app.mount('#app');
