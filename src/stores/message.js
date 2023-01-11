import { defineStore } from 'pinia'
import api from '../services/api'

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchMessages(roomId) {
      this.loading = true
      try {
        this.messages = await api.get(`/rooms/${roomId}/messages`).then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createMessage(roomId, data) {
      this.loading = true
      try {
        await api.post(`/rooms/${roomId}/messages`, data)
          .then((response) => this.messages.push(response.data))
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
