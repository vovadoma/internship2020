<template>
  <div
    class="column q-py-xl justify-center items-center content-center q-mx-xl"
  >
    <div class="text-h2 text-bold q-py-xl">Reset Password</div>
    <q-form class="wrapper" @submit.prevent.stop="onSubmit" v-if="!reset">
      <div class="forms">
        <q-item-label class="text-h6 text-weight-regular"
          >Enter your email</q-item-label
        >
        <q-input
          ref="email"
          type="email"
          square
          outlined
          standout="text-dark"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          v-model="email"
          @change="onChangeValue('email', email)"
        />
        <div class="justify-center flex q-pt-md">
          <q-btn
            no-caps
            square
            class="bg-grey-5 no-border-radius text-body1 q-py-md btn"
            type="submit"
            outline
            label="Change password"
          />
        </div>
      </div>
    </q-form>
    <div v-else class="text-h3 q-mx-xl q-px-xl">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      email: '',
      reset: false,
      message: 'Please confirm your email. Check your mail box and reset your password by link from received letter.'
    }
  },
  methods: {
    onChangeValue (type, val) {
      this.$set(this.formData, type, val)
    },

    onSubmit () {
      setTimeout(() => { // coming soon...
        this.reset = !this.reset
      }, 500)
      fetch('localhost:5000/api/reset', {
        method: 'GET'
      })
    }
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
