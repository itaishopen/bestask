<template>
    <div v-if="activity">
        <!-- <h1>Activity comp</h1> -->
        <div class="activity flex">
            <h2>Board: {{board}}</h2>
            <h3>Card: {{card}}</h3>
            <h3>Created: {{createdAt}}</h3>
            <h3>List: {{list}}</h3>
            <h3>Text: {{text}}</h3>
            <h3>User: {{user}}</h3>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Activity',
    props: ['activity'],
    data() {
        return {
        }
    },
    created() {
        // console.log(this.activity);
    },
    components: {
    },
    computed: {
        board() {
            if (this.activity.board[0].title) return this.activity.board[0].title;
            return '';
        },
        card() {
            if (this.activity.card[0]) return this.activity.card[0].title;
            return '';
        },
        createdAt() {
            if (this.activity.createdAt) return this.activity.createdAt;
            return '';
        },
        list() {
            if (this.activity.list[0]) return this.activity.list[0].title;
            return '';
        },
        text() {
            if (this.activity.text) return this.activity.text;
            return '';
        },
        user() {
            if (this.activity.user[0]) return this.activity.user[0].userName;
            return '';
        }
    },
    methods: {

    }
};
</script>

<style lang='scss' scoped>
.flex {
    display: flex;
}
.activity {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 4px;
    min-width: 320px;
    max-width: 320px;
    min-height: 120px;
    max-height: 120px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(230, 230, 230);
    border-radius: 10px;
    margin: 0.7px 3px;
    box-shadow: 0px 5px 6px -4px rgba(0, 0, 0, 0.4);
    border-bottom: 0.9px solid rgb(167, 165, 165);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    transition: 0.2s;
    font-weight: bold;
}
</style>
