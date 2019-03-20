<template>
<section class="board-preview">
    <board :board="board">
</section>
</template>

<script>
// import  BoardService from "../services/BoardService.js";
import BoardService from './Board.vue';
export default {
  name: 'BoardPreview',
  components: {

  },
  created(){
    //   this.$store.dispatch({type: loadBoard})
    var boardId = '5c90e128614ea0f42b453829';
      this.$store.dispatch({ type: 'loadBoard', boardId: boardId })
  },
   computed:{
    board(){
        return this.$store.getters.getBoard;
    }
   }
}
</script>

