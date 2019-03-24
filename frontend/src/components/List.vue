<template>
    <section class="list">
        <div class="title-list" v-if="!isChangeTitle" @click.prevent="choseTitle">{{list.title}}</div>
        <form v-if="isChangeTitle" @submit.prevent="changeTitle" class="form-add">
            <input
                ref="title"
                v-if="isChangeTitle"
                v-model="list.title"
                placeholder="Enter title here..."
            >
            <button type="submit">
                <i class="fa fa-plus"></i>
            </button>
        </form>
        <draggable
            v-model="list.cards"
            group="list"
            @start="drag=true"
            @end="endMoveCard"
            :move="moveCard"
        >
            <transition-group>
                <div v-for="(card ,index) in list.cards" :key="card._id">
                    <card-preview v-if="!card.archived" :card="card" :index="index"></card-preview>
                </div>
            </transition-group>
        </draggable>
        <!-- <ul class="list-cards">
            <li v-for="card in list.cards" :key="card._id">
                <card-preview v-if="!card.archived" :card="card"></card-preview>
            </li>
        </ul>-->
        <button class="list-add-card" v-if="!isAddClick" @click="newCard">
            add card
            <i class="fa fa-plus"></i>
        </button>
        <form v-if="isAddClick" @submit.prevent="addCard" class="list-add-card">
            <button @click="closeAdd">&times;</button>
            <textarea class="text-area" v-model="card.title" placeholder="Enter text here..."></textarea>
            <button class="list-new-card-options" type="submit">
                <i class="fa fa-plus"></i>
            </button>
        </form>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
import draggable from 'vuedraggable';
import ListService from '../services/ListService.js';
export default {
    name: "list",
    props: ["list"],
    data() {
        return {
            isAddClick: false,
            moveCardId: null,
            fromListId: null,
            toListId: null,
            fromList: null,
            toList: null,
            // toListFutureIndex: 0
            isChangeTitle: false,
            hasfocus: false,
            // toListFutureIndex: -1
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
            // console.log(evt.draggedContext);
            // console.log(evt.relatedContext);
            this.moveCardId = evt.draggedContext.element._id;
            this.$store.dispatch({ type: 'loadCard', cardId: this.moveCardId })
                .then(res => {
                    // console.log(res);
                })
            this.fromListId = evt.draggedContext.element.listId;
            this.toListId = evt.relatedContext.element.listId;
            this.fromList = this.$store.getters.getLists.find(list => list._id === this.fromListId);
            this.toList = this.$store.getters.getLists.find(list => list._id === this.toListId);
            // console.log(this.fromList);
            // this.toListFutureIndex = evt.draggedContext.futureIndex;
            // console.log(this.toList);
        },
        endMoveCard(evt) {
            console.log('onEnd');
            // console.log(this.card);
            this.card.listId = this.toListId;
            // this.card.order = this.toListFutureIndex;
            // console.log(this.fromList.cards.length);
            // console.log(this.toList.cards.length);
            for (var i = 0; i < this.fromList.cards.length; i++) {
                this.fromList.cards[i].order = i;
            }
            this.$store.dispatch({ type: "saveList", list: this.fromList });
            if (this.fromListId !== this.toListId) {
                for (var i = 0; i < this.toList.cards.length; i++) {
                    this.toList.cards[i].order = i;
                }
                this.$store.dispatch({ type: "saveList", list: this.toList });
            }
            // this.$store.dispatch({ type: 'saveCard', card: this.card })
            //     .then(res => {
            //         console.log(res);
            //         console.log(this.toList);
            //         this.$store.dispatch({ type: "saveList", list: this.fromList });
            //         if (this.fromListId !== this.toListId) {
            //             this.$store.dispatch({ type: "saveList", list: this.toList });
            //         }
            //         // console.log(this.toList);
            //         // this.toList.cards.splice(this.toListFutureIndex, 0, this.card);
            //         // console.log(this.toList);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
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
            this.$store.dispatch({ type: "saveCardToList", card: this.card }).then(card => {
                let activity = ActivityService.getEmptyActivity()
                activity.text = ' added a new card to list ';
                activity.userId = this.$store.getters.loggedInUser._id;
                activity.boardId = this.list.boardId;
                activity.listId = this.list._id;
                activity.cardId = card._id;
                this.$store.dispatch({ type: "saveActivity", activity })
                var cardItem = CardService.getEmptyCard();
                this.$store.commit("setCard", { card: cardItem });
                var boardId = this.list.boardId;
                this.$store.dispatch({ type: "loadBoard", boardId })
            })
            this.isAddClick = !this.isAddClick;
        }
    },
    choseTitle() {
        this.isChangeTitle = !this.isChangeTitle;
        console.log("isChangeTitle", this.isChangeTitle);
    },
    changeTitle() {
        console.log("this.list", this.list);
        this.$store.dispatch({ type: "saveList", list: this.list });
        this.isChangeTitle = !this.isChangeTitle;
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
        var cardItem = CardService.getEmptyCard();
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

<style lang="scss">
.title-list {
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
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
    background-color: rgba(255, 255, 255, 0);
}
.list-add-card {
    padding: 10px 0;
    width: 100%;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 20px;
    color: rgb(82, 82, 82);
    border-radius: 7px;
}
.list-add-card:hover {
    background-color: rgba(199, 199, 199, 0.699);
    color: rgb(0, 0, 0);
}
</style>


// .input {
//     width: 88%;
//     padding: 5px;
//     min-height: 18px;
//     display: block;
//     margin: 0 auto 7px auto;
//     background-color: #e2e4e6;
//     border-radius: 3px;
//     color: #4d4d4d;
//     outline: none;
//     border: none;
//     &:focus {
//         background-color: #ffffff;
//     }
// }
// .text-area {
//     margin: 0 auto;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     background-color: #ffffff;
//     color: #4d4d4d;
//     border-radius: 3px;
//     border: none;
//     outline: none;
//     opacity: 1;
//     width: 88% - 2 * 4%;
//     padding: 10px 4%;
//     min-height: 50px;
//     font-family: "Open Sans", sans-serif;
//     font-weight: 400;
//     font-size: 12px;
//     color: #4d4d4d;
// }
// .list {
//     padding-top: 10px;
//     width: 275px;
//     background-color: #e2e4e6;
//     border-radius: 3px;
//     font-family: "Open Sans", sans-serif;
//     font-weight: 700;
//     font-size: 15px;
//     color: #ffffff;
//     display: inline-block;
//     margin: 0.5% 1.5%;
//     vertical-align: top;
//     .list-cards {
//         max-height: 70vh;
//         margin: 0;
//         padding: 0;
//     }
//     .list-add-card {
//         width: 88%;
//         padding: 7px (100% - 88%) / 2;
//         margin: 0;
//         height: auto;
//         text-align: left;
//         cursor: pointer;
//         border-radius: 3px;
//         font-family: "Open Sans", sans-serif;
//         font-weight: 400;
//         font-size: 12px;
//         color: #959da1;
//         &:hover {
//             text-decoration: underline;
//             color: #4d4d4d;
//             background-color: #cdd2d4;
//             border-top-left-radius: 0;
//             border-top-right-radius: 0;
//         }
//     }
//     .list-new-card-options {
//         width: 88%;
//         padding: 10px (100% - 88%) / 2;
//         display: flex;
//         flex-wrap: wrap;
//         align-items: center;
//         justify-content: flex-start;
//     }
//     .current-target {
//         background-color: #c4c9cc !important;
//     }
//     .current-target > * {
//         visibility: hidden;
//     }
// }
//
// </style>