<template>
  <div
    class="column q-py-xl justify-center items-center content-center q-mx-xl"
  >
    <div class="text-h2 text-bold q-py-xl">Reset password</div>
        <template class="wrapper" v-if='getIsResetMessage'>
          <div class='text-h5 text-weight-bold'>{{getIsResetMessage}}</div>
        </template>
    <q-form class="wrapper" @submit.prevent.stop="onSubmit" v-else>
      <div class="forms q-col-gutter-x-xl">

        <div class="col">
          <q-item-label class="text-h6 text-weight-regular">Email</q-item-label>
          <q-input
            ref="email"
            type="text"
            class="form"
            square
            outlined
            standout="text-dark"
            :rules="[(val) => handleValidate('email',val)]"
            v-model="email"
            @change="onChangeValue('email', email)"
          />
            <q-btn
              no-cap.logs
              square
              class="bg-grey-5 no-border-radius text-subtitle1 q-px-xl q-py-md btn "
              type="submit"
              outline
              label="Reset password"
              :disabled='getSubmiting'
            />
            <q-banner v-if='getValidationsErrors' inline-actions  class="fixed-bottom text-white bg-red">
                <div class='text-center' v-for='error of errorsValid' :key='error'>{{'Error: ' + error}}</div>
            </q-banner>
            <q-banner v-if='getAuthError' inline-actions  class="fixed-bottom text-white bg-red">
                <div class='text-center'>{{'Error: ' + getAuthError}}</div>
            </q-banner>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { actionAuthTypes, mutationTypes } from '../../store/modules/auth'
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
    },
    getIsResetMessage () {
      return this.$store.getters.getIsResetMessage
    }
  },
  methods: {
    onChangeValue (type, val) {
      this.$set(this.formData, type, val)
    },
    handleValidate (type, val) {
      const isMatchEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (val.match(isMatchEmail)) { return true } else {
        return 'Invalid email'
      }
    },
    onSubmit () {
      this.$store.dispatch(actionAuthTypes.forgotPassword, this.email)
    }
  },
  mounted () {
    this.$store.commit(mutationTypes.clearState)
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 368px;
  width: 100%;
}
.btn {
  width: 80%;
}
@media screen and (max-width: 500px) {
  .forms {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-auto-flow: unset;
  }
  .btn {
    width: 100%;
  }
}

</style>
