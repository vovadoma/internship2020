<template>
<q-page class="flex flex-center column" v-if='getAuthProfileError'>
    <div class='text-h3' v-if='getAuthProfileError'>Profile not found</div>
    <div v-else>
      <div class='text-h3' >user is not authorized</div>
    <div>
      <q-btn to="/login" class='bg-dark text-white q-px-lg q-mt-lg text-h5' >go to Login</q-btn>
    </div>
    </div>

  </q-page>
  <q-page class="flex flex-center row justify-around" v-else-if="getUserData">
    <q-avatar color="primary" text-color="white" class='q-mx-md' size="300px"  v-if='!getUserData.avatar' >{{getUserData.firstName[0]}}</q-avatar>
        <q-avatar size="350px" v-else>
      <img :src='[`http://localhost:5000/static/${getUserData.avatar}`]'>
    </q-avatar>
    <div class='flex column'>
    <div class='text-h3'>{{getUserData.firstName}} {{getUserData.lastName}}</div>
    <div class='text-body2'>phone: {{getUserData.phone}}</div>
    <div class='text-body1'>email: {{getUserData.email}}</div>
    </div>
  </q-page>
</template>

<script>
import { actionProfileTypes } from '../../store/modules/profile'
import { actionAuthTypes } from '../../store/modules/auth/'

export default {
  name: 'PageProfile',
  computed: {
    getAuthProfileError () {
      return this.$store.getters.getAuthProfileError
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
        this.$store.dispatch(actionProfileTypes.getUserProfile, this.$route.params.id).then((data) => {
        })
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
