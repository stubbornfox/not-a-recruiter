import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useCandidateStore = defineStore({
  id: 'organization',
  state: () => ({
    candidates: [],
    candidate: null,
    loading: false,
    error: null
  }),
  actions: {
    async getCandidates(job_id, stage) {
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

    async getCandidate(job_id, stage, candidate_id) {
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

    async moveCandidate(job_id, stage, candidate_id, new_stage) {
      this.loading = true
      const toast = useToast()
      try {
        this.organization = await api.put(`/jobs/${job_id}/candidates/${candidate_id}?stage=${stage}`)
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
