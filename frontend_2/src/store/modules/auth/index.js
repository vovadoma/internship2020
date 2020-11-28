import authApi from '../../../api/auth'

export const mutationTypes = {
  clearState: '[auth] clearState',
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  authError: '[auth] authError',
  validationsErrors: '[auth] validationsErrors'
}
export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
}
export default {
  state: {
    token: '',
    isSubmitting: false,
    isLoggedIn: false,
    isCreatedUser: false,
    authError: null,
    validationsErrors: null
  },

  mutations: {
    [mutationTypes.clearState] (state) {
      state.token = ''
      state.isSubmitting = false
      state.isLoggedIn = false
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
      state.token = payload
      state.isCreatedUser = true
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
    }
  },

  actions: {
    [actionTypes.register] ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.registerStart)
        authApi
          .registerUser(formData)
          .then(response => {
            if (response.data.token) {
              commit(mutationTypes.registerSuccess, response.data.token)
              localStorage.setItem('jwtToken', response.data.token)
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
    [actionTypes.login] ({ commit }, formData) {
      return new Promise((resolve, reject) => {
        authApi
          .loginUser(formData.email, formData.password)
          .then(response => {
            if (response.data.token) {
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
    }
  }
}
