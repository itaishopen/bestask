<template>
  <div id="app">
    <div id="nav">
      <div>
        <img src="../img/bestask-logo-black.png" class="logo-nav" alt>
      </div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/task">Bestask</router-link> |
        <router-link to="/login/">login</router-link> |
        <router-link to="/sign-up/">creat new acount</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
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
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
