import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      user: null,
      token: null
    },
    mutations: {
      setUserProfile (state, profile) {
        state.user = profile
        console.log(state.user)
      },
      setUserToken (state, token) {
        state.token = token
        console.log(state.token)
      }
    },
    actions: {
      setUserProfile ({ commit }, profile) {
        commit('setUserProfile', profile)
      },
      setUserToken ({ commit }, token) {
        commit('setUserToken', token)
      }
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
