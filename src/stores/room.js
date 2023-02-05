import { defineStore } from 'pinia'
import api from '../services/api';

export const useRoomStore = defineStore({
  id: 'rooms',
  state: () => ({
    newRoom: null,
    rooms: [],
    chatMates: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchRooms() {
      this.loading = true
      try {
        this.rooms = await api.get('rooms')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchChatMates() {
      this.loading = true
      try {
        this.chatMates = await api.get('rooms/participants')
          .then((response) => response.data)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async createRoom(participant_id) {
      this.loading = true
      try {
        await api.post('rooms', { user_id: participant_id })
          .then((response) => {
            this.newRoom = response.data
            const rooms = this.rooms.filter(room => room.roomId !== this.newRoom.roomId);
            this.rooms = [this.newRoom, ...rooms]
          })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
