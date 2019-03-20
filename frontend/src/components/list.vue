<template>
  <section class="list">
    {{list.title}}
    <ul class="list-cards">
      <li v-for="card in cards" :key="card._id">
        <CardPreview :card="card"/>
      </li>
    </ul>
    <button>add card</button>
  </section>
</template>


<script>
import CardPreview from "@/components/CardPreview.vue";
export default {
  name: "list",
   props: {
    list: Array
  },
  data() {
    return {};
  },
  components: {
    CardPreview
  },
  computed: {

  }
};
</script>

<style lang="sass">
.list-cards {
     display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
