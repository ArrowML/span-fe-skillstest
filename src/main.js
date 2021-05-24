import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { faHome, faCamera, faMicrochip, faPassport, faSwatchbook, faVirus, faPaw, faUtensils, faRunning, faBook } from "@fortawesome/free-solid-svg-icons";
library.add([faAngleRight, faAngleLeft, faBars, faHome, faCamera, faMicrochip, faPassport, faSwatchbook, faVirus, faPaw, faUtensils, faRunning, faBook]);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).mount('#app')
