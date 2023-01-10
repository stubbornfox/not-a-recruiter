import { defineStore } from 'pinia'
import api from '../services/api';

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchMessages() {
      this.loading = true
      try {
        this.messages = [
          {id: 1, unread: true, sender: 'James', time: '12 mins ago', text: 'We want to invite you', sender_avatar: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf8a0c3d3ee44b6762486e3d97d14a9236f1c8c8/Screen%20Shot%202022-05-25%20at%2017.36.02.png'},
          {id: 2, unread: false, sender: 'Oliver', time: '3:40 PM', text: 'We want to invite you', sender_avatar: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf8a0c3d3ee44b6762486e3d97d14a9236f1c8c8/Screen%20Shot%202022-05-25%20at%2017.36.02.png'}
          ]
        // await api.get(`/jobs/${job_id}/candidates?stage=${stage}`)
        //   .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
