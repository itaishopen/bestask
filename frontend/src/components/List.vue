<template>
  <section class="list">
    <div class="title-list">{{currList.title}}</div>
    <ul class="list-cards">
      <li v-for="card in currList.cards" :key="card._id">
        <card-preview :card="card"></card-preview>
      </li>
    </ul>
    <button class="new-card-btn" v-if="!isAddClick" @click="newCard">add card</button>
    <form v-if="isAddClick" @submit.prevent="addCard" class="form-add">
      <button @click="closeAdd">&times;</button>
      <textarea v-model="cardTitle.title" placeholder="Enter text here..."></textarea>
      <button type="submit"><i class="fa fa-plus"></i></button>
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
      cardTitle: null,
      currList: null
    };
  },
  components: {
    CardPreview
  },
  methods: {
    newCard() {
      this.cardTitle = CardService.getEmpty();
      console.log("new card", this.cardTitle);
      console.log(
        this.currList.cards[this.currList.cards.length - 1].order + 1
      );
      this.isAddClick = !this.isAddClick;
    },
    closeAdd() {
      this.isAddClick = !this.isAddClick;
    },
    addCard() {
      this.cardTitle.listId = this.currList._id;
      (this.cardTitle.order =
        this.currList.cards[this.currList.cards.length - 1].order + 1),
        this.$store.dispatch({ type: "addItem", item: this.cardTitle });

      this.isAddClick = !this.isAddClick;
    }
  },
  computed: {},
  created() {
    this.currList = this.list;
  },
  watch: {
    currList: function() {
      console.log("change in list");
      this.currList = this.list;
    }
  }
};
</script>

<style>
.title-list {
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
  border: 1px black solid;
}
.new-card-btn {
  width: 200px;
    height: 30px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 20px;
  border: 1px solid rgb(82, 82, 82);
  color: rgb(82, 82, 82);
  border-radius: 7px;
}
.new-card-btn:hover {
  background-color: rgba(255, 255, 255, 0.849);
  border: 1px solid rgb(0, 0, 0);
  color: rgb(0, 0, 0);
}
</style>
