import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import applyTheme from './apply-theme'
import "./assets/tailwind.css";
import '@formkit/themes/genesis'
import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)
const pinia = createPinia();
const app = createApp(App).component('fa', FontAwesomeIcon);
app.use(router);
app.use(pinia)
app.use(plugin, defaultConfig({
  config: {
    classes: generateClasses({
      text: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      tel: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      file: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded shadow-sm border',
        input: 'border block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
        fileName: 'text-color-text text-sm leading-4 text-color-text ',
        fileItem: 'text-color-text text-sm leading-4 text-color-text ',
        fileList: 'text-sm leading-4 text-color-text',
        noFiles: 'text-sm leading-4 text-color-text',
        fileRemove: 'hidden',
      },
      email: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      url: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded-r border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
      },
      password: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      select: {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      'datetime-local': {
        outer: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      textarea: {
        outer: '$reset',
        wrapper: '$reset',
        label: '$reset block text-sm font-medium text-heading',
        inner: '$reset mt-1 flex rounded-md shadow-sm',
        input: '$reset text-color-text block w-full min-w-0 flex-1 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-transparent',
        help: '$reset mt-2 text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
    }),
  }
}));
app.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});

app.mount("#app");
applyTheme()
