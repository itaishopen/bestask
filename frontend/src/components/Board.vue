<template>
  <section class="board">
    <div class="board-title">{{board.title}}</div>
    <ul class="board-list-ul">
      <li class="board-list-li" v-for="list in lists" :key="list._id">
        <list :list="list"/>
      </li>
      <div class="create-list">
        <button v-if="!isAddListClick" class="create-list-title" @click="newList">
          new list
          <i class="fa fa-plus"></i>
        </button>

        <form v-if="isAddListClick" @submit.prevent="addList" class="create-list-input">
          <button @click="closeAdd">&times;</button>
          <textarea v-model="list.title" placeholder="Enter text here..."></textarea>
          <button class="create-list-options" type="submit">
            <i class="fa fa-plus"></i>
          </button>
        </form>
      </div>
    </ul>
  </section>
</template>

<script>
import CardService from "../services/CardService.js";
import ListService from "../services/ListService.js";
import ActivityService from "../services/ActivityService.js";
import list from "./List.vue";
export default {
  name: "board",
  props: ["board"],
  data() {
    return {
      isAddListClick: false
    };
  },
  components: {
    list
  },

  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },

  methods: {
    newList() {
      //  todo: add list
      console.log("new list");
      this.list = ListService.getEmptyList();
      this.isAddListClick = !this.isAddListClick;
      console.log(this.list, "list in new click");
    },
    closeAdd() {
      this.isAddListClick = !this.isAddListClick;
    },
    addList() {
      this.list.boardId = this.board._id;
      this.list.order = this.lists.length + 1;
      console.log(this.list, "list in add click");
      this.$store.dispatch({ type: "saveList", list: this.list }).then(savedList => {
        let activity = ActivityService.getEmptyActivity()
        activity.text = ' added a new list to ';
        activity.userId = this.$store.getters.loggedInUser._id;
        activity.boardId = this.board._id;
        activity.listId = savedList._id;
        this.$store.dispatch({type: "saveActivity", activity})
      });
      this.isAddListClick = !this.isAddListClick;
    }
  },
  watch: {
    board: function() {
      console.log("change in board");
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    }
  }
};
</script>

<style lang="scss">
.board {
  .board-title {
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 20px;
		color: #FFFFFF;
		align-self: flex-start;
		width: 275px - 14px;
		margin: 0;
		padding: 2px 7px;
		outline: 0;
		border: 0;
		background-color: #0079BF;
		border-radius: 3px;
		&:focus {
			background-color: #FFFFFF !important;
			color: #4D4D4D !important;
		}
  }
}

.board-list-ul {
  display: flex;
	width: 100vw;
	height: 80vh;
	overflow: scroll;
	white-space: nowrap;
	> .current-target {
		background-color: #055A8C !important;
	}
	.current-target > * {
		visibility: hidden;
	}
}

.board-list-li {
  width: 300px;
  background-color: rgb(235, 235, 235);
  border: 1px solid black;
  margin: 20px;
}

.new-list-btn {
  width: 300px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 20px;
  border: 1px solid rgb(82, 82, 82);
  color: rgb(82, 82, 82);
  border-radius: 7px;
}
.new-list-btn:hover {
  background-color: rgba(255, 255, 255, 0.849);
  border: 1px solid rgb(0, 0, 0);
  color: rgb(0, 0, 0);
}
.form-add {
  border: 1px black solid;
}
.create-list {
	transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-webkit-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-moz-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-o-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	padding: 7px 0;
	width: 275px;
	background-color: #026AA7;
	border-radius: 3px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 700;
	font-size: 15px;
	color: #FFFFFF;
	display: inline-block;
	margin: 0.5% 1.5%;
	vertical-align: top;
	cursor: pointer;
	&:hover {
		background-color: #055A8C;
	}
	.create-list-title {
		width: 88%;
		padding: 5px;
		min-height: 18px;
		display: block;
		margin: 0 auto;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 15px;
		color: #FFFFFF;
	}
	.create-list-options {
		width: 88%;
		padding: 10px 4%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}
	.create-list-input {
		width: 88%;
		padding: 5px;
		min-height: 18px;
		display: block;
		margin: 0 auto;
		background-color: #E2E4E6;
		border-radius: 3px;
		color: #4D4D4D;
		outline: none;
		border: 1px solid #CDD2D4;
		box-shadow: inset 0 1px 8px rgba(0,0,0,.15);
		&:focus {
			background-color: #E2E4E6;
		}
		&::-webkit-input-placeholder {
			color: #CDD2D4;
		}
	}
}

.create-list-active {
	transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-webkit-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-moz-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	-o-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
	background-color: #E2E4E6 !important;
	padding: 10px 0 0 0 !important;
}
</style>
