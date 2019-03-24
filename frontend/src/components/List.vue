<template>
    <section class="list">
        <input class="Input" v-model="list.title"></input>
        <ul class="list-cards">
            <li v-for="card in list.cards" :key="card._id">
                <card-preview v-if="!card.archived" :card="card"></card-preview>
            </li>
        </ul>
        <button class="list-add-card" v-if="!isAddClick" @click="newCard">
            add card
            <i class="fa fa-plus"></i>
        </button>
        <form v-if="isAddClick" @submit.prevent="addCard" class="list-add-card">
            <!-- <div v-if="card"> -->
            <button @click="closeAdd">&times;</button>
            <textarea class="text-area" v-model="card.title" placeholder="Enter text here..."></textarea>
            <button class="list-new-card-options" type="submit">
                <i class="fa fa-plus"></i>
            </button>
            <!-- </div> -->
        </form>
    </section>
</template>

<script>
import CardPreview from "@/components/CardPreview.vue";
import CardService from "../services/CardService.js";
import ListService from '../services/ListService.js';
export default {
    name: "list",
    props: ["list"],
    data() {
        return {
            isAddClick: false
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
                this.$store.dispatch({type: "saveActivity", activity})
                var cardItem = CardService.getEmptyCard();
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
.input {
	width: 88%;
	padding: 5px;
	min-height: 18px;
	display: block;
	margin: 0 auto 7px auto;
	background-color: #E2E4E6;
	border-radius: 3px;
	color: #4D4D4D;
	outline: none;
	border: none;
	&:focus {
		background-color: #FFFFFF;
	}
}
.text-area {
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: #FFFFFF;
	color: #4D4D4D;
	border-radius: 3px;
	border: none;
	outline: none;
	opacity: 1;
	width: 88% - 2 * 4%;
	padding: 10px 4%;
	min-height: 50px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 400;
	font-size: 12px;
	color: #4D4D4D;
}
.list {
	padding-top: 10px;
	width: 275px;
	background-color: #E2E4E6;
	border-radius: 3px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 700;
	font-size: 15px;
	color: #FFFFFF;
	display: inline-block;
	margin: 0.5% 1.5%;
	vertical-align: top;
	.list-cards {
		max-height: 70vh;
		margin: 0;
		padding: 0;
	}
	.list-add-card {
		width: 88%;
		padding: 7px (100% - 88%) / 2;
		margin: 0;
		height: auto;
		text-align: left;
		cursor: pointer;
		border-radius: 3px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 12px;
		color: #959DA1;
		&:hover {
			text-decoration: underline;
			color: #4D4D4D;
			background-color: #CDD2D4;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}
	.list-new-card-options {
		width: 88%;
		padding: 10px (100% - 88%) / 2;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}
	.current-target {
		background-color: #C4C9CC !important;
	}
	.current-target > * {
		visibility: hidden;
	}
}
// .title-list {
//     margin-top: 25px;
//     font-size: 22px;
//     color: black;
// }
// .list-cards {
//     margin: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }
// .form-add {
//     border: 1px black solid;
// }
// .new-card-btn {
//     width: 200px;
//     height: 30px;
//     background-color: rgba(255, 255, 255, 0);
//     border: none;
//     font-size: 20px;
//     border: 1px solid rgb(82, 82, 82);
//     color: rgb(82, 82, 82);
//     border-radius: 7px;
// }
// .new-card-btn:hover {
//     background-color: rgba(255, 255, 255, 0.849);
//     border: 1px solid rgb(0, 0, 0);
//     color: rgb(0, 0, 0);
// }
</style>
