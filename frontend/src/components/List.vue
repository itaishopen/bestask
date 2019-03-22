<template>
    <section class="list">
        <div class="title-list">{{list.title}}</div>
        <draggable
            v-model="list.cards"
            group="list"
            @start="drag=true"
            @end="endMoveCard"
            :move="moveCard"
        >
            <transition-group>
                <div v-for="card in list.cards" :key="card._id">
                    <card-preview v-if="!card.archived" :card="card"></card-preview>
                </div>
            </transition-group>
        </draggable>
        <!-- <ul class="list-cards">
            <li v-for="card in list.cards" :key="card._id">
                <card-preview v-if="!card.archived" :card="card"></card-preview>
            </li>
        </ul>-->
        <button v-if="!isAddClick" @click="newCard">
            add card
            <i class="fa fa-plus"></i>
        </button>
        <form v-if="isAddClick" @submit.prevent="addCard" class="form-add">
            <!-- <div v-if="card"> -->
            <button @click="closeAdd">&times;</button>
            <textarea v-model="card.title" placeholder="Enter text here..."></textarea>
            <button type="submit">
                <i class="fa fa-plus"></i>
            </button>
            <!-- </div> -->
        </form>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
import draggable from 'vuedraggable';

export default {
    name: "list",
    props: ["list"],
    data() {
        return {
            isAddClick: false,
            moveCardId: null,
            fromListId: null,
            toListId: null
            // cardTitle: null,
            // currList: null
        };
    },
    components: {
        CardPreview,
        draggable
    },
    methods: {
        moveCard(evt) {
            console.log('moveCard');
            // console.log(evt);
            this.moveCardId = evt.draggedContext.element._id;
            this.fromListId = evt.draggedContext.element.listId;
            this.toListId = evt.relatedContext.element.listId;
        },
        endMoveCard(evt) {
            console.log('onEnd');
            console.log(this.card);
            if (this.fromListId !== this.toListId) {
                this.$store.dispatch({ type: 'loadCard', cardId: this.moveCardId });
                this.card.listId = this.toListId;
                this.$store.dispatch({ type: 'saveCard', card: this.card })
                    .then(res => {
                        console.log(res);
                        // EventBusService.$emit(SHOW_MSG, { txt: 'Card Saved!', type: 'success' });
                        // this.$router.push('/task');
                    })
                    .catch(err => {
                        console.log(err);
                        // this.$router.push('/task');
                    });
            }
        },
        newCard() {
            // this.cardTitle = CardService.getEmpty();
            console.log("new card", this.card);
            console.log((this.card.order = this.list.cards.length + 1));
            this.isAddClick = !this.isAddClick;
        },
        closeAdd() {
            this.isAddClick = !this.isAddClick;
        },
        addCard() {
            this.card.listId = this.list._id;
            // (this.card.order = this.list.cards[this.list.cards.length - 1].order + 1),
            this.card.order = this.list.cards.length + 1;
            this.$store.dispatch({ type: "saveCard", card: this.card }).then(() => {
                var cardItem = this.$store.getters.getEmptyCard;
                console.log(cardItem);

                this.$store.commit("setCard", { card: cardItem });
                var boardId = this.list.boardId;
                this.$store.dispatch({ type: "loadBoard", boardId })
            })
            this.isAddClick = !this.isAddClick;
        }
    },
    computed: {
        card: {
            get() {
                return this.$store.getters.getCurrCard;
            },
            set(cardItem) {
                this.$store.commit("setCard", { card: cardItem });
            }
        }
    },
    created() {
        var cardItem = JSON.parse(JSON.stringify(this.$store.getters.getEmptyCard));
        this.$store.commit("setCard", { card: cardItem });
        // this.currList = this.list;
    },
    watch: {
        board: function () {
            console.log("change in list");
            this.$store.dispatch({ type: "saveList", list: this.list });
        }
    }
};
</script>

<style>
.title-list {
    margin-top: 25px;
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
.new-card-btn {
    width: 200px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 20px;
    border: 1px solid rgb(82, 82, 82);
    color: rgb(82, 82, 82);
    border-radius: 7px;
}
.new-card-btn:hover {
    background-color: rgba(255, 255, 255, 0.849);
    border: 1px solid rgb(0, 0, 0);
    color: rgb(0, 0, 0);
}
</style>
