<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar class='bg-dark'>
        <q-toolbar-title>
          LOGO
        </q-toolbar-title>
        <q-item>
          <q-btn class="q-mr-sm bg-white text-dark no-border-radius" to="/register" label="Sign Up" />
          <q-btn to="/login" class='bg-white text-dark no-border-radius' label="Log in" />
        </q-item>
          <q-item v-if='getLoggedIn'>
          <q-btn class='bg-white text-dark no-border-radius' label="Log out" />
        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  computed: {
    getLoggedIn () {
      return this.$store.getters.getLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
