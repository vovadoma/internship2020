import authApi from '../../../api/auth'

export const mutationTypes = {
  clearState: '[auth] clearState',

  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',

  forgotPasswordStart: '[auth] forgotPasswordStart',
  forgotPasswordSucces: '[auth] forgotPasswordSucces',

  resetPasswordStart: '[auth] resetPasswordStart',
  resetPasswordSucces: '[auth] resetPasswordSucces',

  getResetPasswordStart: '[auth] getResetPasswordStart',
  getResetPasswordSucces: '[auth] getResetPasswordSucces',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',

  authError: '[auth] authError',
  validationsErrors: '[auth] validationsErrors'

}
export const actionAuthTypes = {
  register: '[auth] register',
  login: '[auth] login',
  forgotPassword: '[auth] forgotPassword',
  resetPassword: '[auth] resetPassword',
  getResetPassword: '[auth] getResetPassword',
  getCurrentUser: '[auth] getCurrentUser',
  logout: '[auth] logout'
}
export default {
  state: {
    currentUser: null,
    isSubmitting: false,
    isLoggedIn: false,
    isForgotMessage: null,
    userId: null,
    isCreatedUser: false,
    authError: null,
    validationsErrors: null
  },

  mutations: {
    [mutationTypes.clearState] (state) {
      state.currentUser = null
      state.isSubmitting = false
      state.isLoggedIn = false
      state.isForgotMessage = null
      state.userId = null
      state.isCreatedUser = false
      state.authError = null
      state.validationsErrors = null
    },
    [mutationTypes.registerStart] (state) {
      state.isSubmitting = true
      state.validationsErrors = null
    },
    [mutationTypes.registerSuccess] (state, payload) {
      state.isSubmitting = false
      state.currentUser = JSON.parse(window.atob(payload[1]))
      state.isCreatedUser = true
      state.isLoggedIn = true
      state.authError = null
      state.validationsErrors = null
    },

    [mutationTypes.loginStart] (state) {
      state.isSubmitting = true
      state.validationsErrors = null
    },
    [mutationTypes.loginSuccess] (state, payload) {
      state.isSubmitting = false
      state.currentUser = JSON.parse(window.atob(payload[1]))
      state.isLoggedIn = true
      state.authError = null
      state.validationsErrors = null
    },

    [mutationTypes.getCurrentUserSuccess] (state, payload) {
      state.currentUser = payload
      state.isLoggedIn = true
    },

    [mutationTypes.authError] (state, payload) {
      state.isSubmitting = false
      state.validationsErrors = null
      state.authError = payload
    },
    [mutationTypes.validationsErrors] (state, payload) {
      state.isSubmitting = false
      state.authError = null
      state.validationsErrors = payload
    },

    [mutationTypes.forgotPasswordStart] (state) {
      state.isSubmitting = true
      state.validationsErrors = null
      state.authError = null
    },
    [mutationTypes.forgotPasswordSucces] (state, payload) {
      state.isForgotMessage = payload
    },

    [mutationTypes.getResetPasswordStart] (state) {
      state.validationsErrors = null
      state.authError = null
      state.isForgotMessage = null
    },
    [mutationTypes.getResetPasswordSucces] (state, payload) {
      state.userId = payload
    },

    [mutationTypes.resetPasswordStart] (state) {
      state.isSubmitting = true
      state.validationsErrors = null
      state.authError = null
      state.isForgotMessage = null
    },
    [mutationTypes.resetPasswordSucces] (state, payload) {
      state.isSubmitting = false
      state.isForgotMessage = payload
    }
  },

  actions: {
    [actionAuthTypes.register] ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.registerStart)
        authApi
          .registerUser(formData)
          .then(response => {
            if (response.data.token) {
              const codeUser = response.data.token.split('.')
              localStorage.setItem('jwtToken', response.data.token)
              commit(mutationTypes.registerSuccess, codeUser)
              resolve(response.data.token)
            } else if (response.data.errors) {
              commit(mutationTypes.validationsErrors, response.data.errors)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          })
          .catch(error => {
            commit(mutationTypes.authError, error.response.data)
          })
      })
    },

    [actionAuthTypes.login] ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.loginStart)
        authApi
          .loginUser(formData.email, formData.password)
          .then(response => {
            if (response.data.token) {
              const codeUser = response.data.token.split('.')
              localStorage.setItem('jwtToken', response.data.token)
              commit(mutationTypes.loginSuccess, codeUser)
              resolve(response.data.token)
            } else if (response.data.errors) {
              commit(mutationTypes.validationsErrors, response.data.errors)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          })
          .catch(error => {
            commit(mutationTypes.authError, error.response.data)
          })
      })
    },

    [actionAuthTypes.getCurrentUser] ({ commit }) {
      return new Promise((resolve, reject) => {
        authApi
          .getCurrentUser()
          .then(response => {
            if (response.data.user) {
              commit(mutationTypes.getCurrentUserSuccess, response.data.user)
              resolve(response.data.user)
            } else if (response.data.errors) {
              commit(mutationTypes.validationsErrors, response.data.errors)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          })
          .catch(error => {
            commit(mutationTypes.authError, error)
            reject(error)
          })
      })
    },

    [actionAuthTypes.logout] ({ commit }) {
      localStorage.removeItem('jwtToken')
      commit(mutationTypes.clearState)
    },

    [actionAuthTypes.forgotPassword] ({ commit }, email) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.forgotPasswordStart)
        authApi
          .forgotPassword(email)
          .then((response) => {
            if (response.data.message) {
              commit(mutationTypes.forgotPasswordSucces, response.data.message)
              resolve(response.data.message)
            } else if (response.data.errors) {
              commit(mutationTypes.validationsErrors, response.data.errors)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          }).catch(error => {
            commit(mutationTypes.authError, error.response.data)
          })
      })
    },

    [actionAuthTypes.getResetPassword] ({ commit }, resetToken) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.getResetPasswordStart)
        authApi
          .getResetPassword(resetToken)
          .then((response) => {
            if (response.data.userId) {
              commit(mutationTypes.getResetPasswordSucces, response.data.userId._id)
              resolve(response.data.userId._id)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          }).catch(error => {
            commit(mutationTypes.authError, error.response.data)
          })
      })
    },

    [actionAuthTypes.resetPassword] ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.resetPasswordStart)
        authApi
          .resetPassword(formData.password, formData.repeatPassword, formData.userId)
          .then((response) => {
            if (response.data.message) {
              commit(mutationTypes.resetPasswordSucces, response.data.message)
              resolve(response.data.message)
            } else if (response.data.errors) {
              commit(mutationTypes.validationsErrors, response.data.errors)
            } else {
              commit(mutationTypes.authError, response.data.error)
            }
          }).catch(error => {
            commit(mutationTypes.authError, error.response.data)
          })
      })
    }
  },

  getters: {
    getSubmiting (state) {
      return state.isSubmitting
    },
    getAuthError (state) {
      return state.authError
    },
    getValidationsErrors (state) {
      return state.validationsErrors
    },
    getCreatedUser (state) {
      return state.isCreatedUser
    },
    getIsResetMessage (state) {
      return state.isForgotMessage
    },
    getUserId (state) {
      return state.userId
    }
  }
}
