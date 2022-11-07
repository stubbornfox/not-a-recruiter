import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

import "./assets/main.css";
import "./assets/tailwind.css";
import '@formkit/themes/genesis'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

const app = createApp(App).component('fa', FontAwesomeIcon);

app.use(router);
app.use(plugin, defaultConfig({
      config: {
        classes: generateClasses({
          text: {
            outer: '$reset sm:col-span-4',
            label: '$reset block text-sm font-medium text-gray-700',
            inner: '$reset mt-1 flex rounded-md shadow-sm',
            input: '$reset block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            help: '$reset mt-2 text-sm text-gray-500',
            messages: 'list-none p-0 mt-1 mb-0',
            message: 'text-red-500 mb-1 text-xs'
          },
          textarea: {
            outer: '$reset sm:col-span-6',
            wrapper: '$reset',
            label: '$reset block text-sm font-medium text-gray-700',
            inner: '$reset mt-1 flex rounded-md shadow-sm',
            input: '$reset block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            help: '$reset mt-2 text-sm text-gray-500',
            messages: 'list-none p-0 mt-1 mb-0',
            message: 'text-red-500 mb-1 text-xs'
          },
        }),
      }
    })
  );


app.mount("#app");
