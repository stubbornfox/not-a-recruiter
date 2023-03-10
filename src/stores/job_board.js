import { defineStore } from 'pinia'
import api from '../services/api';
import { useUserStore } from './user'
import { useToast } from 'vue-toastification'

export const useJobBoardStore = defineStore({
  id: 'job_board',
  state: () => ({
    job_board: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchJobBoard(id) {
      this.job_board = null
      this.loading = true
      try {
        this.job_board = await api.get(`/job_boards/${id}`)
          .then((response) => response.data.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchJobBoards() {
      this.job_boards = null
      this.loading = true
      try {
        const job_boards = await api.get('/job_boards')
          .then((response) => response.data)
        if (job_boards.length > 0)
          this.job_board = job_boards[0]
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async customDomain(id, job_board_params) {
      this.loading = true
      const toast = useToast()
      try {
        this.job_board = await api.post(`/job_boards/${id}/custom_domain`, job_board_params)
          .then((response) => response.data)
        toast.success('Updated custom domain')
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async refreshSSL(id) {
      this.loading = true
      const toast = useToast()
      try {
        this.job_board = await api.post(`/job_boards/${id}/refresh_ssl`)
          .then((response) => response.data)
        toast.success('Refresh successfully')
      } catch (error) {
        this.error = error
        toast.error("Generate SSL certificate failed. Please check if a DNS record exists for this domain")
      } finally {
        this.loading = false
      }
    },

    async updateJobBoard(id, job_board_params) {
      this.loading = true
      const toast = useToast()
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        this.job_board = await api.put(`/job_boards/${id}`, job_board_params, config)
          .then((response) => response.data)
        toast.success('Job boards setting saved')
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
