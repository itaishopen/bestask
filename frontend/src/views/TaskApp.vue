<template>
    <section class="task-app task-wrapper" v-if="boards">
        <h1>Boards:</h1>
        <div v-for="board in boards" :key="board._id">
            <board-preview :board="board"></board-preview>
            <!-- {{board.title}} -->
        </div>
        <!-- <card-edit></card-edit> -->
    </section>
</template>

<script>
import BoardPreview from '../components/BoardPreview.vue';
// import CardEdit from '@/views/CardEdit.vue';


export default {
    name: 'TaskApp',
    data() {
        return {};
    },
    created() {
        this.$store.dispatch({ type: 'updateUser', userId: 'guest' })
    },
    computed: {
        boards() {
            return this.$store.getters.getboards;
        }

    },
    methods: {

    },
    components: {
        BoardPreview
    }
};
</script>

<style lang='scss' scoped>
</style>
