<template>
    <div v-if="board" class="activity">
        <!-- <h1>Activity comp</h1> -->
        <div v-for="activity in activities" :key="activity._id">
            <activity :activity="activity"></activity>
        </div>
    </div>
</template>

<script>
import Activity from "./Activity.vue";
export default {
    name: 'Activities',
    props: ['board'],
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({ type: "loadBoard", boardId: this.board._id })
    },
    components: {
        Activity
    },
    computed: {
        activities() {
            return this.$store.getters.getBoardActivities;
        },

    },
    methods: {

    }
};
</script>

<style lang='scss' scoped>
.flex {
    display: flex;
}
.activities {
    flex-direction: column;
}
</style>
