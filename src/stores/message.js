import { defineStore } from 'pinia'
import api from '../services/api'

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    newMessageId: null,
    messages: [],
    loading: false,
    error: null,
    messagesLoaded: null
  }),
  actions: {
    async fetchMessages(roomId) {
      this.messagesLoaded = false
      try {
        this.messages = await api.get(`/rooms/${roomId}/messages`).then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.messagesLoaded = true
      }
    },

    async createMessage(roomId, data) {
      this.loading = true
      const body = new FormData()
      body.append('message[user_id]', data.user_id)
      body.append('message[content]', data.content)

      if (data.files) {
        data.files.forEach((fileItem, index) => {
          body.append('message[files][index]', fileItem.file)
        })
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }

      try {
        await api.post(`/rooms/${roomId}/messages`, body, config)
          .then((response) => {
            const message = response.data
            this.newMessageId = message._id
            this.messages.push(message)
          })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async uploadFile(roomId, messageId, file) {
      this.loading = true
      try {
        const body = new FormData()
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        body.append('file', file)
        await api.post(`/rooms/${roomId}/messages/${messageId}/upload_file`, body, config)
          .then((response) => {})
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
