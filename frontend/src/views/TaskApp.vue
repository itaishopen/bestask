<template>
  <section>
    <img v-if="!boards" class="loading" src="../../img/0_D1icAJvr19HzVBd6.gif" alt="fun">

    <div class="task-app task-wrapper collection" v-if="boards">
      <h1 class="title-board-prev">My Boards:</h1>
      <div class="board-flex">
        <div
          class="collection-item"
          v-for="board in boards"
          :key="board._id"
          :style="{ background: board.prefs.bgColor.color }"
        >
          <board-preview class="board-preview" :board="board"></board-preview>
        </div>
        <div
          class="collection-newItem"
          v-bind:class="{ 'collection-newItem-active': isNewBoard }"
          v-on:click="isNewBoard = true;"
        >
          <h1 class="collection-title" v-show="!isNewBoard">Create a board...</h1>
          <input
            class="collection-addBoard"
            v-model="newBoardTitle"
            v-on:keyup.enter.prevent="createNewBoard()"
            placeholder="Create a board..."
            v-show="isNewBoard"
          >
          <div class="collection-options" v-show="isNewBoard">
            <button class="Button" v-on:click.stop="createNewBoard()">Save</button>
            <svg class="Cancel" v-on:click.stop="isNewBoard = !isNewBoard">
              <line x1="0" y1="0" x2="15" y2="15"></line>
              <line x1="0" y1="15" x2="15" y2="0"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BoardPreview from "../components/BoardPreview.vue";
import BoardService from "../services/BoardService";

// import CardEdit from '@/views/CardEdit.vue';

export default {
  name: "TaskApp",
  data() {
    return {
      isNewBoard: false,
      newBoardTitle: ""
    };
  },
  created() {
    //todo chek in sesion
    let user = { _id: "guest" };
    if (this.$store.getters.isUserLoggedIn) user = this.$store.getters.loggedInUser;
    this.$store.dispatch({ type: "updateUser", userId: user._id });
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards;
    }
  },
  methods: {
    createNewBoard() {
      var newBoard = BoardService.getEmptyBoard();
      newBoard.title = this.newBoardTitle;
      if (newBoard.title.length > 0) {
        var user = this.$store.getters.loggedInUser;
        if (user._id) {
          newBoard.members.push(user._id);
        } else {
          newBoard.members.push("guest");
        }
        this.$store.dispatch({ type: "saveBoard", board: newBoard })
          .then(board => this.$router.push(`/board/${board._id}`));
        this.newBoardTitle = "";
      }
    },
    activateNewBoard() {
      if (!this.isNewBoard) {
        this.isNewBoard = true;
      }
    }
  },
  components: {
    BoardPreview
  }
};
</script>

<style lang='scss' scoped>
.collection {
  padding-top: 70px;
  overflow-y: scroll;
  height: calc(100vh - 70px);
}
.title-board-prev {
  margin: 26px;
  font-family: Raleway-Regular, "Open Sans", sans-serif;
  font-size: 30px;
}
.board-flex {
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  // &.board-flex {
  //   display: flex;
  //   flex-direction: row;
  //   // flex-wrap: wrap;
  // }
  .board-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    width: 250px;
    & :hover {
      // background-color: #ffffff1f;
    }
  }
  & .collection-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 20px 20px 0;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.3s;
  }
  & .collection-addBoard {
    font-family: Raleway-Regular, "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #4d4d4d;
    margin: 0;
    padding: 7px;
    border: 0;
    outline: 0;
    border-radius: 3px;
    background-color: #ffffff;
    border: 1px solid rgb(73, 73, 73);
  }
  & .collection-options {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 10px auto;
    .Button {
      font-size: 17px;
      font-weight: bold;
      color: rgb(73, 73, 73);
      border: none;
      border-radius: 5px;
      padding: 4px 18px;
      margin: 0 auto;
      transition: 0.4s;
      border: 1px solid rgb(73, 73, 73);
      &:hover {
        border: 1px solid rgb(24, 24, 24);
        color: rgb(24, 24, 24);
      }
    }
  }
  & .collection-newItem {
    // display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    margin: 0 20px 20px 0;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 2% 10px 2%;
    width: 250px;
    background-color: #cdd2d4;
    font-family: Raleway-Regular, "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 21px;
    color: #4d4d4d;
    &:hover {
      background-color: #b6bbbf;
    }
    .collection-title {
      margin: 0 auto;
      line-height: 70px;
    }
  }
  & .collection-newItem-active {
    background-color: #cdd2d4 !important;
    &:hover {
      background-color: #cdd2d4 !important;
    }
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


