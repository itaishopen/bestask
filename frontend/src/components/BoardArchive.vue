<template>
    <section v-if="lists" class="archive">
        <header class="nav-board">
            
        </header>
        <main class="main flex">
            <b-button class="back-to-bord-btn" variant="link" v-on:click="backToBord">Back to Board</b-button>
            <div class="flex lists" v-for="list in lists" :key="list._id">
                <div v-for="card in list.cards" :key="card._id">
                    <card-preview v-if="card.archived" :card="card"></card-preview>
                </div>
            </div>
            <card-edit v-if="showModal" ref="card">
                <router-view name="Card Edit"/>
            </card-edit>
        </main>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardEdit from '../views/CardEdit.vue'
export default {
    name: "BoardArchive",
    data() {
        return {
            showModal: this.$route.meta.showModal,
            boardId: null
        }
    },
    created() {
        this.boardId = this.$route.params.boardId;
        // console.log(boardId);
        this.$store.dispatch({ type: "loadBoard", boardId: this.boardId });
    },
    components: {
        CardPreview,
        CardEdit
    },
    computed: {
        lists: {
            get() {
                return this.$store.getters.getLists;
            },
            set(lists) {
                this.$store.commit("setLists", { lists: lists });
            }
        },
    },
    methods: {
        backToBord() {
            this.$router.push(`/board/${this.boardId}`)
        }

    },
    watch: {
        "$route.meta"({ showModal }) {
            this.showModal = showModal;
        }
    }
};
</script>

<style lang='scss' scoped>
.flex {
    display: flex;
}
.nav-board {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    justify-content: flex-end;
}

.main {
    flex-direction: column;
    // justify-content:flex-end;
}
.back-to-bord-btn{
    align-self: flex-end;
}

.lists {
    // height: 100vh; //100% view height
    width: 100vw; // 100% view width
    flex-wrap:wrap;
}
.archive {
    padding-top: 70px;
}
</style>
