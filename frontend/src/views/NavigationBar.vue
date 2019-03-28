<template>
  <section class="navigation-bar">
    <div class="logo">
      <img src="../../img/bestask-logo-black.png" class="logo-nav" alt>
    </div>
    <div class="navigation">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/board">Bestask</router-link>|
    </div>
    <div class="login">
      <router-link to="/login/">Login</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  components: {}
};
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
.login {
  font-family: Raleway-Regular, "Open Sans", sans-serif;
  font-weight: bold;
  line-height: 50px;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  width: 50px;
  height: 50px;
}
</style>
