import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useCandidateStore = defineStore({
  id: 'candidate',
  state: () => ({
    candidates: [],
    candidate: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchCandidates(job_id, stage) {
      this.loading = true
      try {
        this.candidates = await api.get(`/jobs/${job_id}/candidates?stage=${stage}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchCandidate(job_id, stage, candidate_id) {
      this.loading = true
      try {
        this.candidate = await api.get(`/jobs/${job_id}/candidates/${candidate_id}?stage=${stage}`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateCandidate(job_id, stage, candidate_id, data) {
      this.loading = true
      const toast = useToast()
      try {
        this.candidate = await api.put(`/jobs/${job_id}/candidates/${candidate_id}`, data)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
