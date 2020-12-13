<template>
  <q-page class="flex flex-center column" v-if='getAuthError || getUserProfileError'>
    <div v-if='getUserProfileError'>Profile not found</div>
    <div v-else>
      <div class='text-h3' >user is not authorized</div>
    <div>
      <q-btn to="/login" class='bg-dark text-white q-px-lg q-mt-lg text-h5' >go to Login</q-btn>
    </div>
    </div>

  </q-page>
  <q-page class="flex flex-center column" v-else-if="getUserData">
    <div class='text-h3'>{{getUserData.firstName}} {{getUserData.lastName}}</div>
  </q-page>
</template>

<script>
import { actionProfileTypes } from '../../store/modules/profile/'
import { actionAuthTypes } from '../../store/modules/auth/'

export default {
  name: 'PageProfile',
  computed: {
    getAuthError () {
      return this.$store.getters.getAuthError
    },
    getUserData () {
      return this.$store.getters.getUserData
    },
    getUserProfileError () {
      return this.$store.getters.getUserProfileError
    }
  },
  methods: {
    fetchUserProfile () {
      this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
        this.$store.dispatch(actionProfileTypes.getUserProfile, this.$route.params.id)
      })
    }
  },
  created () {
    // загружаем данные, когда представление создано
    // и данные реактивно отслеживаются
    this.fetchUserProfile()
  },
  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: 'fetchUserProfile'
  }

}
</script>
