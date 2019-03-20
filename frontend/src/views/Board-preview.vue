<template>
<section class="board-preview">
    <board :board="board">
</section>
</template>

<script>
import  BoardService from "../services/BoardService";
export default {
  name: 'board-preview',
  components: {

  },
  created(){
      this.$store.dispatch({type: loadBoard})
  },
   computed:{
        board(){
            return this.$store.getters.boardToDisplay
        }
   }
}
</script>

