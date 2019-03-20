<template>
  <div class="login">
    <h1>This is an login page</h1>
    <form class="form-login" @submit.prevent="login">
      <input class="username-login" type="text" v-model="typedUsername" placeholder="Username" required>
      <input  class="password-login" type="password" v-model="typedPassword" placeholder="Password" required>
      <button class="btn-login" type="submit">Log in</button>
            <span v-if="isWorng">worng credinatls</span>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
 data(){
    return {
      typedUsername: '',
      typedPassword: '',
      isWorng : false
    }
  },
  methods: {
    login(){
      this.$store.dispatch({
        type: 'login',
        user: {
          nickname: this.typedUsername,
          password: this.typedPassword
        }
      })
      .then(user => {
          if(!user){
            this.isWorng = true
          } else {
            this.isWorng = false
            router.push({ path: 'about' })
          }
      })
    }
  },
  components: {
  }
}
</script>
