<template>
  <section class="list">
    <div class="title-list" v-if="!isChangeTitle" @click.prevent="choseTitle">{{list.title}}</div>
    <form v-if="isChangeTitle" @submit.prevent="changeTitle" class="form-add">
      <input
        ref="title"
        v-if="isChangeTitle"
        v-model="list.title"
        placeholder="Enter title here..."
      >
      <button type="submit">
        <i class="fa fa-plus"></i>
      </button>
    </form>
    <ul class="list-cards">
      <li v-for="card in list.cards" :key="card._id">
        <card-preview v-if="!card.archived" :card="card"></card-preview>
      </li>
    </ul>
    <button class="new-card-btn" v-if="!isAddClick" @click="newCard">
      add card
      <i class="fa fa-plus"></i>
    </button>
    <form v-if="isAddClick" @submit.prevent="addCard" class="form-add">
      <!-- <div v-if="card"> -->
      <button @click="closeAdd">&times;</button>
      <textarea v-model="card.title" placeholder="Enter text here..."></textarea>
      <button type="submit">
        <i class="fa fa-plus"></i>
      </button>
      <!-- </div> -->
    </form>
  </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
export default {
  name: "list",
  props: ["list"],
  data() {
    return {
      isAddClick: false,
      isChangeTitle: false,
      hasfocus: false
    };
  },
  components: {
    CardPreview
  },
  methods: {
    newCard() {
      // this.cardTitle = CardService.getEmpty();
      console.log("new card", this.card);
      console.log((this.card.order = this.list.cards.length + 1));
      this.isAddClick = !this.isAddClick;
    },
    closeAdd() {
      this.isAddClick = !this.isAddClick;
    },
    addCard() {
      this.card.listId = this.list._id;
      // (this.card.order = this.list.cards[this.list.cards.length - 1].order + 1),
      this.card.order = this.list.cards.length + 1;
      this.$store.dispatch({ type: "saveCard", card: this.card }).then(() => {
        var cardItem = this.$store.getters.getEmptyCard;
        console.log(cardItem);

        this.$store.commit("setCard", { card: cardItem });
        var boardId = this.list.boardId;
        this.$store.dispatch({ type: "loadBoard", boardId });
      });
      this.isAddClick = !this.isAddClick;
    },
    choseTitle() {
      this.isChangeTitle = !this.isChangeTitle;
      console.log("isChangeTitle", this.isChangeTitle);
    },
    changeTitle() {
      console.log("this.list", this.list);
      this.$store.dispatch({ type: "saveList", list: this.list });
      this.isChangeTitle = !this.isChangeTitle;
    }
  },
  computed: {
    card: {
      get() {
        return this.$store.getters.getCurrCard;
      },
      set(cardItem) {
        this.$store.commit("setCard", { card: cardItem });
      }
    }
  },
  created() {
    var cardItem = JSON.parse(JSON.stringify(this.$store.getters.getEmptyCard));
    this.$store.commit("setCard", { card: cardItem });
    // this.currList = this.list;
  },
  watch: {
    board: function() {
      console.log("change in list");
      this.$store.dispatch({ type: "saveList", list: this.list });
    }
  }
};
</script>

<style>
.title-list {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  margin-top: 25px;
  font-size: 22px;
  color: black;
}
.list-cards {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-add {
  background-color: rgba(255, 255, 255, 0);
}
.new-card-btn {
  padding: 10px 0;
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 20px;
  color: rgb(82, 82, 82);
  border-radius: 7px;
}
.new-card-btn:hover {
  background-color: rgba(199, 199, 199, 0.699);
  color: rgb(0, 0, 0);
}
</style>
