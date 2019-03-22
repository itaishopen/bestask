<template>
    <section v-if="board" class="board-preview">
        <board :board="board"></board>
    </section>
</template>

<script>
// import  BoardService from "../services/BoardService.js";
import Board from './Board.vue';
export default {
    name: 'BoardPreview',
    components: {
        Board
    },
    created() {
        var boardId = '5c90e128614ea0f42b453829';
        this.$store.dispatch({ type: 'loadBoard', boardId: boardId });
    },
    computed: {
        board() {
            return this.$store.getters.getBoard;
        }
    }
}
</script>

