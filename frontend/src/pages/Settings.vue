<template>
  <div>
    <q-form class="absolute-center">
      <q-item class="col">
        <q-item-section>
          <div class="absolute-center center bg-grey-3 q-pd-xl circle"></div>
        </q-item-section>
      </q-item>
       <q-item>
          <q-btn class="q-mr-xl" flat>Change</q-btn>
          <q-btn class="q-ml-xl" flat>Delete</q-btn>
        </q-item>
      <q-item class="row">
        <q-item-section>
          <q-input
            v-model="name"
            name="firstName"
            label="First Name"
            lazy-rules
            :rules="[ val => val && val.length > 4 || 'Please enter your name']"/>
          <q-input
            v-model="lastname"
            name="lastName"
            label="Last Name"
            lazy-rules
            :rules="[ val => val && val.length > 4 || 'Please enter your last name']"/>
          <q-input
            v-model="email"
            name="email"
            label="E-mail"
            lazy-rules
            :rules="[ val => val && val.length > 6 || 'Please enter your email']"/>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn type="submit" class='absolute-center'>Change</q-btn>
        </q-item-section>
      </q-item>
    </q-form>

  </div>
</template>

<script>

export default {
  name: 'Settings',
  data () {
    return {
      name: '',
      lastname: '',
      email: ''
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
  }
}

</script>

<style>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>
