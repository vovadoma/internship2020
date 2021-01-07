<template>
  <div style="width: 100%; max-width: 400px">
    <div class='text-body1 flex-center flex'>Users online</div>

    <q-scroll-area
      style="height: 80vh; max-width: 400px;"
      class="shadow-2 rounded-borders"
    >
      <div class="q-pa-md column justify-center">
        <q-item clickable v-ripple
          v-for="(data) in users"
          :key="data.id"
        >
        <q-item-section>{{data.name}}</q-item-section>
      </q-item>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import socketio from 'socket.io-client'
import { actionAuthTypes } from '../store/modules/auth'

export default {
  name: 'User',
  data () {
    return {
      user: {
        name: '',
        room: '',
        id: ''
      },
      users: [],
      socket: socketio('localhost:5000')
    }
  },
  computed: {
    getCurrentUser () {
      return this.$store.getters.getCurrentUser
    },
    getAuthProfileError () {
      return this.$store.getters.getAuthProfileError
    }
  },
  methods: {
    initializeConnection () {
      this.socket.on('users:upgrade', users => {
        this.users = [...users]
      })
    }
  },
  created () {
    this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
      const name = data.firstName
      const room = '1'
      const id = data.id
      this.user = { name, room, id }
      this.socket.emit('joinUser', this.user)
    })
  },
  mounted () {
    this.initializeConnection()
  }
}
</script>
