<template>
    <!-- <section> -->
    <!-- Modal Component -->
    <b-modal
        v-if="card"
        id="modal1"
        ref="myModalRef"
        @hide="modalClosed"
        title="Edit Card"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
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
                <b-button class="m-1" size="sm" v-on:click="addComment">Save</b-button>
                <div v-for="comment in card.comments" :key="comment">{{comment}}</div>
            </main>
            <div class="nav flex">
                <label class="m-1">Add to Card</label>
                <b-button class="m-1 btn-block" size="sm">Members</b-button>
                <b-button class="m-1 btn-block" size="sm">Labels</b-button>
                <b-button class="m-1 btn-block" size="sm">Checklist</b-button>

                <label class="m-1">Actions</label>
                <!-- <b-button class="m-1 btn-block" v-on:click="moveCard">Move</b-button> -->
                <b-dropdown class="m-1 btn-block" size="sm" text="Move to">
                    <b-dropdown-item
                        v-for="list in lists"
                        :key="list._id"
                        :value="list._id"
                        @click="card.listId = list._id"
                    >{{ list.title }}</b-dropdown-item>
                </b-dropdown>

                <b-button class="m-1 btn-block" size="sm">Copy</b-button>
                <b-button class="m-1 btn-block" size="sm" v-on:click="saveCard(true)">Archive</b-button>
                <!-- <b-form-checkbox
                    button
                    v-model="card.archived"
                    name="check-button"
                >Archive {{ card.archived }}</b-form-checkbox>-->
                <b-button class="m-1 btn-block" size="sm">Share</b-button>
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
        var cardId = this.$route.params.cardId;
        this.$store.dispatch({ type: 'loadCard', cardId });
    },
    mounted() {
        this.$refs.myModalRef.show();
    },
    computed: {
        card: {
            get() {
                return this.$store.getters.getCurrCard;
            },
            set(cardItem) {
                this.$store.commit('setCard', { card: cardItem });
            }
        },
        lists() {
            return this.$store.getters.getLists.filter(list => list._id !== this.card.listId);
        }
    },
    methods: {
        closeModal() {
            // this.$refs.myModalRef.hide();
            this.$router.push('/task');
        },
        saveCard(archive) {
            if (archive) this.card.archived = true;
            console.log('Saving card..', this.card);
            this.$store.dispatch({ type: 'saveCard', card: this.card })
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
        // archiveCard() {
        //     this.card.archived = true;
        //     this.saveCard();
        //     // console.log(this.card);
        //     // this.$store.dispatch({ type: "loadBoard", boardId });
        //     // this.$router.push('/task');
        // },
        moveCard() {
            // console.log(this.$store.getters.getLists);
            this.$store.getters.getLists.map(list => console.log(list.title));
        }
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
    padding-right: 0px;
    padding-left: 0px;
    /* justify-content: space-between; */
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
    /* align-items: center; */
    margin: 5px;
}

.comments {
    flex-direction: column;
}
</style>
