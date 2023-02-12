import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useApplicantStore = defineStore({
  id: 'applicant',
  state: () => ({
    applicants: [],
    applicant: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchApplicants() {
      this.loading = true
      try {
        this.applicants = await api.get(`/applicants`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchApplicant(applicantId) {
      this.loading = true
      try {
        this.applicant = await api.get(`/applicants/${applicantId}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateCandidate(job_id, stage, applicantId, data) {
      this.loading = true
      const toast = useToast()
      try {
        this.applicant = await api.put(`/jobs/${job_id}/applicants/${applicantId}`, data)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
