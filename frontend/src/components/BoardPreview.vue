<template>
    <section v-if="board" class="board-preview">
        <router-link :to="'/board/' + board._id">
            <div>{{board.title}}</div>
            <!-- <board :board="board"></board> -->
        </router-link>
    </section>
</template>

<script>
// import  BoardService from "../services/BoardService.js";
import Board from './Board.vue';
export default {
    name: 'BoardPreview',
    props: ["board"],
    components: {
        Board
    },
    created() {
        // var boardId = '5c90e128614ea0f42b453829';
        // this.$store.dispatch({ type: 'loadBoard', boardId });
        // this.$store.dispatch({ type: 'loadBoard', boardId: this.board._id });
    },
    computed: {
        // board() {
        //     return this.$store.getters.getBoard;
        // }
    }
}
</script>

