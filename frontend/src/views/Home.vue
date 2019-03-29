<template>
  <section>
    <div class="home">
      <img src="../../img/1.jpg" class="home-img">
    </div>
    <div class="home-btns">
      <button class="login">login</button>
      <button class="guest">guest</button>
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
  .login,
  .guest {
    font-family: LeckerliOne-Regular;
    margin-top: 20vh;
    font-size: 35px;
    background-color: rgba(102, 102, 102, 0.445);
    color: rgb(66, 66, 66);
    border: none;
    border: 1px solid rgb(56, 56, 56);
    border-radius: 5px;
    padding: 8px 18px;
  }
}
</style>
