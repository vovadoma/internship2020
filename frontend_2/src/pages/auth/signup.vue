<template>
  <div
    class="column q-py-xl justify-center items-center content-center q-mx-xl"
  >

    <div class="text-h2 text-bold q-py-xl">Sign Up</div>

    <q-form class="wrapper" @submit.prevent.stop="onSubmit">
      <div class="forms q-col-gutter-x-xl">
        <div v-for="(form, index) in forms" :key="index" class="col">
          <q-item-label class="text-h6 text-weight-regular">{{ form.title }}</q-item-label>
          <q-input
            v-if="form.type !== 'password'"
            :ref="form.name"
            :type="form.type"
            :rules="[(val) => handleValidate(form.name,val)]"
            class="form"
            square
            outlined
            standout="text-dark"
            v-model="form.val"
            @change="onChangeValue(form.name, form.val)"
          />
          <q-input
            v-else
            :ref="form.name"
            :type="form.pwd ? 'password' : 'text'"
            :rules="[(val) => handleValidate(form.name,val)]"
            class="form q-mb-md"
            square
            outlined
            standout="text-dark"
            v-model="form.val"
            @change="onChangeValue(form.name, form.val)"
          >
            <template v-slot:append>
              <q-icon
                :name="form.pwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="form.pwd = !form.pwd"
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
          label="Sign up"
          :disabled='getSubmiting'
        >
        </q-btn>

      </div>
    </q-form>
    <div class='q-mt-lg'>
      <q-banner v-if='getCreatedUser' inline-actions class="absolute-bottom text-white bg-green text-center">
        <div class='text-h6'>User created!</div>
      </q-banner>
      <q-banner v-else-if='getValidationsErrors' inline-actions  class="absolute-bottom text-white bg-red text-center" >
        <div v-for='error of errorsValid' :key='error'>{{'Error: ' + error}}</div>
      </q-banner>
      <q-banner v-else-if='getAuthError' inline-actions class="absolute-bottom text-white bg-red text-center">
        <div class='text-h6'>{{getAuthError}}</div>
      </q-banner>
    </div>

  </div>
</template>

<script>
import { actionAuthTypes, mutationTypes } from '../../store/modules/auth'

export default {
  data () {
    return {
      forms: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'text',
          pwd: false,
          val: ''
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'text',
          pwd: false,
          val: ''
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'phone',
          pwd: false,
          val: ''
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email',
          pwd: false,
          val: ''
        },
        {
          name: 'password',
          title: 'Password',
          type: 'password',
          pwd: true,
          val: ''
        },
        {
          name: 'repeatPassword',
          title: 'Repeat Password',
          type: 'password',
          pwd: true,
          val: ''
        }
      ],
      formData: {},
      errors: {}
    }
  },
  computed: {
    getSubmiting () {
      return this.$store.getters.getSubmiting
    },
    getValidationsErrors () {
      return this.$store.getters.getValidationsErrors
    },
    getAuthError () {
      return this.$store.getters.getAuthError
    },
    getCreatedUser () {
      return this.$store.getters.getCreatedUser
    },
    errorsValid () {
      return this.getValidationsErrors.map(el => el.msg)
    }
  },

  methods: {
    onChangeValue (name, value) {
      this.$set(this.formData, name, value)
    },

    handleValidate (name, val) {
      const isMatchEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (val) {
        if (name === 'email') {
          if (val.match(isMatchEmail)) { return true } else {
            return 'Invalid email'
          }
        } else if (name === 'password') {
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
      this.$store.dispatch(actionAuthTypes.register, this.formData).then(token => {
        this.$router.push({ name: 'profile', params: { id: this.$store.state.auth.currentUser.id } })
      })
    }
  },
  mounted () {
    this.$store.commit(mutationTypes.clearState)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 966px;
  width: 100%;
}
.forms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-content: center;
  justify-content: center;
  grid-auto-columns: flex;
  grid-auto-rows: flex;
  grid-auto-flow: column;
}

.btn {
  width: 25%;
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
