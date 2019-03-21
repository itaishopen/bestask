<template>
    <div class="card-preview flex">
        <router-link :to="'/card/edit/' + card._id">
            <div class="title-card">{{card.title}}</div>
        </router-link>
    </div>
</template>

<script>

export default {
  name: "CardPreview",
  props: ["card"],
  created() {},
  data() {
    return {
    };
  },
  computed: {},
  methods: {
 

  },
  components: {
    
  }
};
</script>
<style>
.title-card {
<<<<<<< HEAD
    padding: 30px;
    width: 150px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    font-size: 22px;
    margin: 5px;
=======
  padding: 30px;
  width: 150px;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  font-size: 22px;
  margin: 5px;
}
.card-preview {
  cursor: pointer;
>>>>>>> 25a9c34e3ec5f34905590e512e4fc44c2d5e5a71
}
</style>
