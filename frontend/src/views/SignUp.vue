<template>
  <div class="sign-up">
    <form class="form-sign-up" @submit.prevent="submit">
      <input class="first-name-sign-up" v-model="user.firstName" placeholder="First name" required>
      <input class="last-name-sign-up" v-model="user.lastName" placeholder="Last name" required>
      <input class="username-sign-up" v-model="user.userName" placeholder="Username" required>
      <input class="password-sign-up" v-model="user.password" placeholder="Password" required>
      <input class="email-sign-up" v-model="user.email" placeholder="Email" required>
      <button class="btn-sign-up" type="submit">Check in</button>
    </form>
  </div>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: "signup",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        email: "",
        prefs: { userPic: null, bgColor: "#ffffff", color: "#000000" }
      },
      isWorng: false
    };
  },
  methods: {
    submit() {
      console.log(this.user);

      this.$store
        .dispatch({
          type: "signup",
          user: this.user
        })
        .then(user => {
          if (!user) {
            this.isWorng = true;
          } else {
            this.isWorng = false;
            this.$router.push({ path: "/board" });
          }
        });
    }
  },
  components: {}
};
</script>


<style lang='scss' scoped>
.sign-up {
  margin-top: 20px;

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
  .btn-sign-up,
  .email-sign-up {
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

