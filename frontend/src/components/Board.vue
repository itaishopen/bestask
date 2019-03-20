<template>
<section class="board">
      <h1>title<h1>
        <ul class="board-list">
            <li v-for="list in lists"
                :key="list._id">
            </li>
        </ul>
        <button>add card</button>
</section>
</template>

<script>
export default {
    props: {
        board: Array
    },
  name: 'board',
  components: {
  }
}
</script>

