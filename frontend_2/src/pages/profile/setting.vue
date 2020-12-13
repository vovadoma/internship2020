<template>
    <q-page class="flex flex-center">
            <div class='text=h2'>Setting Page</div>
    </q-page>
</template>

<script>
import { actionProfileTypes } from '../../store/modules/profile/'
import { actionAuthTypes } from '../../store/modules/auth/'

export default {
  mounted () {
    this.$store.dispatch(actionAuthTypes.getCurrentUser).then(data => {
      this.$store.dispatch(actionProfileTypes.getUserProfile, this.$route.params.id)
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>
