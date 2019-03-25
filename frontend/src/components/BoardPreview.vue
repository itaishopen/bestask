<template>
  <section v-if="board" class="board-preview">
    <board :board="board"></board>
  </section>
</template>

<script>
import Board from './Board.vue';
import SocketService from '../services/SocketService'
export default {
  name: 'BoardPreview',
  components: {
    Board
  },
  created() {
    var boardId = "5c90e128614ea0f42b453829";
    this.$store.dispatch({ type: 'loadBoard', boardId })
    var user = this.$store.getters.loggedInUser;
    SocketService.init(boardId, user)
    if (user) SocketService.on('userConnected', user)
    else SocketService.on('userConnected', null)
    SocketService.on('board-change', function (boardId) {
      this.$store.dispatch({ type: "loadBoard", boardId })
    })
  },
  computed: {
    board() {
      return this.$store.getters.getBoard;
    }
  }
}
</script>

