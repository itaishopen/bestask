<template>
    <div v-if="lists" class="archive">
        <!-- <h1>This is an board archive page</h1> -->
        <!-- {{lists}} -->
        <div class="flex lists" v-for="list in lists" :key="list._id">
            <div v-for="card in list.cards" :key="card._id">
                <card-preview v-if="card.archived" :card="card"></card-preview>
            </div>
        </div>
    </div>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
export default {
    name: "BoardArchive",
    data() {
        return {
        }
    },
    created() {
        var boardId = this.$route.params.boardId;
        // console.log(boardId);
        this.$store.dispatch({ type: "loadBoard", boardId });
    },
    components: {
        CardPreview
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

    }
};
</script>

<style lang='scss' scoped>
.flex {
    display: flex;
}

.lists {
    // height: 100vh; //100% view height
    width: 100vw; // 100% view width
}
</style>
