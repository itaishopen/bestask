<template>
    <section>
        <button v-on:click="editCard">Edit Card</button>
        <!-- <modal v-if="showModal"></modal> -->
        <modal v-if="showModal" v-on:close="closeModal" v-on:save="saveCard">
            <h1 slot="header">Edit Card</h1>
            <div class="container flex" slot="body">
                <div class="content flex">
                    <input type="text" v-model="card.title" placeholder="Title">
                    <!-- <label>Description</label> -->
                    <textarea
                        rows="5"
                        cols="30"
                        v-model="card.description"
                        placeholder="Description"
                    ></textarea>
                    <!-- <label>Add Comment</label> -->
                    <input type="text" v-model="comment" placeholder="Add comment">
                    <button v-on:click="addComment">Save</button>
                    <div v-for="comment in card.comments" :key="comment" class="flex">
                        <div>{{comment}}</div>
                    </div>
                </div>
                <div class="nav flex">
                    <label>Add to Card</label>
                    <button>Members</button>
                    <button>Labels</button>
                    <button>Checklist</button>
                    <label>Actions</label>
                    <button>Move</button>
                    <button>Copy</button>
                    <button>Archive</button>
                    <button>Share</button>
                </div>
            </div>
        </modal>
    </section>
</template>

<script>
import Modal from '../components/Modal.vue';
import moment from 'moment';

export default {
    name: 'CardEdit',
    data() {
        return {
            showModal: false,
            comment: ''
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
        },
        formattedDate() {
            return
        }
    },
    methods: {
        editCard() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveCard() {
            console.log('Saving card');
            this.showModal = false;
        },
        addComment() {
            var date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
            var comment = this.comment + '\t' + date;
            this.card.comments.unshift(comment);
            this.comment = '';
        },

    },
    components: {
        Modal
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
    flex-direction: column;
    flex-basis: 80%;
    align-items: flex-start;
    // background-color: #46A3A3;
}

.nav {
    flex-direction: column;
    align-items: flex-start;
}
</style>
