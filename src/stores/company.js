import { defineStore } from 'pinia'
import api from '../services/api';
import { useUserStore } from './user'
import { useToast } from 'vue-toastification'

export const useCompanyStore = defineStore({
  id: 'company',
  state: () => ({
    company: null,
    error: null,
    loading: false
  }),
  actions: {
    async fetchProfile() {
      this.loading = true
      try {
        this.company = await api.get(`/organizations/profile`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(organization) {
      this.loading = true
      const toast = useToast()
      try {
        this.organization = await api.put(`/organizations/${organization.id}`, { organization })
          .then((response) => response.data)
        toast.success("Updated organization successfully!")
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
