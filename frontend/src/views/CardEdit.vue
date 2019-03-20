<template>
    <section>
        <button v-on:click="editCard">Edit Card</button>
        <!-- <modal v-if="showModal"></modal> -->
        <modal v-if="showModal" v-on:close="closeModal" v-on:save="saveCard">
            <input type="text" slot="header" v-model="card.title">
            <div class="container flex" slot="body">
                <div class="content flex">
                    <label>Description</label>
                    <textarea rows="5" cols="30" v-model="card.description"></textarea>
                    <label>Add Comment</label>
                    <input type="text" v-model="comment">
                    <button v-on:click="addComment">Save</button>
                    <div v-for="comment in card.comments" :key="comment" class="flex">
                        <div>{{comment}}</div>
                    </div>

                    <!-- <ul class="comments">
                        <li v-for="comment in card.comments" :key="comment">
                            {{comment}}
                            <input type="text" value="{{comment}}">
                        </li>
                    </ul>-->
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
            <!-- <h6 slot="body">{{book.title}}</h6>
            <h6 slot="body">{{pageCount}}</h6>
            <h6 slot="body">{{publishedDate}}</h6>
            <h6 slot="body" v-bind:class="classObject">{{bookPrice}}</h6>
            <h6 slot="body">{{onSale}}</h6>
            <long-text slot="body" v-bind:txt="book.description"></long-text>
            <review-display slot="body" v-bind:reviews="book.reviews" v-on:delete="onDeleteReview"></review-display>
            <review-add slot="body" v-on:reviewed="onSaveReview"></review-add>-->
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
