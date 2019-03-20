<template>
<section class="board">
      <h1>title<h1>

        <div class="board-list">
                <CardList :list="list"/>
        </div>
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