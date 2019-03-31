<template>
  <section>
    <div class="home">
      <video autoplay muted loop class="home-img">
        <source src="../../img/3.mp4" type="video/mp4">
      </video>
    </div>
    <div class="home-btns">
      <button class="login" @click="login">login</button>
      <button class="guest" @click="guest">guest</button>
    </div>
  </section>
</template>

<script>
// import BoardPreview from  '../component/BoardPreview.vue';
export default {
  name: "home",
  components: {
    // BoardPreview
  },
  methods: {
    guest() {
      this.$router.push({ path: "/board" });
    },
    login() {
      this.$router.push({ path: "/login" });
    }
  },
  created() {}
};
</script>


<style lang='scss' scoped>
.home-img {
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.home-btns {
  display: flex;
  align-items: center;
  // margin-left: 20px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-top: 55vh;
  background-color: rgba(255, 255, 255, 0.76);
  // border: 1px solid rgb(17, 26, 146);
  border-radius: 2px;
  .login,
  .guest {
    border: none;
    color: rgb(1, 3, 29);
    background-color: rgba(143, 151, 255, 0);
    font-family: LeckerliOne-Regular;
    font-size: 40px;
    padding: 20px 20px;
    transition: 0.3s;
    &:hover {
      color: rgb(0, 14, 209);
      // background-color: rgba(255, 255, 255, 0.445);
    }
  }
}
@media (min-width: 850px) {
  .home-btns {
    width: 100%;
    margin-top: 60vh;
    background-color: rgba(255, 255, 255, 0.76);
    border-radius: 0;
    .login,
    .guest {
      font-size: 60px;
      padding: 25px 60px;
    }
  }
}
</style>
