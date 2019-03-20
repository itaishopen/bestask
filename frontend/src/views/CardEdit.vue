<template></template>

<script>

export default {
    name: 'CardEdit',
    data() {
        return {

        };
    },
    created() {
        var cardItem = this.$store.getters.cardItemToAdd;
        console.log(cardItem);

        this.$store.commit('setCardItem', { cardItem });
    },
    computed: {
        card: {
            // return JSON.parse(JSON.stringify(this.$store.state.currItem));
            get() { return this.$store.getters.currCardItem },
            set(cardItem) { this.$store.commit('setCardItem', { cardItem }) }
        }

    },
    methods: {

    },
    components: {

    },
};
</script>

<style lang="scss" scoped>
.dialog {
    width: 100%;
    max-height: min-content;
    // height: 100vh;
}
.flex {
    display: flex;
}
.md-dialog {
    // max-width: 768px;
}

.md-button {
    text-transform: capitalize !important; /*For Lower case use lowercase*/
    width: 100px;
}

.main-container {
    // display: flex;
    flex-direction: column;
    height: 100vh;
    // background-color: yellow;
}

.header {
    height: 5em;
    // background-color: #1E2129;
}

.container {
    // display: flex;
    // flex-direction: column;
    // flex: 1;
    /* width: 100%; */
    // background-color: blue;
    justify-content: space-evenly;
}

.content {
    flex-basis: 80%;
    // background-color: #46A3A3;
}

.nav {
    flex-direction: column;
    align-items: flex-start;
}
</style>
