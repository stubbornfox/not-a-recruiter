import { defineStore } from 'pinia'
import api from '../services/api';
import { useToast } from 'vue-toastification'

export const useNotificationStore = defineStore({
  id: 'notice',
  state: () => ({
    notices: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchNotifications() {
      this.loading = true
      try {
        this.notices = await api.get('/notifications')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    // async markAsRead(job_id) {
    //   this.loading = true
    //   try {
    //     this.notification = await api.get(`/jobs/${job_id}`)
    //       .then((response) => response.data)
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async updateJob(job_id, data) {
    //   this.loading = true
    //   const toast = useToast()
    //   try {
    //     this.job = await api.put(`/jobs/${job_id}`, data)
    //       .then((response) => response.data)
    //     toast.success("Updated job successfully!")
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },
  }
})
