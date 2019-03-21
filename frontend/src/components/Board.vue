<template>
  <section class="board">
    <ul class="board-list-ul">
      <li class="board-list-li" v-for="list in lists" :key="list._id">
        <list :list="list"/>
      </li>
     
      <button v-if="!isAddListClick" class="new-list-btn" @click="newList">
        new list<i class="fa fa-plus"></i></button>

      <form v-if="isAddListClick" @submit.prevent="addList" class="form-add">
        <button @click="closeAdd">&times;</button>
        <textarea v-model="list.title" placeholder="Enter text here..."></textarea>
        <button type="submit"><i class="fa fa-plus"></i></button>
      </form>

    </ul>
  </section>
</template>

<script>
import CardService from "../services/CardService.js";
import list from "./List.vue";
export default {
  name: "board",
  props: ["board"],
    data() {
    return {
      isAddListClick: false,
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
      this.list = 
    this.isAddListClick = !this.isAddListClick;
    },
    closeAdd() {
      this.isAddListClick = !this.isAddListClick;
    },
    addList() {
      this.list.listId = this.list._id;
        this.$store.dispatch({ type: "saveList", list: this.list });

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

<style>
.board-list-li {
  width: 300px;
  background-color: rgb(235, 235, 235);
  border: 1px solid black;
  margin: 20px;
}
.board-list-ul {
  margin: 0 auto;
  width: 800px;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
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
</style>
