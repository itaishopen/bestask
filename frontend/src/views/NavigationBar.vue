<template>
  <section class="navigation-bar">
    <div class="logo">
      <img src="../../img/bestask-logo-black.png" class="logo-nav" alt>
    </div>
    <div class="navigation">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/board">Bestask</router-link>|
      <router-link to="/login/">login</router-link>|
      <router-link to="/sign-up/">creat new acount</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {}
  },
  created() { },
  computed: {},
  methods: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .logo-nav {
    width: 100px;
    height: 70px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &:hover {
      color: #348a62;
    }
  }
}
.navigation {
  margin-left: 40vw;
  display: flex;
  align-items: center;
}
</style>
