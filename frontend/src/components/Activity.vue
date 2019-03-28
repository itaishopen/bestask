<template>
    <div v-if="board" class="activity">
        <!-- <h1>Activity comp</h1> -->
        <div>
            <pre>{{activities}}</pre>
        </div>

        <!-- <div v-for="activity in activities" :key="activity._id" class="flex activities"> -->
        <!-- <div v-if="activity.board">
                <div>Board: {{activity.board[0].title}}</div>
        </div>-->
        <!-- <div v-if="activity.card">{{activity.card[0].title}}</div> -->
        <!-- <div>Created At: {{activity.createdAt}}</div> -->
        <!-- <div>List: {{activity.list[0].title}}</div> -->
        <!-- <div>Text: {{activity.text}}</div> -->
        <!-- <div v-if="activity.user">User: {{activity.user[0].userName}}</div> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    name: 'Activity',
    props: ['board'],
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({ type: "loadBoard", boardId: this.board._id })
            .then(res => {
                console.log(res);
                console.log(this.$store.getters.getBoardActivities);
            })

    },
    components: {
    },
    computed: {
        activities() {
            // return this.$store.getters.getBoardActivities;
            var activities = this.$store.getters.getBoardActivities;
            var res = '';
            activities.forEach(activity => {
                if (activity.board[0].title) res += `Board: ${activity.board[0].title}\n`;
                if (activity.card[0]) res += `Card: ${activity.card[0].title}\n`;
                if (activity.createdAt) res += `Created At: ${activity.createdAt}\n`;
                if (activity.list[0]) res += `List: ${activity.list[0].title}\n`;
                if (activity.text) res += `Text: ${activity.text}\n`;
                if (activity.user[0]) res += `User: ${activity.user[0].userName}\n`;
            });
            return res;
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
