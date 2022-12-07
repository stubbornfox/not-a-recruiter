import { defineStore } from 'pinia'
import axios from 'axios';
import { useToast } from 'vue-toastification'

export const usePublicJobStore = defineStore({
  id: 'public_job',
  state: () => ({
    jobs: [],
    job: null,
    job_board: null,
    organization: null,
    loading: false,
    error: null,
    applied: false,
  }),
  actions: {
    async fetchOrganization(organization_id) {
      this.loading = true
      try {
        this.organization = await axios.get(`/publics/organizations/${organization_id}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchJobs(organization_id) {
      this.loading = true
      try {
        this.jobs = await axios.get(`/publics/organizations/${organization_id}/jobs/`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchJob(organization_id, job_id) {
      this.loading = true
      try {
        this.job = await axios.get(`/publics/organizations/${organization_id}/jobs/${job_id}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchJobBoard(organization_id) {
      this.loading = true
      try {
        this.job_board = await axios.get(`/publics/organizations/${organization_id}/job_board`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async applyJob(organization_id, job_id, body) {
      this.loading = true
      try {
        await axios.post(`/publics/organizations/${organization_id}/jobs/${job_id}/apply`, body )
          .then((response) => response.data)
        this.applied = true
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
