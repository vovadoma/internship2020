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

    [mutationTypes.getCurrentUserStart] (state, payload) {
      state.currentUser = null
      state.isLoggedIn = false
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
    async [actionAuthTypes.register] ({ commit }, formData) {
      commit(mutationTypes.registerStart)
      const response = await authApi.registerUser(formData)
      if (response.data.token) {
        const codeUser = response.data.token.split('.')
        localStorage.setItem('jwtToken', response.data.token)
        commit(mutationTypes.registerSuccess, codeUser)
        return response.data.token
      } else if (response.data.data) {
        commit(mutationTypes.validationsErrors, response.data.data)
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
    },
    // [actionAuthTypes.register] ({ commit }, formData) {
    //   return new Promise((resolve, reject) => {
    //     commit(mutationTypes.registerStart)
    //     authApi
    //       .registerUser(formData)
    //       .then(response => {
    //         console.log(response)
    //         if (response.data.token) {
    //           const codeUser = response.data.token.split('.')
    //           localStorage.setItem('jwtToken', response.data.token)
    //           commit(mutationTypes.registerSuccess, codeUser)
    //           resolve(response.data.token)
    //         } else if (response.data.data) {
    //           commit(mutationTypes.validationsErrors, response.data.data)
    //         } else {
    //           commit(mutationTypes.authError, response.data.error)
    //         }
    //       })
    //       .catch(error => {
    //         commit(mutationTypes.authError, error)
    //       })
    //   })
    // },

    async [actionAuthTypes.login] ({ commit }, formData) {
      commit(mutationTypes.loginStart)
      const response = await authApi.loginUser(formData.email, formData.password)
      if (response.data.token) {
        const codeUser = response.data.token.split('.')
        localStorage.setItem('jwtToken', response.data.token)
        commit(mutationTypes.loginSuccess, codeUser)
        return response.data.token
      } else if (response.data.data) {
        commit(mutationTypes.validationsErrors, response.data.data)
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
    },

    // [actionAuthTypes.login] ({ commit }, formData) {
    //   return new Promise((resolve, reject) => {
    //     commit(mutationTypes.loginStart)
    //     authApi
    //       .loginUser(formData.email, formData.password)
    //       .then(response => {
    //         if (response.data.token) {
    //           const codeUser = response.data.token.split('.')
    //           localStorage.setItem('jwtToken', response.data.token)
    //           commit(mutationTypes.loginSuccess, codeUser)
    //           resolve(response.data.token)
    //         } else if (response.data.data) {
    //           commit(mutationTypes.validationsErrors, response.data.data)
    //         } else {
    //           commit(mutationTypes.authError, response.data.error)
    //         }
    //       })
    //       .catch(error => {
    //         commit(mutationTypes.authError, error)
    //       })
    //   })
    // },

    async [actionAuthTypes.getCurrentUser] ({ commit }) {
      commit(mutationTypes.getCurrentUserStart)
      const response = await authApi.getCurrentUser()
      if (response.data.user) {
        commit(mutationTypes.getCurrentUserSuccess, response.data.user)
        return response.data.user
      } else if (response.data.data) {
        commit(mutationTypes.validationsErrors, response.data.data)
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
    },

    [actionAuthTypes.logout] ({ commit }) {
      localStorage.removeItem('jwtToken')
      commit(mutationTypes.clearState)
    },

    async [actionAuthTypes.forgotPassword] ({ commit }, email) {
      commit(mutationTypes.forgotPasswordStart)
      const response = await authApi.forgotPassword(email)
      if (response.data.message) {
        commit(mutationTypes.forgotPasswordSucces, response.data.message)
        return response.data.message
      } else if (response.data.data) {
        commit(mutationTypes.validationsErrors, response.data.data)
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
    },

    async [actionAuthTypes.getResetPassword] ({ commit }, resetToken) {
      commit(mutationTypes.getResetPasswordStart)
      const response = await authApi.getResetPassword(resetToken)
      if (response.data.userId) {
        commit(mutationTypes.getResetPasswordSucces, response.data.userId._id)
        return response.data.userId._id
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
    },

    async [actionAuthTypes.resetPassword] ({ commit }, formData) {
      commit(mutationTypes.resetPasswordStart)
      const response = await authApi.resetPassword(formData.password, formData.repeatPassword, formData.userId)
      if (response.data.message) {
        commit(mutationTypes.resetPasswordSucces, response.data.message)
        return response.data.message
      } else if (response.data.data) {
        commit(mutationTypes.validationsErrors, response.data.data)
      } else {
        commit(mutationTypes.authError, response.data.error)
      }
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
    },
    getCurrentUser (state) {
      return state.currentUser
    }
  }
}
