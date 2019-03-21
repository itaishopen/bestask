<template>
    <section>
        <!-- <b-button v-on:click="editCard">Edit Card</b-button> -->
        <div>
            <b-button v-b-modal.modal1>Edit Card</b-button>

            <!-- Modal Component -->
            <b-modal id="modal1" title="Edit Card">
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
                        <!-- <div class="comments"> -->
                        <b-form-input class="m-1" v-model="comment" placeholder="Add comment"/>
                        <b-button class="m-1" v-on:click="addComment">Save</b-button>
                        <div v-for="comment in card.comments" :key="comment">
                            {{comment}}
                            <!-- <div class="flex comments"></div> -->
                        </div>
                        <!-- </div> -->
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

                <!-- <p class="my-4">Hello from modal!</p> -->
                <div slot="modal-footer" class="w-100">
                    <!-- <p class="float-left">Modal Footer Content</p> -->
                    <b-button class="float-right" variant="primary" @click="saveCard">Save</b-button>
                </div>
            </b-modal>
        </div>
    </section>
</template>

<script>
// import Modal from '../components/Modal.vue';
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
            showModal: false,
            comment: '',
            disabledSaveBtn: true
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
            // return
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
            if (this.comment) {
                var date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
                var comment = this.comment + '\t' + date;
                this.card.comments.unshift(comment);
                this.comment = '';
            }
        },
        toggleSave() {
            if (this.comment) disabledSaveBtn = true;
            disabledSaveBtn = false;
        }

    },
    components: {
        // Modal
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
