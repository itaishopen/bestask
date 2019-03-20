<template>
    <section class="board">
        <ul class="board-list">
            <li v-for="list in lists" :key="list._id">
                <list :list="list"/>
            </li>
        </ul>
    </section>
</template>

<script>
import list from "./List.vue";
export default {
    name: "board",
    props: ['board'],
    components: {
        list
    },
    computed: {
        lists() {
            return this.$store.getters.getLists;
        }
    }
};
</script>