<template>
  <section class="task-app task-wrapper Collection" v-if="boards">
    <h1>My Boards:</h1>
    <div class="board-flex">
      <div
        class="Collection_item"
        v-for="board in boards"
        :key="board._id"
        :style="{ background: board.prefs.bgColor.color }"
      >
        <board-preview :board="board"></board-preview>
      </div>
      <div
        class="Collection_newItem"
        v-bind:class="{ 'Collection_newItem-active': isNewBoard }"
        v-on:click="isNewBoard = true;"
      >
        <h1 class="Collection_title" v-show="!isNewBoard">Create a board...</h1>
        <input
          class="Collection_addBoard"
          v-model="newBoardTitle"
          v-on:keyup.enter.prevent="createNewBoard()"
          placeholder="Create a board..."
          v-show="isNewBoard"
        >
        <div class="Collection_options" v-show="isNewBoard">
          <button class="Button" v-on:click.stop="createNewBoard()">Save</button>
          <svg class="Cancel" v-on:click.stop="isNewBoard = !isNewBoard">
            <line x1="0" y1="0" x2="15" y2="15"></line>
            <line x1="0" y1="15" x2="15" y2="0"></line>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BoardPreview from '../components/BoardPreview.vue';
import BoardService from '../services/BoardService'
// import CardEdit from '@/views/CardEdit.vue';


export default {
  name: 'TaskApp',
  data() {
    return {
      isNewBoard: false,
      newBoardTitle: '',
    };
  },
  created() {
    this.$store.dispatch({ type: 'updateUser', userId: 'guest' })
  },
  computed: {
    boards() {
      return this.$store.getters.getboards;
    }

  },
  methods: {
    createNewBoard() {
      var newBoard = BoardService.getEmptyBoard()
      newBoard.title = this.newBoardTitle;
      if (newBoard.title.length > 0) {
        var user = this.$store.getters.loggedInUser
        if (user._id) {
          newBoard.members.push(user._id)
        } else {
          newBoard.members.push('guest')
        }
        this.$store.dispatch({ type: 'saveBoard', board: newBoard })
          .then(board => {
            console.log(board);

            this.$router.push(`/board/${board._id}`)
          })
        this.newBoardTitle = '';

      }
    },
    activateNewBoard() {
      if (!this.isNewBoard) {
        this.isNewBoard = true;
      }
    },
  },
  components: {
    BoardPreview,
  },

};
</script>

<style lang='scss' scoped>
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
  & .Collection_item {
    display: block;
    position: relative;
    height: 85px;
    margin: 0 20px 20px 0;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 2% 10px 2%;
    width: 250px;
    // background-color: #026aa7;
  }
  & .Collection_item:hover {
    background-color: #055a8c;
  }
  & .Collection_addBoard {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #4d4d4d;
    margin: 0;
    padding: 7px;
    border: 0;
    outline: 0;
    border-radius: 3px;
    background-color: #ffffff;
  }
  & .Collection_options {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 10px auto;
  }
  & .Collection_newItem {
    height: 85px;
    margin: 0 20px 20px 0;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 2% 10px 2%;
    width: 250px;
    background-color: #cdd2d4;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #4d4d4d;
    &:hover {
      background-color: #b6bbbf;
    }
  }
  & .Collection_newItem-active {
    background-color: #cdd2d4 !important;
    &:hover {
      background-color: #cdd2d4 !important;
    }
  }
}
</style>
