<template>
  <div class="card-preview flex">
    <router-link :to="'/card/edit/' + card._id">
      <section class="title-card">
        <ul class="labels">
          <li class="label-li" v-for="label in card.labels" :key="label">
            <div class="label" :style="{background: displayLabel()}"></div>
          </li>
        </ul>
        <div class="title-card-text">{{card.title}}</div>
      </section>
    </router-link>
  </div>
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
  methods: {
    displayLabel() {
      var curectColor = this.card.labels[0];
      this.card.labels.push(curectColor);
      this.card.labels.shift();
      return curectColor;
    }
  },
  components: {}
};
</script>
<style>
.label-li{
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
  min-height: 80px;
  max-height: 80px;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-card-text {
  color: black;
  font-size: 22px;
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
  background: #f1f1f1;
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
