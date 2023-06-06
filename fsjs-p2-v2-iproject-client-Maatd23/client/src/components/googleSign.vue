<template>
  <div id="buttonDiv"></div>
</template>

<script>
import { mapActions } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  name: 'googleSign',
  mounted() {
    google.accounts.id.initialize({
      client_id: '380480983359-9hnvqqifvv9h3buledc78hm8penntnic.apps.googleusercontent.com',
      callback: this.handleGoogle
    })
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', width: 310, height: 80, theme: 'dark' } // customization attributes
    )
    // google.accounts.id.prompt() // also display the One Tap dialog
  },
  methods: {
    ...mapActions(useKosanStore, ['GoogleLogin']),
    handleGoogle(data) {
      this.GoogleLogin(data)
    }
  }
}
</script>

<style></style>
