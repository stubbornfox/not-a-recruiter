import { defineStore } from 'pinia'
import axios from 'axios'
import router from "../router";
import { useOrganizationStore } from '../stores/organization'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),

  actions: {
    async login(credential, node) {
      node.clearErrors()

      await axios.post('auth/login', credential)
        .then((response) => {
          if (response.data.token) {
            const user = response.data
            this.user = user
            localStorage.setItem('user', JSON.stringify(user));
            router.push(this.returnUrl || '/');
          }
        })
        .catch((e) => {
          if (e.response && e.response.status == 401)
            node.setErrors(["The username or password you entered is incorrect"], {})
          else
            node.setErrors([e.message], {})
        })
    },

    logout() {
      this.user = null;
      this.returnUrl = null;
      localStorage.removeItem('user');
      router.push({name: 'Login'})
    }
  }
})
