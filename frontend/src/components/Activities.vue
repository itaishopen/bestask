<template>
  <div v-if="board && activities" class="activity">
    <div v-for="activity in activities" :key="activity._id">
      <activity :activity="activity"></activity>
    </div>
  </div>
</template>

<script>
import Activity from "./Activity.vue";
export default {
  name: 'Activities',
  props: ['board'],
  data() {
    return {
    }
  },
  created() {
    if (this.board._id) this.$store.dispatch({ type: "loadBoard", boardId: this.board._id })
  },
  components: {
    Activity
  },
  computed: {
    activities() {
      if (this.$store.getters.getBoardActivities.length > 0) {
        return this.$store.getters.getBoardActivities.reverse();
      }
      return null
    },

  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
}
.activities {
  flex-direction: column;
}
</style>
