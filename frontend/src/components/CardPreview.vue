<template>
  <div class="card-preview flex">
    <router-link :to="'/card/edit/' + card._id">
      <section class="title-card">
        <ul class="labels">
          <li class="label-li" v-for="label in card.labels" :key="label">
            <div class="label" :style="{background: label}"></div>
          </li>
        </ul>
        <div class="title-card-text">{{card.title}} (order {{card.order}})</div>
      </section>
    </router-link>
  </div>
  <!-- <div class="card-preview flex">
        <router-link :to="'/card/edit/' + card._id">
            <div class="title-card">{{card.title}} (order {{card.order}})</div>
        </router-link>
  </div>-->
</template>

<script>
export default {
  name: "CardPreview",
  props: ["card"],
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>
<style>
.label-li {
  height: 10px;
}
.labels {
  display: flex;
  justify-content: flex-start;
}
.label {
  margin: 5px;
  width: 30px;
  height: 5px;
  border-radius: 20px;
}
.title-card {
  padding: 4px;
  min-width: 270px;
  max-width: 270px;
  min-height: 80px;
  max-height: 80px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  margin: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.2s;
}
.title-card:hover {
  background-color: rgb(250, 250, 250);
}
.title-card-text {
  color: black;
  font-size: 18px;
  display: flex;
  align-self: center;
}
.card-preview {
  cursor: pointer;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(187, 187, 187);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(172, 172, 172);
}
</style>
