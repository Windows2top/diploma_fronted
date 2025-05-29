import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role
  },

  actions: {
    login(email, password) {
      return axios.get('/sanctum/csrf-cookie')
        .then(() => {
          const csrfToken = Cookies.get('XSRF-TOKEN')

          return axios.post('/login', {
            email,
            password
          }, {
            headers: {
              'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
            }
          })
        })
        .then(response => {
          this.token = response.data.token
          localStorage.setItem('sanctum_token', this.token)

          return this.fetchUser()
        })
        .catch(error => {
          console.error('Ошибка входа:', error)
          throw error
        })
    },

    fetchUser() {
      const token = localStorage.getItem('sanctum_token')
      if (!token) return Promise.resolve()

      return axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.user = response.data
          this.token = token
          localStorage.setItem('user', JSON.stringify(this.user))
        })
        .catch(error => {
          console.error('Ошибка при получении пользователя:', error)
          this.logout()
        })
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('sanctum_token')
    }
  }
})
