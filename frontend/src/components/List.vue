<template>
  <section class="list">
    <div class="title-list" v-if="!isChangeTitle" @click.prevent="choseTitle">{{list.title}}</div>
    <form v-if="isChangeTitle" @submit.prevent="changeTitle" class="form-add">
      <input
        class="input-title-list"
        ref="title"
        v-model="list.title"
        placeholder="Enter title here..."
        autofocus
      >
      <button class="btn-title-list" type="submit">
        <i class="fa fa-plus"></i>
      </button>
    </form>
    <draggable
      class="list-group-top"
      v-model="listArray[0].cards"
      v-bind="dragOptions"
      group="lists"
      :key="list._id"
      :animated="100"
    >
      <draggable
        class="listgroup"
        :class="list._id"
        v-model="list.cards"
        v-bind="dragOptions"
        group="cards"
        @start="drag=true"
        @end="funToMove"
      >
        <div v-for="card in list.cards" :key="card._id" class="card" :class="card._id">
          <card-preview class="drag-me" v-if="!card.archived" :card="card"></card-preview>
        </div>
      </draggable>
    </draggable>
    <button class="list-add-card" v-if="!isAddClick" @click="newCard">
      Add card
      <i class="fa fa-plus"></i>
    </button>
    <form v-if="isAddClick" @submit.prevent="addCard" class="list-add-card form-add-card">
      <div>
        <textarea class="text-area" v-model="card.title" placeholder="Enter text here..." autofocus></textarea>
      </div>
      <div class="container-add-card-btns">
        <button class="list-new-card-options" type="submit">Add card</button>
        <button class="list-x-card-options" @click="closeAdd">&times;</button>
      </div>
    </form>
  </section>
</template>
<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
import draggable from "vuedraggable";
import ListService from "../services/ListService.js";
import ActivityService from "../services/ActivityService.js";
import SocketService from "../services/SocketService.js";
import moment from "moment";

export default {
  name: "list",
  props: ["list"],
  data() {
    return {
      listArray: [this.list],
      isAddClick: false,
      isChangeTitle: false,
      hasfocus: false,
    }
  },
  components: {
    CardPreview,
    draggable,

  },
  methods: {
    funToMove(env) {
      var fromListId = env.from.className.split(" ")[1];
      var toListId = env.to.className.split(" ")[1];
      var cardId = env.item.className.split(" ")[1];
      var newIdx = env.newIndex;
      var oldIdx = env.oldIndex;
      var fromList = this.$store.getters.getLists.find(
        list => list._id === fromListId
      );
      if (fromListId !== toListId) {
        var toList = this.$store.getters.getLists.find(
          list => list._id === toListId
        );
        var card = toList.cards.find(card => card._id === cardId);
        card.listId = toListId;
        for (var i = 0; i < toList.cards.length; i++) {
          toList.cards[i].order = i;
        }
        for (var j = 0; j < fromList.cards.length; j++) {
          fromList.cards[j].order = j;
        }
        this.$store.dispatch({ type: "saveList", list: toList }).then(() => {
          this.$store
            .dispatch({ type: "saveList", list: fromList })
            .then(() => {
              SocketService.send(this.list.boardId);
            });
        });
      } else {
        for (var k = 0; k < fromList.cards.length; k++) {
          fromList.cards[k].order = k;
        }
        this.$store.dispatch({ type: "saveList", list: fromList }).then(() => {
          SocketService.send(this.list.boardId);
        });
      }
    },
    newCard() {
      console.log('new card', this.card)
      console.log((this.card.order = this.list.cards.length + 1))
      this.isAddClick = !this.isAddClick
    },
    closeAdd() {
      this.isAddClick = !this.isAddClick;
    },
    addCard() {
      this.card.listId = this.list._id
      this.card.order = this.list.cards.length
      this.$store
        .dispatch({ type: "saveCardToList", card: this.card })
        .then(card => {
          var boardId = this.list.boardId;
          let activity = ActivityService.getEmptyActivity();
          activity.text = " added a new card to list ";
          activity.userId = this.$store.getters.loggedInUser._id;
          activity.boardId = boardId;
          activity.listId = this.list._id;
          activity.cardId = card._id;
          activity.createdAt = moment(Date.now()).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          this.$store.dispatch({ type: "saveActivity", activity });
          var cardItem = CardService.getEmptyCard();
          this.$store.commit("setCard", { card: cardItem });
          this.$store.dispatch({ type: "loadBoard", boardId });
          SocketService.send(boardId);
        });
      this.isAddClick = !this.isAddClick;
    },
    choseTitle() {
      console.log("isChangeTitle", this.isChangeTitle);
      this.isChangeTitle = !this.isChangeTitle;
    },
    changeTitle() {
      console.log("this.list", this.list);
      this.$store.dispatch({ type: "saveList", list: this.list });
      this.isChangeTitle = !this.isChangeTitle;
      SocketService.send(this.list.boardId);
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
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    checkList() {
      if (!this.list.cards) {
        this.list.cards = [{ _id: "fun" }];
      }
      return this.list.cards;
    }
  },

  created() {
    var cardItem = CardService.getEmptyCard()
    this.$store.commit('setCard', { card: cardItem })
  },
  watch: {

  }
};
</script>

<style lang='scss' scoped>
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
.list-cards {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-add {
  background-color: rgba(255, 255, 255, 0);
  display: flex;
}
.list-add-card {
  padding: 10px 0;
  width: 270px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 20px;
  color: rgb(82, 82, 82);
  border-radius: 7px;
  transition: 0.3s;
}
.form-add-card {
  width: 270px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px;
}
.text-area {
  min-width: 270px;
  height: 80px;
  border: none;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  padding: 5px;
  margin-top: 10px;
}
.container-add-card-btns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.list-add-card:hover {
  background-color: rgba(199, 199, 199, 0);
  color: rgb(0, 0, 0);
}
.list-new-card-options {
  background-color: rgb(51, 236, 66);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 0 3px;
}
.list-x-card-options {
  background-color: rgba(51, 236, 66, 0);
  border: none;
  width: 20px;
}
.input-title-list {
  font-size: 18px;
  font-weight: bold;
  height: 32px;
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.911);
  padding-left: 10px;
}
.btn-title-list {
  background: rgba(255, 255, 255, 0.911);
  border: none;
}
.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}
.fun-drag {
  min-height: 50px;
}
.list-group {
  min-height: 50px;
}
</style>