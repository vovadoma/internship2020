<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>

      <q-toolbar class='bg-dark'>

        <q-toolbar-title >
          <router-link :to="{name: 'home'}" class="text-white">
            interShip
          </router-link>
        </q-toolbar-title>

        <q-item v-if='!isLoggedIn'>
          <q-btn class="q-mr-sm bg-white text-dark no-border-radius" to="/register" label="Sign Up" />
          <q-btn to="/login" class='bg-white text-dark no-border-radius' label="Log in" />
        </q-item>
      <template v-if='isLoggedIn'>

        <q-btn>
        <q-avatar color="primary" text-color="white" class='q-mx-md'>{{currentUser.firstName[0]}}</q-avatar>
          <q-menu anchor="bottom middle" self="top middle" label='log'>
            <q-item clickable :to="{name: 'profile', params: {id: currentUser.id}}" class='text-dark'>
              <q-item-section>
                Profile
              </q-item-section>
            </q-item>
              <q-item clickable :to="{name: 'setting', params: {id: currentUser.id}}" class='text-dark'>
              <q-item-section>
                  Settings
              </q-item-section>
            </q-item>
            <q-item clickable @click="logout">
              <q-item-section >
                  Logout
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>

      </template>

      </q-toolbar>

    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { actionAuthTypes } from '../store/modules/auth'

import { mapState } from 'vuex'
export default {
  name: 'MainLayout',
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      currentUser: state => state.auth.currentUser
    })
  },
  methods: {
    logout () {
      this.$store.dispatch(actionAuthTypes.logout)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang='scss'>
  a {
    text-decoration: none;
  }
</style>
