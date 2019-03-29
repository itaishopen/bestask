<template>
<section>
  <div class="home">
    <img src="../../img/1.jpg" class="home-img">
  </div>
  <div class="home-btns">
    <button class="login">login</button>
    <button class="guest">guest</button>
  </div></section>
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
.home-btns{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
.login{
margin-top: 70vh; 

}
.guest{
margin-top: 70vh; 
  
}

}
</style>
