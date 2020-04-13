<template>

  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      title:'LoNUS'
    }
  },
  name: 'App',
  components: {
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  background-color: #FAFAFA;
  height: 100%;
  margin: 0;
}
</style>
