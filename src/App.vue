<template>
  <div id="app">
    <TheHeader/>
    <router-view />

  </div>
</template>

<script>
import TheHeader from './views/TheHeader'
export default {
  name: 'App',
  components: {
      TheHeader
    },
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 20px; */
  margin: 0;
  padding: 0;
}

</style>
