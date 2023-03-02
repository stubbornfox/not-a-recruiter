import { defineStore } from 'pinia'
import api from '../services/api';
import { useUserStore } from './user'
import { useToast } from 'vue-toastification'

export const useOrganizationStore = defineStore({
  id: 'organization',
  state: () => ({
    organizations: [],
    organization: null,
    loading: false,
    error: null
  }),
  actions: {
    async activeOrganization(organization_id) {
      try {
        const og =  await api.put(`/organizations/${organization_id}/organizations_users/active`)
          .then((response) => response.data)
        useUserStore().organization = og
        this.organization = og
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    getOrganization() {
      this.organization = user?.organization
    },

    async fetchOrganizations() {
      this.organizations = []
      this.loading = true
      try {
        this.organizations = await api.get('/organizations')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createOrganization(organization) {
      this.loading = true
      try {
        this.organization = await api.post('/organizations', organization)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateOrganization(organization) {
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
