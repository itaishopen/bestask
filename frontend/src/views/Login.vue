<template>
  <div class="login">
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
    <button class="btn-login">
      <router-link to="/signup/">creat new acount</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user:{
        userName: "",
        password: "",
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
          console.log(user);
          
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
.home{
background-color: rgb(255, 255, 255);
height: 100vh;

    .img-home-app{
        object-fit: cover;
        width: 100%;
    }
    .login-container{
         position: absolute;
        top: 40%;
        left: 30%;
    }
    .login-btn, .new-user-btn, .guset-btn{
    margin: 0 20px;
    font-size: 30px;
    font-family: PontanoSans-Regular;
    padding: 10px;
    min-width: 40px;
    min-height: 40px;
    text-align: center;
    border: 1px solid rgb(0, 81, 146);
    border-radius: 6px;
    background-color:rgba(255, 255, 255, 0.637);
    color: rgb(0, 81, 146);
    cursor: pointer;
    transition: 0.3s
    }
    .login-btn:hover, .new-user-btn:hover, .guset-btn:hover{
   
    border: 1px solid rgb(0, 25, 95);
    border-radius: 6px;
    background-color:rgb(255, 255, 255);
    color: rgb(0, 25, 95);
    }
}

.login{
    .form-login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .username-login, .password-login, .btn-login{
        font-size: 30px;
        font-family: PontanoSans-Regular;
        padding: 10px;
        min-width: 350px;
        min-height: 40px;
        border: 1px solid rgb(0, 81, 146);
        color:  rgb(0, 81, 146);
        background-color:rgb(255, 255, 255);
        margin: 7px 0;
        border-radius: 6px;
    }
    .btn-login{
        cursor: pointer;
        transition: 0.3s
    }
    .btn-login:hover{
    border: 1px solid rgb(0, 25, 95);
    background-color:rgb(255, 255, 255);
    color: rgb(0, 25, 95);
    }
}

.sign-up{
    .form-sign-up{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .first-name-sign-up, .last-name-sign-up, .username-sign-up, .password-sign-up, .btn-sign-up{
        font-size: 30px;
        font-family: PontanoSans-Regular;
        padding: 10px;
        min-width: 350px;
        min-height: 40px;
        border: 1px solid rgb(0, 81, 146);
        color:  rgb(0, 81, 146);
        background-color:rgb(255, 255, 255);
        margin: 7px 0;
        border-radius: 6px;
    }
    .btn-sign-up{
        cursor: pointer;
        transition: 0.3s
    }
    .btn-sign-up:hover{
    border: 1px solid rgb(0, 25, 95);
    background-color:rgb(255, 255, 255);
    color: rgb(0, 25, 95);
    }
}

</style>



