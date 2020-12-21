<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>
<script>
import { actionAuthTypes } from '../store/modules/auth'
export default {
  name: 'PageIndex',
  mounted () {
    this.$store.dispatch(actionAuthTypes.getCurrentUser)
  }
}

</script>
