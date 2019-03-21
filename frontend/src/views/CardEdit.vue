<template>
    <!-- <section> -->
    <!-- Modal Component -->
    <b-modal
        v-if="card"
        id="modal1"
        ref="myModalRef"
        @hide="modalClosed"
        title="Edit Card"
        no-close-on-backdrop
    >
        <div class="container flex">
            <main class="content flex">
                <b-form-input class="m-1" v-model="card.title" placeholder="Title"/>
                <b-form-textarea
                    class="m-1"
                    id="textarea"
                    v-model="card.description"
                    placeholder="Description"
                    rows="6"
                    max-rows="10"
                />
                <b-form-input class="m-1" v-model="comment" placeholder="Add comment"/>
                <b-button class="m-1" v-on:click="addComment">Save</b-button>
                <div v-for="comment in card.comments" :key="comment">{{comment}}</div>
            </main>
            <div class="nav flex">
                <label class="m-1">Add to Card</label>
                <b-button class="m-1 btn-block">Members</b-button>
                <b-button class="m-1 btn-block">Labels</b-button>
                <b-button class="m-1 btn-block">Checklist</b-button>
                <label class="m-1">Actions</label>
                <b-button class="m-1 btn-block">Move</b-button>
                <b-button class="m-1 btn-block">Copy</b-button>
                <b-button class="m-1 btn-block">Archive</b-button>
                <b-button class="m-1 btn-block">Share</b-button>
            </div>
        </div>
        <div slot="modal-footer" class="w-100">
            <b-button class="m-1 float-right" variant="primary" @click="saveCard">Save</b-button>
            <b-button class="m-1 float-right" @click="closeModal">Close</b-button>
        </div>
    </b-modal>
    <!-- </section> -->
</template>

<script>

import moment from 'moment';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
    name: 'CardEdit',
    data() {
        return {
            comment: '',
        };
    },
    created() {
        console.log('CardEdit was created');
        var itemId = this.$route.params.cardId;
        // console.log(itemId);
        this.$store.dispatch({ type: 'loadCardItem', itemId });
    },
    mounted() {
        this.$refs.myModalRef.show();
    },
    computed: {
        card: {
            get() { return this.$store.getters.currCardItem },
            set(cardItem) { this.$store.commit('setCardItem', { cardItem }) }
        },
    },
    methods: {
        closeModal() {
            this.$refs.myModalRef.hide();
        },
        saveCard() {
            console.log('Saving card..', this.card);
            this.$store.dispatch({ type: 'updateItem', item: this.card })
                .then(res => {
                    console.log(res);
                    // EventBusService.$emit(SHOW_MSG, { txt: 'Card Saved!', type: 'success' });
                    this.$router.push('/task');
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push('/task');
                });
        },
        addComment() {
            if (this.comment) {
                var date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
                var comment = this.comment + '\t' + date;
                if (!this.card.comments) this.card.comments = [comment];
                else this.card.comments.unshift(comment);
                this.comment = '';
            }
        },
        modalClosed() {
            console.log('modalClosed');
            this.$router.push('/task');
        },
    },
    components: {
    },
};
</script>

<style lang="css" scoped>
.flex {
    display: flex;
}

.main-container {
    /* display: flex; */
    /* flex-direction: column; */
    /* height: 100vh; */
    /* background-color: yellow; */
}

.header {
    /* height: 5em; */
    /* background-color: #1E2129; */
}

.container {
    /* display: flex; */
    /* flex-direction: column; */
    /* flex: 1; */
    /* width: 100%; */
    /* background-color: blue; */
    justify-content: space-between;
}

.content {
    flex-direction: column;
    flex-basis: 80%;
    align-items: flex-start;
    margin: 5px;
    /* background-color: #46A3A3; */
}

.nav {
    flex-direction: column;
    align-items: center;
    margin: 5px;
}

.comments {
    flex-direction: column;
}
</style>
