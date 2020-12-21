import profileApi from '../../../api/profile'

export const mutationTypes = {
  clearState: '[profile] clearState',
  editProfileError: '[profile] editProfileError',
  authProfileError: '[profile] authProfileError',

  getUserProfileStart: '[profile] getUserProfileStart',
  getUserProfileSuccess: '[profile] getUserProfileSuccess',

  getSettingProfileUserStart: '[profile] getSettingProfileUserStart',
  getSettingProfileUserSuccess: '[profile] getSettingProfileUserSuccess',
  editUserData: '[profile] editUserData',

  putEditProfileUserStart: '[profile] putEditProfileUserStart',
  putEditProfileUserSuccess: '[profile] putEditProfileUserSuccess',
  putEditProfileUserValid: '[profile] putEditProfileUserValid'

}

export const actionProfileTypes = {
  getUserProfile: '[profile] getUserProfile',
  getSettingProfileUser: '[profile] getSettingProfileUser',
  putEditProfileUser: '[profile] putEditProfileUser'
}
export default {
  state: {
    userData: {},
    userPofileError: null,
    userValidEditErrors: null,
    userEditSucces: null,
    authProfileError: false,
    editData: {}
  },

  mutations: {
    [mutationTypes.clearState] (state) {
      state.userData = {}
      state.editUserData = {}
      state.userPofileError = null
      state.userValidEditErrors = null
      state.userEditSucces = null
      state.authProfileError = false
    },

    [mutationTypes.getUserProfileStart] (state) {
      state.userPofileError = null
      state.authProfileError = false
    },
    [mutationTypes.getUserProfileSuccess] (state, payload) {
      state.userData = payload
      state.editData = payload
    },

    [mutationTypes.getSettingProfileUserStart] (state) {
      state.userData = {}
    },
    [mutationTypes.getSettingProfileUserSuccess] (state, payload) {
      state.userData = payload
    },

    [mutationTypes.putEditProfileUserStart] (state, payload) {
      state.userEditSucces = false
    },
    [mutationTypes.putEditProfileUserSuccess] (state, payload) {
      state.userEditSucces = true
      state.userData = payload
    },
    [mutationTypes.putEditProfileUserValid] (state, payload) {
      state.userValidEditErrors = payload.map(el => el.msg)
    },

    [mutationTypes.editProfileError] (state, payload) {
      state.userPofileError = payload
    },

    [mutationTypes.authProfileError] (state, payload) {
      state.authProfileError = payload
    },
    [mutationTypes.editUserData] (state, payload) {
      state.editData[payload.type] = payload.val
    }
  },

  actions: {
    async [actionProfileTypes.getUserProfile] ({ commit }, id) {
      commit(mutationTypes.getUserProfileStart)
      const response = await profileApi.getProfileUser(id)
      if (response.data.error) {
        commit(mutationTypes.authProfileError, response.data.error)
        return response.data.error
      } else {
        commit(mutationTypes.getUserProfileSuccess, response.data)
        return response.data
      }
    },

    async [actionProfileTypes.getSettingProfileUser] ({ commit }, id) {
      commit(mutationTypes.getSettingProfileUserStart)
      const response = await profileApi.getSettingProfileUser(id)
      if (response.data.error) {
        commit(mutationTypes.authProfileError, response.data.error)
        return response.data.error
      } else {
        commit(mutationTypes.getUserProfileSuccess, response.data)
        return response.data
      }
    },

    async [actionProfileTypes.putEditProfileUser] ({ commit }, payload) {
      const formData = new FormData()
      if (payload.avatar) {
        formData.append('avatar', payload.avatar[0])
        formData.append('firstName', payload.firstName)
        formData.append('lastName', payload.lastName)
        formData.append('email', payload.email)
        formData.append('phone', payload.phone)
        formData.append('timeZone', payload.timeZone)
      } else {
        formData.append('avatar', '')
        formData.append('firstName', payload.firstName)
        formData.append('lastName', payload.lastName)
        formData.append('email', payload.email)
        formData.append('phone', payload.phone)
        formData.append('timeZone', payload.timeZone)
      }

      commit(mutationTypes.putEditProfileUserStart)
      const response = await profileApi.editProfileUser(formData)
      if (response.data.error) {
        commit(mutationTypes.editProfileError, response.data.error)
        return response.data.error
      } else if (response.data.data) {
        commit(mutationTypes.putEditProfileUserValid, response.data.data)
        return response.data.data
      } else if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token)
        const codeUser = response.data.token.split('.')
        commit(mutationTypes.putEditProfileUserSuccess, codeUser)
        return codeUser
      }
    }

  },

  getters: {
    getUserData (state) {
      return state.userData
    },
    getEditProfileError (state) {
      return state.userPofileError
    },
    getUserEditSucces (state) {
      return state.userEditSucces
    },
    getUserValidEditErrors (state) {
      return state.userValidEditErrors
    },
    getAuthProfileError (state) {
      return state.authProfileError
    },
    getEditData (state) {
      return state.editData
    }

  }
}
