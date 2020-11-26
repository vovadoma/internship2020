<template>
  <q-page class=" row justify-center items-center text-center">
    <div class="column">
      <div class="row">
        <q-card flat>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input  v-model="email" type="email" label="E-mail" :rules="[val => !!val || 'Email is missing', isValidEmail]"/>
              <q-input v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length > 0 || 'Please enter your email']">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md row justify-center items-center text-center">
            <q-btn color="white" text-color="black" v-model="text" label="Lost Password?" />
            <q-btn @click="checkForm" color="white" text-color="black"  label="Login" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      text: '',
      isPwd: true,
      regEmail: ''
    }
  },
  mounted () {
    console.log(this.user)
    console.log(process.env.SERVER_URL)
  },
  methods: {
    checkForm () {
      // axios({
      //   url: 'localhost',
      //   method: 'POST'
      // }).then((res)=>{})
      const profile = {}
      this.$store.dispatch('setUserProfile', profile)
    },
    isValidEmail () {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(this.regEmail) || 'Invalid email'
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

.q-card {
  width: 360px;
}
</style>
