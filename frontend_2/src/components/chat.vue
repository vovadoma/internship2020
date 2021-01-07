<template>
  <div style="width: 100%; max-width: 400px;" class='q-pr-md'>
    <div class='text-body1 flex-center flex'>Chat</div>
    <q-scroll-area
      style="height: 80vh; max-width: 400px;"
      class="shadow-2 rounded-borders"
    >
      <div
        class="q-px-md column justify-center"
        v-for="(data, index) in messages"
        :key="index"
      >
      <q-chat-message v-if='data.name === "Admin"'
       :name="data.name"
      :text="[data.message]"
      />
        <q-chat-message
        v-else
          :name="data.name"
          :text="[data.message]"
          :sent="getCurrentUser.id == data.id ? true : false"
          :bg-color="getCurrentUser.id == data.id ? 'amber-7' : 'primary'"
          :text-color="getCurrentUser.id == data.id ? 'dark' : 'white'"
          :class="data.name === 'Admin' ? 'text-weight-thin' : ''"
        />
      </div>
    </q-scroll-area>
    <div v-if="getCurrentUser">
      <q-input
        placeholder="Your message"
        v-model.trim="message"
        @keydown.enter="sendMessage"
        autofocus
      />
      <q-btn @click="sendMessage" :disabled="!message">Sent</q-btn>
    </div>

  </div>
</template>

<script>
import socketio from 'socket.io-client'
import { actionAuthTypes } from '../store/modules/auth'

export default {
  name: 'Chat',
  data () {
    return {
      message: '',
      messages: [],
      user: {
        name: '',
        room: '',
        id: ''
      },
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
    // отправка сообщения
    sendMessage () {
      const message = {
        message: this.message,
        name: this.user.name,
        id: this.user.id
      }
      this.socket.emit('message:create', message, err => {
        if (err) {
          console.error(err)
        } else {
          this.message = ''
        }
      })
    },
    initializeConnection () {
      this.socket.on('message:new', dataMessage => {
        this.messages.push(dataMessage)
      })
    }
  },
  created () {
    this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
      const name = data.firstName
      const room = '1'
      const id = data.id
      this.user = { name, room, id }
      this.socket.emit('joinChat', this.user)
    })
  },

  mounted () {
    this.initializeConnection()
  }
}
</script>
