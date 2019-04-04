<template>
  <section class="navigation-bar">
    <div class="logo">
      <router-link to="/">
        <img src="../../img/small-logo.png" class="logo-nav" alt>
      </router-link>
    </div>
    <div class="navigation">
      <router-link class="nav-btns" to="/" title="Home">
        <i class="fas fa-home nav-btn"></i>
      </router-link>
      <router-link class="nav-btns" to="/about" title="About">
        <i class="fas fa-info nav-btn"></i>
      </router-link>
      <router-link class="nav-btns" to="/board" title="Boards">
        <i class="fas fa-table nav-btn"></i>
      </router-link>
      <div class="login">
        <router-link to="/login/">
          <span class="user-logedin" v-if="user && user._id" title="Logout">
            <span v-if="user.prefs.userPic">
              <img src="user.prefs.userPic" alt>
            </span>
            <span
              v-else
              class="no-pic-user"
              :style="{ background: user.prefs.bgColor, color: user.prefs.color }"
            >{{user.firstName[0]}}{{user.lastName[0]}}</span>
          </span>
          <i v-else class="fas fa-sign-in-alt nav-btn" title="Login"></i>
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
  background: rgba(0, 0, 0, 0.35);
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  padding: 4px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  .logo-nav {
    width: 40px;
    height: 40px;
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
  border: 1px solid #0000007a;
  &:hover {
    background-color: #050505c5;
  }
  .user-logedin {
    margin-bottom: 4px;
    color: #ffffff;
    font-size: 20px;
  }
  .no-pic-user {
    width: 37px;
    height: 37px;
    &:hover {
      background-color: #050505c5;
    }
  }
}
</style>
