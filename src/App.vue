<template>
  <div id="app">
    <Home />
    <router-view class="view"/>
  </div>
</template>

<script>
import Home from '@/components/Home.vue'

export default { 
  name: 'app', 
  components: {
    Home,
  }
}
</script>

<style>
/* #app, .view {
  width: 100vw;
  height: 100vh;
} */
</style>
