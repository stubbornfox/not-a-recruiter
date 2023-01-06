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

    async markAsRead(notificationId) {
      this.loading = true
      try {
        this.notification = await api.post(`/notifications/${notificationId}/mark_as_read`)
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
