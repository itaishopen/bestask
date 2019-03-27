<template>
  <div id="app">
    <navigation-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "./views/NavigationBar.vue";
export default {
  name: "app",
  props: [],
  components: {
    NavigationBar
  },
  created() {},
  computed: {}
};
</script>
<style lang='scss' scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b8ae9;
}
</style>
