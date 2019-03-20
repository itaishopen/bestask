<template>
<section class="list">
        <ul class="board-list">
            <li v-for="card in cards"
                :key="card._id">
                <CardList><CardList/>
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

