<template>
  <div class="sign-up">
    <img src="../../img/6.jpg" alt class="sign-up-img">
    <form class="form-sign-up" @submit.prevent="submit">
      <input class="first-name-sign-up" v-model="user.firstName" placeholder="First name" required>
      <input class="last-name-sign-up" v-model="user.lastName" placeholder="Last name" required>
      <input class="username-sign-up" v-model="user.userName" placeholder="Username" required>
      <input class="password-sign-up" v-model="user.password" placeholder="Password" required>
      <input
        class="email-sign-up"
        :class="{ wrong: isWrongEmail }"
        @input="validateEmail"
        v-model="user.email"
        placeholder="Email"
        required
      >
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
      isWorng: false,
      isWrongEmail: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {
    validateEmail() {
      this.isWrongEmail =
        this.user.email === ""
          ? ""
          : this.reg.test(this.user.email)
          ? false
          : true;
    },
    submit() {
      if (this.isWrongEmail) {
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
      } else {
      }
    }
  },
  components: {}
};
</script>


<style lang='scss' scoped>
.sign-up {
  margin-top: calc(50vh - 170px);
  .sign-up-img {
    top: 0;
    left: 0;
    z-index: -1;
    position: absolute;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
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
    font-size: 18px;
    font-family: PontanoSans-Regular;
    padding: 15px;
    width: 350px;
    height: 50px;
    border: 0px solid rgb(31, 31, 31);
    color: rgb(255, 255, 255);
    background-color: rgba(136, 136, 136, 0.274);
    margin: 7px 0;
    border-radius: 50px;
  }
  .first-name-sign-up::placeholder,
  .last-name-sign-up::placeholder,
  .username-sign-up::placeholder,
  .password-sign-up::placeholder,
  .email-sign-up::placeholder {
    color: rgba(255, 255, 255, 0.685);
  }
  .btn-sign-up {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(45, 115, 245, 0.644);
  }
  .btn-sign-up:hover {
    background-color: rgba(8, 94, 255, 0.863);
    color: rgb(255, 255, 255);
  }
  .wrong {
    border: 2px solid red;
  }
}
</style>

