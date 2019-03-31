<template>
  <section class="board" :style="{ background: board.prefs.bgColor.color}">
    <header class="nav-board" :style="{ background: board.prefs.bgColor.color}">
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
      <b-button class="menu-btn" v-show="!showMenu" variant="link" v-on:click="toggleMenu">Show Menu</b-button>
    </header>
    <main>
      <transition name="slide">
        >
        <div class="menu-modal" v-show="showMenu">
          <button v-on:click="toggleMenu" class="menu-close-btn">
            <i class="fas fa-times" style="color:#000000;"></i>
          </button>
          <h1>Menu</h1>
          <hr class="divider">
          <div>
            <router-link :to="'/board/' + board._id + '/archive'">
              <b-button variant="link">Archived items</b-button>
            </router-link>
          </div>
          <div>
            <b-button variant="link" v-on:click="toggleActivity">
              <span v-if="showAtivities">Hide Activities</span>
              <span v-else>Show Activities</span>
            </b-button>
            <activities v-if="showAtivities" :board="board" class="activities"></activities>
          </div>
          <div>
            <b-button variant="link" v-on:click="toggleColorBoard">
              <span v-if="showColorBoard">Hide painting board</span>
              <span v-else>Show painting board</span>
            </b-button>
            <div v-if="showColorBoard" class="ColorBoard">
              <div class="color color1dc78e" @click="paintBoard('#1dc78e')"></div>
              <div class="color colore06bfd" @click="paintBoard('#e06bfd')"></div>
              <div class="color color83d8ff" @click="paintBoard('#83d8ff')"></div>
              <div class="color colorf5cf66" @click="paintBoard('#f5cf66')"></div>
              <div class="color colorffffff" @click="paintBoard('#ffffff')"></div>
              <div class="color colorf566ca" @click="paintBoard('#f566ca')"></div>
              <div class="color colorff8383" @click="paintBoard('#ff8383')"></div>
              <div class="color color78ff6c" @click="paintBoard('#78ff6c')"></div>
              <div class="color color6f6cff" @click="paintBoard('#6f6cff')"></div>
              <div class="color color6ce9ff" @click="paintBoard('#6ce9ff')"></div>
              <div class="color color383838" @click="paintBoard('#383838')"></div>
              <div class="color colorfffd6c" @click="paintBoard('#fffd6c')"></div>
            </div>
          </div>
        </div>
      </transition>
      <ul class="board-list-ul">
        <draggable v-model="lists" v-bind="dragOptions" @end="endMoveList" class="draggable">
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
      showMenu: false,
      showAtivities: false,
      showColorBoard: false,
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
        animation: 150,
        group: "lists",
        disabled: false,
        draggable: ".board-list-li",
        // filter: ".no-drag",
        ghostClass: "ghost",
        // delay: 3,
        // forceFallback: true,
        // fallbackTolerance: 1,
        // delay: 3,
        // touchStartThreshold: 1,
        // draggable: ".drag-me .list"
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
    },
    toggleColorBoard() {
      this.showColorBoard = !this.showColorBoard;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    paintBoard(color) {
      console.log("this.board", this.board);
      this.board.prefs.bgColor.color = color;
      this.board.prefs.bgColor.color = color;
      this.showColorBoard = !this.showColorBoard;
      this.showMenu = !this.showMenu;
      this.$store
        .dispatch({ type: "saveBoard", board: this.board })
        .then(() => SocketService.send(this.board._id));
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
  width: auto;
  height: calc(100vh - 85px);
  display: inline-block;
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
  // min-height: 20vh;
  height: 100%;
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

  // background-color: rgb(255, 255, 255);
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

.container-add-list-btns {
  .fa-plus {
    color: rgb(255, 255, 255);
  }
}
.menu-close-btn {
  outline: none;
  border: none;
  align-self: flex-end;
  background-color: #ebebeb;
}
.menu-btn {
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.116);
  color: rgb(75, 75, 75);
  border: 2px solid rgb(75, 75, 75);
  border-radius: 5px;
  padding: 8px 18px;
  transition: 0.3s;
  &:hover{
    background-color: rgba(255, 255, 255, 0.308);
    color: rgb(236, 236, 236);
    border: 2px solid rgb(236, 236, 236);
    
  }
}
.menu-modal {
  display: flex;
  position: fixed;
  top: 70px;
  right: -5px;
  flex-direction: column;
  width: 340px;
  max-height: calc(100vh - 110px);
  background-color: #ebebeb;
  border: 1px solid #cecece;
  // border-radius: 8px;
  margin: 0px 5px;
  z-index: 500;
  height: 100%;
}

.slide-enter-active {
  transition: all 0.2s ease;
  // transition: left 0.5s ease;
}
.slide-leave-active {
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition: all 0.2s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(340px);
  // opacity: 0;
}
.activities {
  overflow: auto;
  max-height: calc(90vh - 200px);
}
.divider {
  height: 1px;
  width: 340px;
}
.ColorBoard {
  border: 1px solid rgb(138, 138, 138);
  width: 90%;
  margin: 20px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .color {
    cursor: pointer;
    margin: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .color1dc78e {
    background-color: #1dc78e;
  }
  .colorf5cf66 {
    background-color: #f5cf66;
  }
  .color83d8ff {
    background-color: #83d8ff;
  }
  .colore06bfd {
    background-color: #e06bfd;
  }
  .colorffffff {
    background-color: #ffffff;
  }
  .colorf566ca {
    background-color: #f566ca;
  }
  .colorff8383 {
    background-color: #ff8383;
  }
  .color78ff6c {
    background-color: #78ff6c;
  }
  .colorfffd6c {
    background-color: #fffd6c;
  }
  .color383838 {
    background-color: #383838;
  }
  .color6ce9ff {
    background-color: #6ce9ff;
  }
  .color6f6cff {
    background-color: #6f6cff;
  }
}
</style>

