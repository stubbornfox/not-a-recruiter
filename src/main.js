import { createApp, h } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import applyTheme from './apply-theme'
import "./assets/tailwind.css";
import '@formkit/themes/genesis'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
import 'vue-select/dist/vue-select.css'


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import vSelect from "vue-select";
import dayjs from 'dayjs';
import "./assets/main.css";
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import IconXMarkPurple from '@/components/icons/IconXMarkPurple.vue'

library.add(far, fas)
const pinia = createPinia();
const app = createApp(App).component('fa', FontAwesomeIcon).component('v-select', vSelect);
app.use(router);
app.use(pinia);
app.use(plugin, defaultConfig({
  config: {
    classes: generateClasses({
      global: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      text: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      number: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      tel: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      file: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: 'border block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
        fileName: 'text-sm leading-4 ',
        fileItem: 'text-sm leading-4 ',
        fileList: 'text-sm leading-4 text-color-text',
        noFiles: 'text-sm leading-4 text-color-text',
        fileRemove: 'hidden',
      },
      email: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      url: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1-r border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
      },
      password: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      select: {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      checkbox: {
        wrapper:'',
        outer: '$reset',
        options: 'mt-4',
        fieldset: '$reset',
        label: '$reset block font-normal text-neutrals-80',
        inner: '$reset flex pl-1',
        input: 'border-2 rounded-sm',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
        decorator: '$reset formkit-decorator relative block content-box w-6 h-6 shadow-none bg-white border-2 border-neutrals-20',
      },
      'datetime-local': {
        outer: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      },
      textarea: {
        outer: '$reset',
        wrapper: '$reset',
        label: '$reset block font-semibold text-neutrals-100',
        inner: '$reset mt-4 flex',
        input: '$reset block w-full min-w-0 flex-1 border-neutrals-20 focus:border-primary focus:ring-0 bg-transparent',
        help: '$reset mt-2 text-sm text-neutrals-60',
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

app.use(VCalendar, {input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],})

vSelect.props.components.default = () => ({
  Deselect: {
    render: () => h('span', [h(IconXMarkPurple)]),
  },
  OpenIndicator: {
    render: () => h('span', [h(IconChervonDown)]),
  },
});

app.use(vSelect)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  },
  formatDate(value) {
    return dayjs(value).format('MMM D, YYYY')
  }
}

app.mount("#app");
applyTheme()
