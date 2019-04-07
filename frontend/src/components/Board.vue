<template>
  <section>
    <img v-if="!board" class="loading" src="../../img/0_D1icAJvr19HzVBd6.gif" alt="fun">
    <div
      v-if="board"
      class="board"
      :style="{ 'background': board.prefs.bgColor.color}"
      @click="closeEditTitle"
    >
      <header class="nav-board">
        <div class="nav-board-left">
          <div class="board-title" v-if="!isChangeTitle" @click.stop="choseTitle">{{board.title}}</div>
          <input
            @keyup.enter.enter="closeEditTitle"
            @click.stop="choseTitle"
            value="board.title"
            v-if="isChangeTitle"
            class="input-title-board"
            ref="title"
            v-model="board.title"
            placeholder="Enter title here..."
            autofocus
          >
          <section class="container-member" @click.stop="toggleModalMember" v-if="board.users">
            <div v-for="user in board.users.slice(0, 2)" :key="user._id">
              <div class="container-name-member">
                <div class="logo-user-name">{{user.firstName[0]}}{{user.lastName[0]}}</div>
              </div>
            </div>
            <div
              class="logo-user-name logo-user-more"
              v-if="checkSumMember()"
            >{{board.users.length-2}}</div>
          </section>
          <transition name="slide-fade">
            <div class="member-modal" v-show="showModalMember">
              <button @click="toggleModalMember" class="menu-close-btn">
                <i class="fas fa-times" style="color:#000000;"></i>
              </button>
              <h1>members</h1>
            </div>
          </transition>
        </div>
        <b-button class="menu-btn" v-show="!showMenu" variant="link" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </b-button>
      </header>
      <main>
        <transition name="slide">
          <div class="menu-modal" v-show="showMenu">
            <button @click="toggleMenu" class="menu-close-btn">
              <i class="fas fa-times" style="color:#000000;"></i>
            </button>
            <h1>Menu</h1>
            <hr class="divider">
            <div>
              <b-button variant="link" v-on:click="toggleColorBoard">
                <span v-if="showColorBoard">Hide preferences</span>
                <span v-else>Show preferences</span>
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
                <div class="color color959595" @click="paintBoard('#959595')"></div>
                <div class="color colorfffd6c" @click="paintBoard('#fffd6c')"></div>
              </div>
            </div>
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
                <input
                  class="input-new-list"
                  v-model="list.title"
                  placeholder="Enter title here..."
                >
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
    </div>
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
      showModalMember: false,
      showAtivities: false,
      showColorBoard: false,
      boardId: this.$route.params.boardId
    };
  },
  created() {
    SocketService.init(this.boardId);
    this.$store.dispatch({ type: "resetBoard", isReset: true });
    this.$store.dispatch({ type: "loadBoard", boardId: this.boardId });
  },
  components: {
    list,
    draggable,
    CardEdit,
    Activities
  },

  computed: {
    board: {
      get() {
        return this.$store.getters.getBoard;
      },
      set(sevedBoard) {
        this.$store.commit("setBoard", { board: sevedBoard });
      }
    },
    lists: {
      get() {
        return this.$store.getters.getLists;
      },
      set(lists) {
        this.$store.dispatch("updateLists", lists);
      }
    },
    dragOptions() {
      return {
        animation: 150,
        group: "lists",
        disabled: false,
        draggable: ".board-list-li",
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    openModalMember() {
      console.log("modal member");
    },
    newList() {
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
      this.isChangeTitle = true;
      this.$store.commit("setIsEditMode", { isEditMode: true });
    },
    closeEditTitle() {
      console.log("board click");

      this.isChangeTitle = false;
      this.showModalMember = false;
      this.$store
        .dispatch({ type: "saveBoard", board: this.board })
        .then(() => SocketService.send(this.board._id));
      this.isChangeTitle = false;
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
        .then(() => SocketService.send(this.board._id));
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
    toggleModalMember() {
      this.showModalMember = !this.showModalMember;
    },
    paintBoard(color) {
      this.board.prefs.bgColor.color = color;
      this.showColorBoard = !this.showColorBoard;
      this.showMenu = !this.showMenu;
      this.$store
        .dispatch({ type: "saveBoard", board: this.board })
        .then(() => SocketService.send(this.board._id));
    },
    checkSumMember() {
      if (this.board.users.length > 2) {
        return true;
      }
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
  padding-top: 50px;
  height: 100vh;
  width: 100%;
  display: inline-table;
  flex-direction: column;
}
.board-list-ul {
  margin-top: 60px;
}
.nav-board {
  background: rgba(0, 0, 0, 0.24);
  color: white;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 50px;
  .nav-board-left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.board-title {
  width: 200px;
  cursor: pointer;
  display: flex;
  padding: 15px;
  font-family: Lato_bold;
  font-size: 20px;
  margin-left: 10px;
}

.input-title-board {
  font-size: 20px;
  font-weight: bold;
  height: 32px;
  width: 200px;
  border: none;
  background: transparent;
  padding-left: 15px;
  margin-left: 10px;
  font-family: Lato_bold;
}

.container-member {
  display: grid;
  grid-template-columns: repeat(4, [col] 30px);
  grid-template-rows: repeat(1, [row] auto);
  justify-content: space-between;
  border-radius: 12px;
  padding: 5px;
  margin: 5px;
  .logo-user-name {
    font-size: 13px;
    font-weight: bold;
    min-width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    color: black;
    background-color: rgb(223, 223, 223);
    justify-content: flex-start;
  }
  .logo-user-more {
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(82, 82, 82);
  }

  .container-name-member {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .nav-board-left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
.menu-btn {
  margin-right: 10px;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.116);
  color: rgb(255, 255, 255);
  border: 2px solid rgb(75, 75, 75);
  border-radius: 5px;
  padding: 4px 18px;
  transition: 0.3s;
  &:hover {
    background-color: rgba(241, 241, 241, 0.308);
    color: rgb(255, 255, 255);
    border: 2px solid rgb(0, 0, 0);
  }
}

.board-list-ul {
  margin-top: 60px;
  width: min-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .draggable {
    display: flex;
    flex-direction: row;
    .board-list-li {
      height: 100%;
      min-width: 280px;
    }
  }
  .create-list-title {
    min-width: 280px;
    padding: 0 3px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.075);
    border: none;
    font-size: 20px;
    color: rgb(82, 82, 82);
    display: flex;
    justify-content: center;
    &:hover {
      color: rgb(22, 22, 22);
    }
    .fa-plus {
      color: rgb(0, 0, 0);
    }
  }
  .form-add-list {
    min-width: 280px;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    height: 100px;
    flex-direction: column;
    justify-content: space-around;
    background-color: #ebebeb;
    border: 1px solid #cecece;
    border-radius: 8px;
    margin: 0 3px;
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
    .container-add-list-btns {
      .list-new-list-options {
        background-color: rgb(51, 236, 66);
        color: rgb(255, 255, 255);
        border: none;
        border-radius: 5px;
        padding: 8px 18px;
        margin: 0 3px;
        .fa-plus {
          color: rgb(255, 255, 255);
        }
      }
      .list-x-list-options {
        background-color: rgb(236, 51, 51);
        color: rgb(255, 255, 255);
        border: none;
        border-radius: 5px;
        padding: 8px 18px;
        margin: 0 3px;
        .fa-times {
          color: rgb(255, 255, 255);
        }
      }
    }
  }
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
.menu-modal {
  display: flex;
  position: fixed;
  top: 50px;
  right: -5px;
  flex-direction: column;
  width: 340px;
  max-height: calc(100vh - 87px);
  background-color: #ebebeb;
  border: 1px solid #cecece;
  margin: 0px 5px;
  z-index: 500;
  min-height: 10px;
  .menu-close-btn {
    outline: none;
    border: none;
    align-self: flex-end;
    background-color: #ebebeb;
  }
}

.slide-enter-active {
  transition: all 0.2s ease;
}
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(340px);
}

.member-modal {
  display: flex;
  position: fixed;
  top: calc(50vh - 150px);
  right: calc(50vw - 200px);
  flex-direction: column;
  width: 400px;
  height: 300px;
  max-height: calc(100vh - 87px);
  background-color: #ffffff;
  border: 1px solid #000000;
  margin: 0px 5px;
  z-index: 500;
  min-height: 10px;
  .menu-close-btn {
    outline: none;
    border: none;
    align-self: flex-end;
    background-color: #ffffff;
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50vh);
  opacity: 0;
}
.activities {
  overflow: auto;
  max-height: calc(90vh - 190px);
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
  .color959595 {
    background-color: #959595;
  }
  .color6ce9ff {
    background-color: #6ce9ff;
  }
  .color6f6cff {
    background-color: #6f6cff;
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

