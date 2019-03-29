<template>
  <section v-if="board" class="board-preview">
    <router-link class="collection-item" :to="'/board/' + board._id">
      <h1 class="collection-title">{{ board.title }}</h1>
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
  created() { },
  computed: {},

};
</script>

<style lang='scss' scoped>
.collection-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Raleway-Regular, "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 21px;
  color: #ffffff;
  margin: 0;
  padding: 0;
  height: 85px;
  width: 250px;
}
</style>
