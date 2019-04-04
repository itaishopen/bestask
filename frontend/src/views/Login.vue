<template>
  <div class="login">
    <div>
      <form class="form-login" @submit.prevent="login">
        <input
          class="username-login"
          type="text"
          v-model="user.userName"
          placeholder="Username"
          required
        >
        <input
          class="password-login"
          type="password"
          v-model="user.password"
          placeholder="Password"
          required
        >
        <button class="btn-login" type="submit">Log in</button>
        <span v-if="isWorng">worng credinatls</span>
      </form>
    </div>
    <div>
      <button class="btn-login">
        <router-link to="/signup/">creat new acount</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      isWorng: false
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch({
          type: "login",
          user: this.user
        })
        .then(user => {
          if (user.length) {
            this.isWorng = false;
            this.$router.push({ path: "/board" });
          } else {
            this.isWorng = true;
          }
        });
    }
  },
  components: {}
};
</script>


<style lang='scss' scoped>
.login {
  margin-top: 20px;
  .form-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .username-login,
  .password-login,
  .btn-login {
    font-size: 30px;
    font-family: PontanoSans-Regular;
    padding: 10px;
    width: 350px;
    height: 50px;
    border: 1px solid rgb(0, 81, 146);
    color: rgb(0, 81, 146);
    background-color: rgb(255, 255, 255);
    margin: 7px 0;
    border-radius: 6px;
  }
  a {
    color: rgb(0, 81, 146);
    transition: 0.3s;
    &:hover {
      color: rgb(0, 25, 95);
    }
  }
  .btn-login {
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-login:hover {
    border: 1px solid rgb(0, 25, 95);
    background-color: rgb(255, 255, 255);
    color: rgb(0, 25, 95);
  }
}

.sign-up {
  .form-sign-up {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .first-name-sign-up,
  .last-name-sign-up,
  .username-sign-up,
  .password-sign-up,
  .btn-sign-up {
    font-size: 30px;
    font-family: PontanoSans-Regular;
    padding: 10px;
    min-width: 350px;
    min-height: 40px;
    border: 1px solid rgb(0, 81, 146);
    color: rgb(0, 81, 146);
    background-color: rgb(255, 255, 255);
    margin: 7px 0;
    border-radius: 6px;
  }
  .btn-sign-up {
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-sign-up:hover {
    border: 1px solid rgb(0, 25, 95);
    background-color: rgb(255, 255, 255);
    color: rgb(0, 25, 95);
  }
}
</style>



