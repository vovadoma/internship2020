<template>
  <div class="column q-py-xl justify-center items-center content-center q-mx-xl">
      <template v-if='!formData.userId'>
        <Error404 />
      </template>
    <div class="text-h2 text-bold q-py-xl" v-else>Reset Password</div>
    <q-form class="wrapper" @submit.prevent.stop="onSubmit" >
      <div class="forms q-col-gutter-x-xl">
        <div class="col">
          <q-item-label class="text-h6 text-weight-regular">Password</q-item-label>
          <q-input
            :type="pwd_password ? 'password' : 'text'"
            :rules="[(val) => handleValidate('password',val)]"
            class="form"
            square
            outlined
            standout="text-dark"
            v-model="formData.password"
          >
          <div>{{userId}}</div>
          <template v-slot:append>
              <q-icon
                :name="pwd_password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="pwd_password = !pwd_password"
              />
            </template>
          </q-input>

          <q-item-label class="text-h6 text-weight-regular">Confirm password</q-item-label>
          <q-input
            :type="pwd_repeatPassword ? 'password' : 'text'"
            :rules="[(val) => handleValidate('repeatPassword',val)]"
            class="form q-mb-md"
            square
            outlined
            standout="text-dark"
            v-model="formData.repeatPassword"
          >
            <template v-slot:append>
              <q-icon
                :name="pwd_repeatPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="pwd_repeatPassword = !pwd_repeatPassword"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="justify-center flex">
        <q-btn
          no-caps
          square
          class="bg-grey-5 no-border-radius text-subtitle1 q-px-xl q-py-md btn"
          type="submit"
          outline
          label="Reset password"
          :disabled='getSubmiting'
        >
        </q-btn>
            <q-banner v-if='getValidationsErrors' inline-actions  class="fixed-bottom text-white bg-red">
                <div class='text-center' v-for='error of errorsValid' :key='error'>{{'Error: ' + error}}</div>
            </q-banner>
            <q-banner v-if='getAuthError' inline-actions  class="fixed-bottom text-white bg-red">
                <div class='text-center'>{{'Error: ' + getAuthError}}</div>
            </q-banner>
      </div>
    </q-form>

  </div>
</template>

<script>
import { actionAuthTypes } from '../../store/modules/auth'
import Error404 from '../Error404'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      pwd_password: true,
      pwd_repeatPassword: true,
      formData: {
        password: '',
        repeatPassword: '',
        userId: null
      }
    }
  },
  components: {
    Error404: Error404
  },
  computed: {
    getSubmiting () {
      return this.$store.getters.getSubmiting
    },
    getAuthError () {
      return this.$store.getters.getAuthError
    },
    getValidationsErrors () {
      return this.$store.getters.getValidationsErrors
    },
    errorsValid () {
      return this.getValidationsErrors.map(el => el.msg)
    },
    ...mapState({
      userId: (state) => state.userId
    })
  },

  methods: {
    handleValidate (name, val) {
      if (val) {
        if (name === 'password') {
          if (val.length >= 6) { return true } else {
            return 'The password has to be minimum 6 characters'
          }
        } else if (name === 'repeatPassword') {
          if (val === this.formData.password) { return true } else {
            return 'Passwords do not match'
          }
        }
      } else {
        return 'Please type something'
      }
    },

    onSubmit () {
      this.$store.dispatch(actionAuthTypes.resetPassword, this.formData)
      setTimeout(() => {
        this.$router.push({ name: 'login' })
        this.$store.dispatch(actionAuthTypes.clearState)
      }, 500)
    }
  },
  mounted () {
    this.$store.dispatch(actionAuthTypes.getResetPassword, this.$route.params.token).then(id => {
      this.formData.userId = id
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 768px;
}
.forms {
  display: flex;
  align-content: center;
  justify-content: center;
}

@media screen and (max-width: 500px) {

}
</style>
