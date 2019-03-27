<template>
  <section v-if="board" class="board-preview">
    <router-link :to="'/board/' + board._id">
      <div>{{board.title}}</div>
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
</style>
