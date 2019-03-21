<template>
    <section class="list">
        <div class="title-list">{{currList.title}}</div>
        <ul class="list-cards">
            <li v-for="card in currList.cards" :key="card._id">
                <card-preview :card="card"></card-preview>
            </li>
        </ul>
        <button v-if="!isAddClick" @click="newCard">add card</button>
        <form v-if="isAddClick" @submit.prevent="addCard" class="form-add">
            <button @click="closeAdd">&times;</button>
            <textarea v-model="card.title" placeholder="Enter text here..."></textarea>
            <button type="submit">+</button>
        </form>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
export default {
    name: "list",
    props: ["list"],
    data() {
        return {
            isAddClick: false,
            // cardTitle: null,
            // currList: null
        };
    },
    components: {
        CardPreview
    },
    methods: {
        newCard() {
            // this.cardTitle = CardService.getEmpty();
            console.log("new card", this.card);
            console.log(this.list.cards[this.list.cards.length - 1].order + 1);
            this.isAddClick = !this.isAddClick;
        },
        closeAdd() {
            this.isAddClick = !this.isAddClick;
        },
        addCard() {
            this.card.listId = this.list._id;
            (this.card.order =
                this.list.cards[this.list.cards.length - 1].order + 1),
                this.$store.dispatch({ type: "addItem", item: this.card });

            this.isAddClick = !this.isAddClick;
        }
    },
    computed: {
        card: {
            get() { return this.$store.getters.currCardItem },
            set(cardItem) { this.$store.commit('setCardItem', { cardItem }) }
        }
    },
    created() {
        var cardItem = this.$store.getters.cardItemToAdd;
        this.$store.commit('setCardItem', { cardItem });
        // this.currList = this.list;
    },
    watch: {
        // currList: function () {
        //     console.log("change in list");
        //     this.currList = this.list;
        // }
    }
};
</script>

<style>
.title-list {
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
.form-add {
    border: 1px black solid;
}
</style>
