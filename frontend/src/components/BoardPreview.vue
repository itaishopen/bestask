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
        var boardId = this.$route.query.boardId;
        this.$store.dispatch({ type: 'loadBoard', boardId }).then(() => {
            SocketService.init(board())
            var user = this.$store.getters.loggedInUser;
            if (user) SocketService.on('userConnected', user)
            else SocketService.on('userConnected', null)
        })
    },
    computed: {
        board() {
            return this.$store.getters.getBoard;
        }
    }
}
</script>

