import { defineStore } from 'pinia'
import api from '../services/api';

export const useJobBoardStore = defineStore({
  id: 'job_board',
  state: () => ({
    job_board: null,
    loading: false,
    error: null
  }),
  getters: {
    // getPostsPerAuthor: (state) => {
    //   return (authorId) => state.posts.filter((post) => post.userId === authorId)
    // }
  },
  actions: {
    async fetchJobBoard(id) {
      this.job_board = null
      this.loading = true
      try {
        this.post = await api.get(`/job_boards/${id}`)
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

    async saveJobBoard(job_board_params) {
      const id = job_board_params.get('job_board[id]')
      if (id)
        await this.updateJobBoard(id, job_board_params)
      else
        await this.createJobBoard(job_board_params)

    },

    async createJobBoard(job_board_params) {
      this.loading = true
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        this.job_board = await api.post("/job_boards", job_board_params, config)
          .then((response) => response.data)
        alert('Created')
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async updateJobBoard(id, job_board_params) {
      this.loading = true
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        this.job_board = await api.put(`/job_boards/${id}`, job_board_params, config)
          .then((response) => response.data)
        alert('Update')
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
