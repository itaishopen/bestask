<template>
  <section class="board">
    <header class="nav-board">
      <div class="board-title" v-if="!isChangeTitle" @click="choseTitle">{{board.title}}</div>
      <form v-if="isChangeTitle" @submit="changeTitle" class="form-add">
        <div class="title-input-container">
          <input
            class="input-title-board"
            ref="title"
            v-model="board.title"
            placeholder="Enter title here..."
            autofocus
          >
          <button class="btn-title-board" type="submit">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </form>
      <!-- <b-navbar toggleable type="light" variant="light" class="navbar">
        <b-navbar-toggle target="nav_text_collapse" />
        <b-navbar-brand>Menu</b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
          <b-navbar-nav class="navbar-text">
            <b-nav-text>
              <router-link :to="'/board/' + board._id + '/archive'">
                <b-button variant="link">Archived items</b-button>
              </router-link>
            </b-nav-text>
            <b-nav-text>
              <b-button variant="link" v-on:click="toggleActivity">Show Activities</b-button>
              <activities v-if="showAtivities" :board="board"></activities>
            </b-nav-text>
          </b-navbar-nav>
        </b-collapse> 
      </b-navbar>-->
    </header>
    <main>
      <ul class="board-list-ul">
        <draggable
          v-model="lists"
          v-bind="dragOptions"
          @start="drag=true"
          @end="endMoveList"
          :move="moveList"
          class="draggable"
        >
          <li class="board-list-li" v-for="list in lists" :key="list._id">
            <list :list="list"/>
          </li>
        </draggable>
        <div class="create-list">
          <button v-if="!isAddListClick" class="create-list-title" @click="newList">
            Add new list
            <i class="fa fa-plus"></i>
          </button>

          <form
            v-if="isAddListClick"
            @submit.prevent="addList"
            class="create-list-input form-add-list"
          >
            <div>
              <input class="input-new-list" v-model="list.title" placeholder="Enter title here...">
            </div>
            <div class="container-add-list-btns">
              <button class="create-list-options list-new-list-options" type="submit">
                <i class="fa fa-plus"></i>
              </button>
              <button class="list-x-list-options" @click="closeAdd">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </form>
        </div>
      </ul>
      <card-edit v-if="showModal" ref="card">
        <router-view name="Card Edit"/>
      </card-edit>
    </main>
  </section>
</template>

<script>
import CardService from "../services/CardService.js";
import CardEdit from "../views/CardEdit.vue";
import ListService from "../services/ListService.js";
import ActivityService from "../services/ActivityService.js";
import SocketService from "../services/SocketService.js";
import list from "./List.vue";
import Activities from "./Activities.vue";

import draggable from "vuedraggable";
import moment from "moment";

export default {
  name: "board",

  data() {
    return {
      isAddListClick: false,
      isChangeTitle: false,
      showModal: this.$route.meta.showModal,
      showAtivities: false,
      boardId: this.$route.params.boardId
    };
  },
  created() {
    SocketService.init(this.boardId);
    this.$store.dispatch({ type: "loadBoard", boardId: this.boardId });
  },
  components: {
    list,
    draggable,
    CardEdit,
    Activities
  },

  computed: {
    board() {
      if (this.$store.getters.getBoard) {
        return this.$store.getters.getBoard;
      }
      return this.$store
        .dispatch({ type: "loadBoard", boardId: this.boardId })
        .then(board => board);
    },
    lists: {
      get() {
        return this.$store.getters.getLists;
      },
      set(lists) {
        this.$store.commit("setLists", { lists: lists });
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "lists",
        disabled: false,
        ghostClass: "ghost",
        delay: 3,
        touchStartThreshold: 1,
        // draggable: "list"
      };
    }
  },

  methods: {
    fun(boardId) {
      this.$store.dispatch({ type: "loadBoard", boardId });
    },
    newList() {
      //  todo: add list
      this.list = ListService.getEmptyList();
      this.isAddListClick = !this.isAddListClick;
    },
    closeAdd() {
      this.isAddListClick = !this.isAddListClick;
    },
    addList() {
      this.list.boardId = this.board._id;
      this.list.order = this.lists.length + 1;
      this.$store
        .dispatch({ type: "saveNewList", list: this.list })
        .then(savedList => {
          let activity = ActivityService.getEmptyActivity();
          activity.text = " added a new list to ";
          activity.userId = this.$store.getters.loggedInUser._id;
          activity.boardId = this.board._id;
          activity.listId = savedList._id;
          activity.createdAt = moment(Date.now()).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          this.$store.dispatch({ type: "saveActivity", activity });
          SocketService.send(this.board._id);
        });
      this.isAddListClick = !this.isAddListClick;
    },
    choseTitle() {
      console.log("this.board", this.board);
      // console.log( this.isChangeTitle , this.board , 'title');
      this.isChangeTitle = !this.isChangeTitle;
    },
    changeTitle() {
      console.log("this.board", this.board);
      this.$store
        .dispatch({ type: "saveBoard", board: this.board })
        .then(() => SocketService.send(this.board._id));
      this.isChangeTitle = !this.isChangeTitle;
      console.log("this.isChangeTitle after change", this.isChangeTitle);
    },
    moveList(evt) {
      // console.log(evt);
    },
    endMoveList(evt) {
      for (var i = 0; i < this.lists.length; i++) {
        this.lists[i].order = i;
      }
      this.$store
        .dispatch({ type: "updateLists", lists: this.lists })
        .then(() => {
          SocketService.send(this.board._id);
        });
    },
    toggleActivity() {
      this.showAtivities = !this.showAtivities;
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
.board {
  display: flex;
  flex-direction: column;
}
.board-list-ul {
  margin-top: 50px;
}
.nav-board {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
}
.board-title {
  width: 200px;
  cursor: pointer;
  display: flex;
  padding: 15px;
  font-family: Lato_bold;
  font-size: 20px;
}
.title-input-container {
  display: flex;
  flex-direction: row;
}
.input-title-board {
  font-size: 18px;
  font-weight: bold;
  height: 32px;
  width: 300px;
  border: none;
  background: rgba(255, 255, 255, 0.911);
  padding-left: 10px;
}
.btn-title-board {
  background: rgba(255, 255, 255, 0.911);
  border: none;
}
.board-list-li {
  min-height: 20vh;
  max-height: 80vh;
  min-width: 280px;
  /* max-height: 100vh; */
  // background-color: rgb(235, 235, 235);
  // border: 1px solid rgb(206, 206, 206);
  // border-radius: 8px;
  // margin: 0px 5px;
}
.board-list-ul {
  /* margin: 0 auto; */
  width: min-content;

  background-color: rgb(255, 255, 255);
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.create-list-title {
  min-width: 280px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.075);
  border: none;
  font-size: 20px;
  color: rgb(82, 82, 82);
  display: flex;
  justify-content: center;
}
.create-list-title:hover {
  color: rgb(22, 22, 22);
}

.form-add-list {
  background-color: rgba(255, 255, 255, 0);
  display: flex;
}
.list-add-list {
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
.form-add-list {
  width: 270px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ebebeb;
  border: 1px solid #cecece;
  border-radius: 8px;
  margin: 0 3px;
}
.input-new-list {
  min-width: 264px;
  height: 40px;
  border: none;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  padding: 5px;
  margin-top: 10px;
  box-shadow: 0px 5px 6px -4px rgba(0, 0, 0, 0.4);
  border-bottom: 0.9px solid rgb(167, 165, 165);
}
.container-list-card-btns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.list-add-list:hover {
  background-color: rgba(199, 199, 199, 0);
  color: rgb(0, 0, 0);
}
.list-new-list-options {
  background-color: rgb(51, 236, 66);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px 18px;
  margin: 0 3px;
}
.list-x-list-options {
  background-color: rgb(236, 51, 51);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px 18px;
  margin: 0 3px;
}
.fa-times {
  color: rgb(255, 255, 255);
}
.fa-plus {
  color: rgb(0, 0, 0);
}

.draggable {
  display: flex;
  flex-direction: row;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.navbar {
  width: 350px;
  position: absolute;
  z-index: 1;
}
.navbar-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.container-add-list-btns {
  .fa-plus {
    color: rgb(255, 255, 255);
  }
}
</style>