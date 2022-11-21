import axios from "axios";
import authHeader from '../auth-header';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const user = useAuthStore().user;
    if (user && user.token) {
      config.headers["Authorization"] = 'Bearer ' + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        useAuthStore().logout()
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
