<template>
    <section class="task-app task-wrapper">
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

    },
    computed: {
        boards() {
            return [
                { _id: '5c9887f76255fe3570a6a093', title: 'open code project' },
                { _id: '5c90e128614ea0f42b453829', title: 'To Do now' }
            ];
        }

    },
    methods: {
        // getBoards() {
        //     var boards = [
        //         { _id: '5c9887f76255fe3570a6a093', title: 'open code project' },
        //         { _id: '5c90e128614ea0f42b453829', title: 'To Do now' }
        //     ]

        //     return boards;
        // }
    },
    components: {
        BoardPreview
    }
};
</script>

<style>
</style>
