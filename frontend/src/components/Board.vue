<template>
  <section class="board">
    <ul class="board-list-ul">
      <li class="board-list-li" v-for="list in lists" :key="list._id">
        <list :list="list"/>
      </li>
      <button @click="newList">new list</button>
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
</style>
