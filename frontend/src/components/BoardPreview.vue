<template>
<section class="board-preview">
    <board :board="board">
</section>
</template>

<script>
// import  BoardService from "../services/BoardService.js";
import  Board from "../components/Board.vue";
export default {
  name: 'board-preview',
  components: {
    Board
  },
  created(){
      this.$store.dispatch({type: loadBoard})
  },
   computed:{
        board(){
            return this.$store.getters.getBoard
        }
   }
}
</script>

