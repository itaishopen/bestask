<template class="everyCard">
  <section class="list slide">
    <header class="header title drag-me">
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
    </header>

    <main class="main items drag-me">
      <!-- <draggable
        class="list-group-top"
        :class="list._id"
        v-model="listArray[0].cards"
        v-bind="dragOptionsList"
        :key="list._id"
      >-->
      <draggable
        class="listgroup"
        :class="list._id"
        v-model="listArray"
        v-bind="dragOptionsCard"
        @end="funToMove"
      >
        <div
          v-for="card in list.cards"
          :key="card._id"
          class="card"
          :class="[card._id, card.archived ? 'hide-card' : '']"
        >
          <card-preview class="drag-me" v-if="!card.archived" :card="card"></card-preview>
        </div>
      </draggable>
      <!-- </draggable> -->
      <!-- <form v-if="isAddClick" @submit.prevent="addCard" class="list-add-card form-add-card">
        <div>
          <textarea
            class="text-area"
            v-model="card.title"
            placeholder="Enter title here..."
            autofocus
          ></textarea>
        </div>
        <div class="container-add-card-btns">
          <button class="list-new-card-options" type="submit">Add card</button>
          <button class="list-x-card-options" @click="closeAdd">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </form>-->
    </main>

    <footer class="footer">
      <button class="list-add-card" v-if="!isAddClick" @click="newCard()">
        Add card
        <i class="fa fa-plus"></i>
      </button>
      <form v-if="isAddClick" @submit.prevent="addCard" class="list-add-card form-add-card">
        <div>
          <textarea class="text-area" v-model="card.title" placeholder="Enter title here..."></textarea>
        </div>
        <div class="container-add-card-btns">
          <button class="list-new-card-options" type="submit">Add card</button>
          <button class="list-x-card-options" @click="closeAdd">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </form>
    </footer>
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
      listArray: this.cardList,
      isAddClick: false,
      isChangeTitle: false,
      hasfocus: false
    };
  },
  components: {
    CardPreview,
    draggable
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
        if (!card) {
          var card = fromList.cards.find(card => card._id === cardId);
          fromList.cards.splice(env.oldIndex, 1)
          toList.cards.splice(env.newIndex, 0, card)
        }
        card.listId = toListId;
        card.order = env.newIndex
        for (var i = 0; i < toList.cards.length; i++) {
          toList.cards[i].order = i;
        }
        for (var j = 0; j < fromList.cards.length; j++) {
          fromList.cards[j].order = j;
        }
        this.$store.dispatch({ type: "saveList", list: fromList })
        this.$store.dispatch({ type: "saveList", list: toList })
          .then(() => {
            SocketService.send(this.list.boardId);
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
      this.card = CardService.getEmptyCard()
      this.card.order = this.list.cards.length;
      this.isAddClick = !this.isAddClick;
    },
    closeAdd() {
      this.isAddClick = !this.isAddClick;
    },
    addCard() {
      this.card.listId = this.list._id;
      this.card.order = this.list.cards.length;
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
    cardList() {
      if (!this.list.cards && this.list.cards.length === 0) {
        this.list.cards = []
      }
      return this.list.cards
    },
    hideCard(card) {
      return card.archived ? "hide-card" : "";
    },
    card: {
      get() {
        return this.$store.getters.getCurrCard;
      },
      set(cardItem) {
        this.$store.commit("setCard", { card: cardItem });
      }
    },
    dragOptionsCard() {
      return {
        animation: 200,
        group: "cards",
        disabled: false,
        draggable: ".card",
        ghostClass: "ghost",
        delay: 1
      }
    },
  },

  created() {
    var cardItem = CardService.getEmptyCard();
    this.$store.commit("setCard", { card: cardItem });
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.hide-card {
  display: none;
}
.card {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
}
.list {
  max-height: 100%;
  background-color: #ebebeb;
  border: 1px solid #cecece;
  border-radius: 8px;
  margin: 0px 5px;
  .header {
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

    .input-title-list {
      font-size: 18px;
      font-weight: bold;
      height: 32px;
      width: 90%;
      border: none;
      border-top-left-radius: 7px;
      background: rgba(255, 255, 255, 0.911);
      padding-left: 10px;
    }
    .btn-title-list {
      border-top-right-radius: 7px;
      height: 32px;
      background: rgba(255, 255, 255, 0.911);
      border: none;
    }
  }
  .main {
    max-height: 60vh;
    overflow-y: scroll;
  }
  .footer {
    max-height: 200px;
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
      &:hover {
        color: rgb(0, 0, 0);
      }
      .fa-plus {
        color: rgb(48, 47, 47);
      }
    }
    .form-add-card {
      width: 270px;
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 3px;
      .text-area {
        min-width: 270px;
        height: 60px;
        border: none;
        resize: none;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 10px;
        padding: 5px;
        margin-top: 10px;
        line-height: 1.2em;
        box-shadow: 0px 5px 6px -4px rgba(0, 0, 0, 0.4);
        border-bottom: 0.9px solid rgb(167, 165, 165);
      }
      .container-add-card-btns {
        display: flex;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
        .list-new-card-options {
          font-size: 17px;
          font-weight: bold;
          background-color: rgb(51, 236, 66);
          color: rgb(255, 255, 255);
          border: none;
          border-radius: 5px;
          padding: 8px 18px;
          margin: 0 3px;
        }
        .list-x-card-options {
          background-color: rgb(236, 51, 51);
          border: none;
          border-radius: 5px;
          padding: 6.5px 18px;
          margin: 0 3px;
          .fa-times {
            color: rgb(255, 255, 255);
          }
        }
      }
    }
  }
}

.everyCard {
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.items::-webkit-scrollbar {
  width: 0.5em;
  height: 0.5em;
  background-color: #ebebeb;
}
.items::-webkit-scrollbar-thumb {
  background: rgb(206, 205, 205);
  -webkit-border-radius: 6px;
}
.items::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 6px;
}
.items::-webkit-scrollbar-button {
  -webkit-border-radius: 6px;
  background: #1900f8;
  display: block;
  height: 100%;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}
.fun-drag {
  min-height: 50px;
}
.list-group-top {
  min-height: 50px;
}
.listgroup {
  cursor: move;
  min-height: 50px;
}
</style>