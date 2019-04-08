<template>
  <div v-if="activities" class="activity">
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
      activities: null
    }
  },
  created() {
    if (this.board._id) {
      this.$store.dispatch({ type: "loadBoard", boardId: this.board._id })
      .then(res => {
        this.activities = this.$store.getters.getBoardActivities.reverse();
      })
    }
  },
  components: {
    Activity
  },
  computed: {
    // activities() {
    //   if (this.$store.getters.getBoardActivities.length > 0) {
    //     return this.$store.getters.getBoardActivities.reverse();
    //   }
    //   return null
    // },
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
