import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useJobStore = defineStore({
  id: 'job',
  state: () => ({
    jobs: [],
    job: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchJobs() {
      this.loading = true
      try {
        this.jobs = await api.get('/jobs')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchJob(job_id) {
      this.loading = true
      try {
        this.job = await api.get(`/jobs/${job_id}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateJob(job_id, data) {
      this.loading = true
      const toast = useToast()
      try {
        this.job = await api.put(`/jobs/${job_id}`, data)
          .then((response) => response.data)
        toast.success("Updated job successfully!")
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
