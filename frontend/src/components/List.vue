<template>
    <section class="list">
        <div class="title-list">{{list.title}}</div>
        <ul class="list-cards">
            <li v-for="card in list.cards" :key="card._id">
                <card-preview :card="card"></card-preview>
            </li>
        </ul>
        <button v-if="!isAddClick" @click="newCard">add card</button>
        <form v-if="isAddClick" type="submit" class="form-add">
            <button @click="closeAdd">&times;</button>
            <textarea placeholder="Enter text here..."></textarea>
            <button type="new-card" @click="addCard">+</button>
        </form>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
export default {
    name: "list",
    props: ['list'],
    data() {
        return {
            isAddClick: false,
        };
    },
    components: {
        CardPreview
    },methods: {
    newCard(cardDetailes) {
        console.log('new card');
        this.isAddClick = !this.isAddClick
    },
    closeAdd(){
        this.isAddClick = !this.isAddClick
        },
    addCard(cardDetailes){
        this.isAddClick = !this.isAddClick
        console.log('add card');
        this.$store.dispatch({ type: "addItem", cardDetailes });
    }
  },
    computed: {
      
    },
    created() {
        // console.log(this.list);
    }
};
</script>

<style>
.title-list{
      font-size: 22px;
      color: black;
}
.list-cards {
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.form-add{
border: 1px black solid;
}
</style>
