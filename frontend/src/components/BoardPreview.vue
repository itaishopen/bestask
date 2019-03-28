<template>
  <section v-if="board" class="board-preview">
    <router-link :to="'/board/' + board._id">
        <h1 class="Collection_title">{{ board.title }}</h1>
      <!-- <board :board="board"></board> -->
    </router-link>
  </section>
</template>

<script>
import Board from "./Board.vue";

export default {
  name: "BoardPreview",
  props: ["board"],
  data() {
    return {
     
    };
  },
  components: {
    Board
  },
  created() {},
  computed: {},
 
};
</script>

<style lang='scss' scoped>
.Collection_title {
    font-family: Raleway-Regular, "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #FFFFFF;
    margin: 0;
    padding: 0; 
    }
</style>
