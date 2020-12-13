import profileApi from '../../../api/profile'

export const mutationTypes = {
  clearState: '[profile] clearState',

  getUserProfileStart: '[profile] getUserProfileStart',
  getUserProfileSuccess: '[profile] getUserProfileSuccess',
  getUserProfileError: '[profile] getUserProfileError',

  getSettingProfileUserStart: '[profile] getSettingProfileUserStart',
  getSettingProfileUserSuccess: '[profile] getSettingProfileUserSuccess',
  getSettingProfileUserError: '[profile] getSettingProfileUserError'
}
export const actionProfileTypes = {
  getUserProfile: '[profile] getUserProfile',
  getSettingProfileUser: '[profile] getSettingProfileUser'

}
export default {
  state: {
    userData: null,
    userPofileError: null
  },

  mutations: {

    [mutationTypes.getUserProfileStart] (state) {
      state.userData = null
      state.userPofileError = null
    },
    [mutationTypes.getUserProfileSuccess] (state, payload) {
      state.userData = payload
    },
    [mutationTypes.getUserProfileError] (state, payload) {
      state.userPofileError = payload
    },

    [mutationTypes.getSettingProfileUserStart] (state) {
      state.userData = null
    },
    [mutationTypes.getSettingProfileUserSuccess] (state, payload) {
      state.userData = payload
    },
    [mutationTypes.getSettingProfileUserError] (state, payload) {
      state.userPofileError = payload
    }
  },

  actions: {
    [actionProfileTypes.getUserProfile] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.getUserProfileStart)
        profileApi
          .getProfileUser(id)
          .then(response => {
            if (response.data.error) {
              commit(mutationTypes.getUserProfileError, response.data.error)
              reject(response.data.error)
            } else {
              commit(mutationTypes.getUserProfileSuccess, response.data)
              resolve(response.data)
            }
          })
          .catch(error => {
            commit(mutationTypes.getUserProfileError, error)
            reject(error)
          })
      })
    },

    [actionProfileTypes.getSettingProfileUser] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(mutationTypes.getSettingProfileUserStart)
        profileApi
          .getProfileUser(id)
          .then(response => {
            commit(mutationTypes.getUserProfileSuccess, response.data.user)
            resolve(response.data.user)
          })
          .catch(error => {
            commit(mutationTypes.getUserProfileError, error.response.data)
            reject(error)
          })
      })
    }

  },

  getters: {
    getUserData (state) {
      return state.userData
    },
    getUserProfileError (state) {
      return state.userPofileError
    }

  }
}
