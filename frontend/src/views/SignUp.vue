<template>
  <div class="sign-up">
    <h1>This is an sign up page</h1>
    <form class="form-sign-up" @submit.prevent="submit">
      <input  class="first-name-sign-up" type="first-name" v-model="typedFirstname" placeholder="First name" required>
      <input  class="last-name-sign-up" type="last-name" v-model="typedLastname" placeholder="Last name" required>
      <input class="username-sign-up" type="text" v-model="typedUsername" placeholder="Username" required>
      <input  class="password-sign-up" type="password" v-model="typedPassword" placeholder="Password" required>
      <button class="btn-sign-up" type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup',
 data(){
    return {
      typedFirstname: '',
      typedLastname: '',
      typedUsername: '',
      typedPassword: '',
      isWorng : false
    }
  },
  methods: {
    submit(){
      this.$store.dispatch({
        type: 'signup',
        user: {
          firstname: this.typedFirstname,
          lastname: this.typedLastname,
          nickname: this.typedUsername,
          password: this.typedPassword
        }
      })
      .then(user => {
          if(!user){
            this.isWorng = true
          } else {
            this.isWorng = false
            router.push({ path: '/about' })
          }
      })
    }
  },
  components: {
  }
}
</script>
