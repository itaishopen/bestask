<template>
    <section class="task-app task-wrapper">
        <!-- <h1>Task App</h1> -->
        <board-preview></board-preview>
        <!-- <card-edit></card-edit> -->
    </section>
</template>

<script>
import BoardPreview from '../components/BoardPreview.vue';
import CardEdit from '@/views/CardEdit.vue';


export default {
    name: 'TaskApp',
    data() {
        return {};
    },
    created() {

    },
    computed: {

    },
    methods: {

    },
    components: {
        CardEdit,
        BoardPreview
    }
};
</script>

<style>
</style>
