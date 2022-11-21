import { defineStore } from 'pinia'
import api from '../services/api';

export const useOrganizationStore = defineStore({
  id: 'organization',
  state: () => ({
    organizations: [],
    organization: null,
    loading: false,
    error: null
  }),
  actions: {
    setOrganization(organization_id) {
      this.organization = this.organizations.find(o => o.id == organization_id)
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
        this.organization = await api.post('/organizations', { organization })
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
