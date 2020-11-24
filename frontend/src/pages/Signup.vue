<template>
<q-form class="fixed-center" method="post" @submit="submitForm">
  <q-item class="row">
    <q-item-section class="q-mr-xl">
      <q-input
        v-model="name"
        name="name"
        label="First Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your name']"/>
      <q-input
        v-model="lname"
        name="lname"
        label="Last Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your last name']"/>
      <q-input
        v-model="phone"
        name="phone"
        label="Phone"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your phone']"/>
    </q-item-section>
    <q-item-section class='q-ml-xl'>
      <q-input
        v-model="email"
        name="email"
        label="E-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your email']"/>
      <q-input
        v-model="password"
        type="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length >= 6 || 'Your password']"/>
      <q-input
        v-model="repeatedPassword"
        type="password"
        label="Repeat Password"
        lazy-rules
        :rules="[ val => val && val.length >= 6 && val === this.password || 'Passwords do not match']"/>
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-btn type="submit" class='absolute-center'>SEND</q-btn>
    </q-item-section>
  </q-item>
</q-form>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      name: 'asd',
      lname: '',
      phone: null,
      email: '',
      password: '',
      repeatedPassword: ''
    }
  },
  methods: {
    submitForm () {
      console.log('Submited')
    }
  }
}

</script>
