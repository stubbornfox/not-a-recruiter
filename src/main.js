import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

import "./assets/main.css";
import "./assets/tailwind.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

const app = createApp(App).component('fa', FontAwesomeIcon);

app.use(router);

app.mount("#app");
