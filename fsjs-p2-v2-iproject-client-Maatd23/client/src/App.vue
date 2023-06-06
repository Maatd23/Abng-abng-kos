<script>
import { mapState } from 'pinia'
import Loader from './components/loader.vue'
import navbar from './components/navbar.vue'
import { useKosanStore } from './stores/kosan'
export default {
  components: { navbar, Loader },
  computed:{
    ...mapState(useKosanStore, ['loader'])
  }
}
</script>

<template>
  <div>
    <navbar v-if="$route.name !== 'login' && $route.name !== 'register'" />
    <loader v-if="loader"/>
    <RouterView />
  </div>
</template>

<style></style>
