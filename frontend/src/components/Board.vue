<template>
  <section class="board">
    <ul class="board-list-ul">
      <li class="board-list-li" v-for="list in lists" :key="list._id">
        <list :list="list"/>
      </li>
      <button class="new-list-btn" @click="newList">new list</button>
    </ul>
  </section>
</template>

<script>
import CardService from "../services/CardService.js";
import list from "./List.vue";
export default {
  name: "board",
  props: ["board"],
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
    }
  },
  watch: {
    board: function() {
      console.log("change in board");
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
  width: 500px;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.new-list-btn {
    width: 200px;
    height: 30px;
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
</style>
