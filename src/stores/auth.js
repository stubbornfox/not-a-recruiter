import { defineStore } from 'pinia'
import axios from 'axios'
import router from "../router";
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: '/'
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
            if (user.organization === undefined) {
              router.push({ name: "NewOrganization" })
            } else {
              router.push(this.returnUrl);
            }
          }
        })
        .catch((e) => {
          if (e.response && e.response.status == 401)
            node.setErrors(["The username or password you entered is incorrect"], {})
          else
            node.setErrors([e.message], {})
        })
    },

    async loginWithGoogle(userInfo) {
      try {
        await axios.post('/auth/google', userInfo)
          .then((response) => {
            if (response.data.token) {
              const user = response.data
              this.user = user
              localStorage.setItem('user', JSON.stringify(user));
              if (user.organization === undefined) {
                router.push({ name: "NewOrganization" })
              } else {
                router.push(this.returnUrl);
              }
            }
          })
      } catch (error) {
        console.log(error)
      }
    },

    async setPassword(data, node) {
      try {
        node.clearErrors()
        await axios.post('/auth/reset_password/', data)
          .then((response) => {
            if (response.data.token) {
              const user = response.data
              this.user = user
              localStorage.setItem('user', JSON.stringify(user));
              router.push(this.returnUrl);
            }
          })
      } catch (error) {
        node.setErrors([error.response.data], {})
      }
    },

    async forgetPassword(data, node) {
      try {
        node.clearErrors()
        const toast = useToast()
        await axios.post('/auth/forget_password/', data)
          .then((response) => {
            toast.success("We sent you a password reset link!")
          })
      } catch (error) {
        node.setErrors([error.response.data], {})
      }
    },

    logout() {
      this.user = null;
      this.returnUrl = '/';
      localStorage.removeItem('user');
      router.push({ name: 'Login' })
    }
  }
})
