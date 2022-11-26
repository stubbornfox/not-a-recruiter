import { defineStore } from 'pinia'
import api from '../services/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    me: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getMe() {
      try {
        this.me = await api.get('/me')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
})
