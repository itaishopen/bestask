<template>
<section class="list">
        <ul class="board-list">
            <li v-for="list in lists"
                :key="list._id">
                <CardList :list="list"/>
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

