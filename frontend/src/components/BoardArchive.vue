<template>
  <section v-if="lists" class="archive">
    <header class="nav-board">
      <b-button class="back-to-bord-btn" variant="link" v-on:click="backToBord">Back to Board</b-button>
    </header>
    <main class="main flex">
      <div v-for="list in lists" :key="list._id">
        <div class="lists" v-if="arciveCheck(list)">
          <div class="title-list">{{list.title}}</div>
          <div class="cards">
            <div 
            v-for="card in list.cards" :key="card._id" 
            class="card" 
            :class="[card._id, card.archived ? '' : 'hide-card']"
            >
              <card-preview v-if="card.archived" :card="card"></card-preview>
            </div>
          </div>
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
    },
    arciveCheck(list) {
      console.log(list);

      return list.cards.some(card => card.archived)

    },

  },
  watch: {
    "$route.meta"({ showModal }) {
      this.showModal = showModal;
    }
  }
};
</script>

<style lang='scss' scoped>
.archive {
  padding-top: 70px;
}
.flex {
  display: flex;
}
.fun {
  flex-direction: column;
  // min-width: 0;
}
.nav-board {
  position: fixed;
  display: flex;
  height: 70px;
  flex-direction: row;
  align-content: center;
  justify-content: flex-end;
  width: 100vw;
}

.main {
  padding-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  // justify-content:flex-end;
}
.back-to-bord-btn {
  align-self: center;
}

.lists {
  flex-direction: column;
  min-width: 280px;
  max-height: 100%;
  background-color: #ebebeb;
  border: 1px solid #cecece;
  border-radius: 8px;
  margin: 0px 5px;
  .title-list {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
    margin: 10px 0 4px;
    font-size: 18px;
    color: rgb(0, 2, 34);
    font-weight: bold;
  }
  .cards {
    max-height: 70vh;
    overflow-y: scroll;
  }
}
.hide-card {
  display: none;
}
.archive {
    padding-top: 70px;
}
</style>
