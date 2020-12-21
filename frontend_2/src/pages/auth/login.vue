<template>
  <div class="column q-py-xl justify-center items-center">
    <div class="text-h2 text-bold q-py-xl">Log In</div>
    <q-form @submit.prevent.stop="onSubmit">
        <div>
          <q-item-label class="text-h6 text-weight-regular">Email</q-item-label>
          <q-input
            type="text"
            class="form"
            square
            outlined
            :rules="[(val) => handleValidate('email',val)]"
            v-model="email"
            @change="onChangeValue('email', email)"
          />
          <q-item-label class="text-h6 text-weight-regular">Password</q-item-label>
          <q-input
            :type="!isPwd ? 'text' : 'password'"
            class="form"
            square
            outlined
            :rules="[(val) => handleValidate('password',val)]"
            v-model="password"
            @change="onChangeValue('password', password)"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="justify-center flex btns q-pt-md">
            <q-btn
              no-caps
              square
              class="no-border-radius text-subtitle1 q-py-md q-px-lg btn q-mr-lg q-mb-lg"
              outline
              label="Lost password?"
              to="/forgot"
              :disabled='getSubmiting'
            />
            <q-btn
              no-cap.logs
              square
              class="bg-grey-5 no-border-radius text-subtitle1 q-px-xl q-py-md btn q-mb-lg"
              type="submit"
              outline
              label="Log in"
              :disabled='getSubmiting'
            />
          </div>
      </div>
    </q-form>
    <div class='q-mt-lg'>
      <q-banner v-if='getValidationsErrors' class="absolute-bottom text-white bg-red">
          <div class='text-center' v-for='error of errorsValid' :key='error'>{{'Error: ' + error}}</div>
      </q-banner>
      <q-banner v-else-if='getAuthError' class="absolute-bottom text-white bg-red">
        <div class='text-center'> {{getAuthError}}</div>
      </q-banner>
    </div>
  </div>
</template>

<script>
import { actionAuthTypes } from '../../store/modules/auth'
export default {
  data () {
    return {
      formData: {},
      isPwd: true,
      email: '',
      password: ''
    }
  },
  computed: {
    getValidationsErrors () {
      return this.$store.getters.getValidationsErrors
    },
    getAuthError () {
      return this.$store.getters.getAuthError
    },
    errorsValid () {
      return this.getValidationsErrors.map(el => el.msg)
    },
    getSubmiting () {
      return this.$store.getters.getSubmiting
    }
  },
  methods: {
    onChangeValue (type, val) {
      this.$set(this.formData, type, val)
    },
    handleValidate (type, val) {
      const isMatchEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (val) {
        if (type === 'email') {
          if (val.match(isMatchEmail)) { return true } else {
            return 'Invalid email'
          }
        } else if (type === 'password') {
          if (val.length >= 6) { return true } else {
            return 'The password has to be minimum 6 characters'
          }
        }
      } else {
        return 'Please type something'
      }
    },

    onSubmit () {
      this.$store.dispatch(actionAuthTypes.login, this.formData).then(token => {
        this.$router.push({ name: 'profile', params: { id: this.$store.state.auth.currentUser.id } })
      })
    }
  },
  mounted () {
    this.$store.dispatch(actionAuthTypes.logout)
  }
}

</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

@media screen and (max-width: 500px) {
  .btns {
    flex-direction: column-reverse;
  }
  .btn {
    width: 100%;
  }
}
</style>
