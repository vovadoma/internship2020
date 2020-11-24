<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
         LOGO
        </q-toolbar-title>
        <q-item>
          <q-btn class="q-mr-sm" to="/register" color="primary" label="Sign Up" />
          <q-btn to="/" color="primary" label="Log in" />
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
  data () {
    return {
    }
  }
}
</script>
