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
import SocketService from "../services/SocketService";
export default {
  name: "BoardPreview",
  props: ["board"],
  components: {
    Board
  },
  created() {},
  computed: {}
};
</script>

<style>
</style>
