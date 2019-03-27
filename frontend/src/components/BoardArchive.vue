<template>
  <div v-if="lists" class="archive">
    <!-- <h1>This is an board archive page</h1> -->
    <!-- {{lists}} -->
    <div class="flex lists" v-for="list in lists" :key="list._id">
      <div v-for="card in list.cards" :key="card._id">
        <card-preview v-if="card.archived" :card="card"></card-preview>
      </div>
    </div>
    <card-edit v-if="showModal" ref="card">
      <router-view name="Card Edit"/>
    </card-edit>
  </div>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardEdit from '../views/CardEdit.vue'
export default {
  name: "BoardArchive",
  data() {
    return {
        showModal: this.$route.meta.showModal
    }
  },
  created() {
    var boardId = this.$route.params.boardId;
    // console.log(boardId);
    this.$store.dispatch({ type: "loadBoard", boardId });
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

.lists {
  // height: 100vh; //100% view height
  width: 100vw; // 100% view width
}
</style>
