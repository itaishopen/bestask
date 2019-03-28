<template>
  <section class="navigation-bar">
    <div class="logo">
      <img src="../../img/bestask-logo-black.png" class="logo-nav" alt>
    </div>
    <div class="navigation">
      <router-link class="nav-btns" to="/">
        <i class="fas fa-home nav-btn"></i>
      </router-link>
      <router-link class="nav-btns" to="/about">
        <i class="fas fa-info nav-btn"></i>
      </router-link>
      <router-link class="nav-btns" to="/board">
        <i class="fab fa-flipboard nav-btn"></i>
      </router-link>
      <div class="login">
        <router-link to="/login/">
          <span
            class="user-logedin"
            v-if="user && user._id"
          >{{user.firstName[0].toUpperCase()}}{{user.lastName[0].toUpperCase()}}</span>
          <i v-else class="fas fa-sign-in-alt nav-btn"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: "NavigationBar",
  data() {
    return {
      userConnect: false
    };
  },
  created() {},
  computed: {
    user: {
      get() {
        if (this.$store.getters.isUserLoggedIn) {
          this.userConnect = true;
          return this.$store.getters.loggedInUser;
        }
      },
      set(userId) {
        console.log(this.user);
        console.log(userId, "userId");
        this.$store.commit("setUser", { card: userId });
      }
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
.navigation-bar {
  position: fixed;
  width: 100%;
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
    color: #ffffff;
    &:hover {
      color: #348a62;
    }
  }
}
.navigation {
  display: flex;
  align-items: center;
  .nav-btns {
    font-size: 22px;
    border-radius: 4px;
    padding: 5px;
    margin-right: 3px;
    min-width: 37px;
    transition: 0.2s;
    background-color: #0000007a;
    &:hover {
      background-color: #050505c5;
    }
  }
}
.nav-btn {
  color: white;
}
.login {
  font-size: 22px;
  font-family: Raleway-Regular, "Open Sans", sans-serif;
  font-weight: bold;
  line-height: 37px;
  border-radius: 50%;
  background-color: #0000007a;
  color: #ffffff;
  width: 37px;
  height: 37px;
  transition: 0.2s;
  &:hover {
    background-color: #050505c5;
  }
  .user-logedin {
    margin-bottom: 4px;
    color: #ffffff;
    font-size: 20px;
  }
}
</style>
