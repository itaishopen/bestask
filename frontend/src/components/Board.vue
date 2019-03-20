<template>
<section class="board">
    <ul class="board-list">
      <h1>title<h1>
    <li v-for="list in lists"
        :key="list._id">
    </li>
        <button>add card</button>
  </ul>
</section>
</template>

<script>
import  BoardService  from "../services/BoardService";
export default {
    props: {
        board: Array
    },
  name: 'home',
  components: {

  }
}
</script>

