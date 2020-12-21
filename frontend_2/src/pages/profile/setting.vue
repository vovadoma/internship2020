<template>
  <q-page class="flex flex-center column justify-center items-center" v-if='getAuthError'>
      <div class='text-h3' >user is not authorized</div>
      <q-btn to="/login" class='bg-dark text-white q-px-lg q-mt-lg text-h5' >go to Login</q-btn>
  </q-page>

  <q-page class="q-pt-xl" v-else>
    <q-form @submit.prevent.stop="onSubmit">
    <div class='flex wrapper flex-center'>
      <div class='flex-center'>
    <q-avatar color="primary" text-color="white" class='q-mx-md' size="200px"  v-if='!getUserData.avatar' >{{getCurrentUser.firstName[0]}}</q-avatar>
        <q-avatar size="200px" v-else>
      <img :src='[`http://localhost:5000/static/${getCurrentUser.avatar}`]'>
    </q-avatar>
        <div class='flex column'>
          <q-input
          name='avatar'
          type='file'
          @change="(event) => onChangeValue('avatar',event.target.files)"
          />
          <q-btn  label='canel' @click="delAvatar" class="bg-primary text-subtitle1"/>
        </div>
      </div>

      <div class='flex-center'>
        <div class='flex flex-center q-mb-lg' style='overflow: hidden;'>
            <q-item-label class="text-h6 text-weight-regular q-pr-lg">First name</q-item-label>
            <q-input
            :input-style="{width:'270px'}"
            type="text"
            outlined
            :value='getEditData.firstName'
            @change="(event) => onChangeValue('firstName', event.target.value)"
            :rules="[val => handleValidate(null,val)]"
            no-error-icon
          />
        </div>
        <div class='flex flex-center'>
          <q-item-label class="text-h6 text-weight-regular q-pr-lg">Last name</q-item-label>
          <q-input
          :input-style="{width:'270px'}"
          type="text"
          outlined
          :value='getEditData.lastName'
          @change="(event) => onChangeValue('lastName',event.target.value)"
          :rules="[val => handleValidate(null,val)]"
          no-error-icon
        />
        </div>

      </div>
    </div>

    <div class='wrapper q-pt-lg q-pl-xl'>
      <div class='flex flex-center justify-between'>
      <q-item-label class="text-h6 text-weight-regular">Email</q-item-label>
          <q-input
          :input-style="{width:'350px'}"
          type="email"
          class="form"
          outlined
          standout="text-dark"
          :value='getEditData.email'
          @change="(event) => onChangeValue('email',event.target.value)"
          :rules="[val => handleValidate('email',val)]"
          :placeholder="getCurrentUser.email"
          no-error-icon
        />
      </div>

      <div class='flex flex-center justify-between q-pt-lg'>
      <q-item-label class="text-h6 text-weight-regular">Phone</q-item-label>
          <q-input
          :input-style="{width:'350px'}"
          type="text"
          class="form"
          outlined
          standout="text-dark"
          :value='getEditData.phone'
          @change="(event) => onChangeValue('phone',event.target.value)"
          :rules="[val => handleValidate(null,val)]"
          :placeholder="getCurrentUser.phone"
          no-error-icon
        />
      </div>

      <div class='flex flex-center justify-between q-pt-lg'>
      <q-item-label class="text-h6 text-weight-regular ">Time zone</q-item-label>
          <q-input
          :input-style="{width:'350px'}"
          type="text"
          class="form"
          outlined
          standout="text-dark"
          :value='getEditData.timeZone'
          @change="(event) => onChangeValue('timeZone',event.target.value)"
          :placeholder="getCurrentUser.timeZone"
          no-error-icon
        />
      </div>

    </div>
    <div class="wrapper justify-end flex q-pt-lg">
            <q-btn
              no-caps
              class="text-subtitle1 q-py-xs q-px-lg  q-mr-lg q-mb-lg"
              outline
              label="Cancel"
              :disabled='getSubmiting'
              @click='onCancel'
            />
            <q-btn
              no-caps
              class="bg-primary text-subtitle1 q-px-lg q-py-xs q-mb-lg"
              type="submit"
              outline
              label="Save changes"
              :disabled='getSubmiting'
              @submit.prevent.stop="onSubmit"
            />
    </div>
    </q-form>
    <div class='q-pb-xl' v-if='getUserEditSucces || getUserValidEditErrors || getEditProfileError'>
      <q-banner v-if='getUserEditSucces' inline-actions class="fixed-bottom text-white bg-green text-center">
        <div class='text-h6'>User edit</div>
      </q-banner>
      <q-banner v-else-if='getUserValidEditErrors' class="fixed-bottom text-white bg-red text-center">
        <div v-for="(error,index) of getUserValidEditErrors" :key='index'>{{'Error: ' + error}}</div>
      </q-banner>
      <q-banner v-else-if='getEditProfileError' class="fixed-bottom text-white bg-red text-center">
        <div>{{'Error: ' + getEditProfileError}}</div>
      </q-banner>
    </div>

  </q-page>
</template>

<script>
import { actionProfileTypes, mutationTypes } from '../../store/modules/profile/'
import { actionAuthTypes } from '../../store/modules/auth/'

export default {
  computed: {
    getAuthError () {
      return this.$store.getters.getAuthError
    },
    getUserData () {
      return this.$store.getters.getUserData
    },
    getEditProfileError () {
      return this.$store.getters.getEditProfileError
    },
    getUserValidEditErrors () {
      return this.$store.getters.getUserValidEditErrors
    },
    getSubmiting () {
      return this.$store.getters.getSubmiting
    },
    getCurrentUser () {
      return this.$store.getters.getCurrentUser
    },
    getUserEditSucces () {
      return this.$store.getters.getUserEditSucces
    },
    getEditData () {
      return this.$store.getters.getEditData
    }
  },
  methods: {
    handleValidate (type = 'text', val) {
      const isMatchEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (val) {
        if (type === 'email') {
          if (val.match(isMatchEmail)) { return true } else {
            return 'Invalid email'
          }
        }
      } else {
        return 'Please type something'
      }
    },

    onChangeValue (type, val) {
      this.$store.commit(mutationTypes.editUserData, { type, val })
      console.log(type, val)
    },

    onCancel () {
      this.$router.push({ name: 'profile', params: { id: this.$store.state.auth.currentUser.id } })
    },

    delAvatar () {
      this.$store.commit(mutationTypes.editUserData, { type: 'avatar', val: '' })
    },

    onSubmit () {
      this.$store.dispatch(actionProfileTypes.putEditProfileUser, this.getEditData).then(() => {
        this.$router.push({ name: 'profile', params: { id: this.getCurrentUser.id } })
      })
    }
  },
  mounted () {
    this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
      this.$store.commit(mutationTypes.clearState)
      this.$store.dispatch(actionProfileTypes.getSettingProfileUser, this.$route.params.id).then((data) => {
      }).catch(() => {
        this.$router.push({ name: '404' })
      })
    })
  }
}
</script>

<style scoped>

.wrapper {
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
}

</style>
