import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

import "./assets/main.css";
import "./assets/tailwind.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App);

app.use(router);

app.mount("#app");
