import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('user', {
  state: () => ({
    me: null,
    organization: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getMe() {
      try {
        this.me = await api.get('/me')
          .then((response) => response.data)
        this.organization = this.me.organization
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
