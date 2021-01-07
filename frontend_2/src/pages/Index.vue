<template>
  <q-page class="flex justify-center q-pt-md">
    <Chat />
    <Users />
  </q-page>
</template>
<script>
// import { actionAuthTypes } from '../store/modules/auth'
import Chat from '../components/chat'
import Users from '../components/users'
import socketio from 'socket.io-client'

export default {
  name: 'PageIndex',
  data () {
    return {
      socket: socketio('localhost:5000'),
      users: []

    }
  },
  mounted () {
    // this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
    //   const name = data.firstName
    //   const room = '1'
    //   const id = data.id
    //   this.user = { name, room, id }
    //   this.socket.emit('join', this.user)
    // })
  },
  components: {
    Chat,
    Users
  }
}
</script>
