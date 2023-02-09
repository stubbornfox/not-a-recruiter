import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useJobStore = defineStore({
  id: 'job',
  state: () => ({
    jobs: [],
    paginate: null,
    job: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchJobs(filterParams) {
      this.loading = true
      try {
        const params = new URLSearchParams(filterParams);
        await api.get('/jobs', { params })
          .then((response) => {
            this.jobs = response.data.jobs
            this.paginate = response.data.paginate
          })
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

    async createJob(data) {
      this.loading = true
      const toast = useToast()
      try {
        this.job = await api.post(`/jobs`, {job: data})
          .then((response) => response.data)
        toast.success("Created job successfully!")
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
