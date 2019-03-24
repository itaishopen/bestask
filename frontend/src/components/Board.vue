<template>
    <section class="board">
        <div class="board-title" v-if="!isChangeTitle" @click.prevent="choseTitle">{{board.title}}</div>
        <form v-if="isChangeTitle" @submit.prevent="changeTitle" class="form-add">
            <input
                class="input-title-board"
                ref="title"
                v-model="board.title"
                placeholder="Enter title here..."
            >
            <button class="btn-title-board" type="submit">
                <i class="fa fa-plus"></i>
            </button>
        </form>
        <ul class="board-list-ul">
            <draggable
                v-model="lists"
                v-bind="dragOptions"
                group="lists"
                @start="drag=true"
                @end="endMoveList"
                :move="moveList"
                class="draggable"
            >
                <li class="board-list-li" v-for="list in lists" :key="list._id">
                    <list :list="list"/>
                </li>
            </draggable>
            <div class="create-list">
                <button v-if="!isAddListClick" class="create-list-title" @click="newList">
                    Add new list
                    <i class="fa fa-plus"></i>
                </button>

                <form
                    v-if="isAddListClick"
                    @submit.prevent="addList"
                    class="create-list-input form-add-list"
                >
                    <div>
                        <input
                            class="input-new-list"
                            v-model="list.title"
                            placeholder="Enter text here..."
                        >
                    </div>
                    <div class="container-add-list-btns">
                        <button class="create-list-options list-new-list-options" type="submit">
                            <i class="fa fa-plus"></i>
                        </button>
                        <button class="list-x-list-options" @click="closeAdd">&times;</button>
                    </div>
                </form>
            </div>
        </ul>
    </section>
</template>

<script>
import CardService from "../services/CardService.js";
import ListService from "../services/ListService.js";
import ActivityService from "../services/ActivityService.js";
import list from "./List.vue";
import draggable from "vuedraggable";

export default {
    name: "board",
    props: ["board"],
    data() {
        return {
            isAddListClick: false,
            isChangeTitle: false,
        };
    },
    components: {
        list,
        draggable
    },

    computed: {
        lists: {
            get() {
                return this.$store.getters.getLists;
            },
            set(lists) {
                this.$store.commit("setLists", { lists: lists });
            }
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },

    methods: {
        newList() {
            //  todo: add list
            this.list = ListService.getEmptyList();
            this.isAddListClick = !this.isAddListClick;
        },
        closeAdd() {
            this.isAddListClick = !this.isAddListClick;
        },
        addList() {
            this.list.boardId = this.board._id;
            this.list.order = this.lists.length + 1;
            this.$store
                .dispatch({ type: "saveNewList", list: this.list })
                .then(savedList => {
                    let activity = ActivityService.getEmptyActivity();
                    activity.text = " added a new list to ";
                    activity.userId = this.$store.getters.loggedInUser._id;
                    activity.boardId = this.board._id;
                    activity.listId = savedList._id;
                    activity.createdAt = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");
                    this.$store.dispatch({ type: "saveActivity", activity });
                });
            this.isAddListClick = !this.isAddListClick;
        },
        choseTitle() {
            console.log("isChangeTitle", this.isChangeTitle);
            this.isChangeTitle = !this.isChangeTitle;
        },
        changeTitle() {
            console.log("this.board", this.board);
            this.$store.dispatch({ type: "saveBoard", board: this.board });
            this.isChangeTitle = !this.isChangeTitle;
        },
        moveList(evt) {
            // console.log(evt);

        },
        endMoveList(evt) {
            for (var i = 0; i < this.lists.length; i++) {
                this.lists[i].order = i;
            }
            this.$store.dispatch({ type: "updateLists", lists: this.lists });
        }
    },

    watch: {
        // board: function () {
        //     console.log("change in board", this.board);
        //     this.$store.dispatch({ type: "saveBoard", board: this.board });
        // }
    }
};
</script>

<style lang="scss">
.board-title {
    display: flex;
    padding: 15px;
    font-family: Lato_bold;
    font-size: 20px;
}
.board-list-li {
    min-height: 80vh;
    max-height: 80vh;
    min-width: 280px;
    overflow: auto;
    /* max-height: 100vh; */
    background-color: rgb(235, 235, 235);
    border: 1px solid rgb(206, 206, 206);
    border-radius: 8px;
    margin: 0px 5px;
}
.board-list-ul {
    /* margin: 0 auto; */
    width: min-content;

    background-color: rgb(255, 255, 255);
    /* border: 1px solid black; */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
.create-list-title {
    min-width: 280px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.075);
    border: none;
    font-size: 20px;
    color: rgb(82, 82, 82);
    display: flex;
    justify-content: center;
}
.create-list-title:hover {
    color: rgb(22, 22, 22);
}

.form-add-list {
    background-color: rgba(255, 255, 255, 0);
    display: flex;
}
.list-add-list {
    padding: 10px 0;
    width: 270px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 20px;
    color: rgb(82, 82, 82);
    border-radius: 7px;
    transition: 0.3s;
}
.form-add-list {
    width: 270px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #ebebeb;
    border: 1px solid #cecece;
    border-radius: 8px;

    margin: 3px;
}
.input-new-list {
    min-width: 264px;
    height: 40px;
    border: none;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 10px;
    padding: 5px;
    margin-top: 10px;
}
.container-list-card-btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.list-add-list:hover {
    background-color: rgba(199, 199, 199, 0);
    color: rgb(0, 0, 0);
}
.list-new-list-options {
    background-color: rgb(51, 236, 66);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 5px;
    padding: 8px;
    margin: 0 3px;
}
.list-x-list-options {
    background-color: rgba(51, 236, 66, 0);
    border: none;
    width: 20px;
}
.input-title-board {
    font-size: 18px;
    font-weight: bold;
    height: 32px;
    width: 300px;
    border: none;
    background: rgba(255, 255, 255, 0.911);
    padding-left: 10px;
}
.btn-title-board {
    background: rgba(255, 255, 255, 0.911);
    border: none;
}

.draggable {
    display: flex;
    flex-direction: row;
}

.ghost {
    opacity: 0.3;
    background: #c8ebfb;
}
</style>

 
// .board {
//     .board-title {
//         font-family: "Open Sans", sans-serif;
//         font-weight: 400;
//         font-size: 20px;
//         color: #ffffff;
//         align-self: flex-start;
//         width: 275px - 14px;
//         margin: 0;
//         padding: 2px 7px;
//         outline: 0;
//         border: 0;
//         background-color: #0079bf;
//         border-radius: 3px;
//         &:focus {
//             background-color: #ffffff !important;
//             color: #4d4d4d !important;
//         }
//     }
// }

// .board-list-ul {
//     display: flex;
//     width: 100vw;
//     height: 80vh;
//     overflow: scroll;
//     white-space: nowrap;
//     > .current-target {
//         background-color: #055a8c !important;
//     }
//     .current-target > * {
//         visibility: hidden;
//     }
// }

// .board-list-li {
//     width: 300px;
//     background-color: rgb(235, 235, 235);
//     border: 1px solid black;
//     margin: 20px;
// }
// .board-list-ul {
//     margin: 0 auto;
//     width: 800px;
//     background-color: rgb(255, 255, 255);
//     border: 1px solid black;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: flex-start;
// }
// .new-list-btn {
//     width: 300px;
//     height: 100px;
//     background-color: rgba(255, 255, 255, 0);
//     border: none;
//     font-size: 20px;
//     border: 1px solid rgb(82, 82, 82);
//     color: rgb(82, 82, 82);
//     border-radius: 7px;
// }
// .new-list-btn:hover {
//     background-color: rgba(255, 255, 255, 0.849);
//     border: 1px solid rgb(0, 0, 0);
//     color: rgb(0, 0, 0);
// }
// .create-list-input {
//     border: 1px black solid;
// }
// .create-list {
//     transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -webkit-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -moz-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -o-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     padding: 7px 0;
//     width: 275px;
//     background-color: #026aa7;
//     border-radius: 3px;
//     font-family: "Open Sans", sans-serif;
//     font-weight: 700;
//     font-size: 15px;
//     color: #ffffff;
//     display: inline-block;
//     margin: 0.5% 1.5%;
//     vertical-align: top;
//     cursor: pointer;
//     &:hover {
//         background-color: #055a8c; 
//     }
//     .create-list-title {
//         width: 88%;
//         padding: 5px;
//         min-height: 18px;
//         display: block;
//         margin: 0 auto;
//         font-family: "Open Sans", sans-serif;
//         font-weight: 400;
//         font-size: 15px;
//         color: #ffffff;
//     }
//     .create-list-options {
//         width: 88%;
//         padding: 10px 4%;
//         display: flex;
//         flex-wrap: wrap;
//         align-items: center;
//         justify-content: flex-start;
//     }
//     .create-list-input {
//         width: 88%;
//         padding: 5px;
//         min-height: 18px;
//         display: block;
//         margin: 0 auto;
//         background-color: #e2e4e6;
//         border-radius: 3px;
//         color: #4d4d4d;
//         outline: none;
//         border: 1px solid #cdd2d4;
//         box-shadow: inset 0 1px 8px rgba(0, 0, 0, 0.15);
//         &:focus {
//             background-color: #e2e4e6;
//         }
//         &::-webkit-input-placeholder {
//             color: #cdd2d4;
//         }
//     }


// .create-list-active {
//     transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -webkit-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -moz-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     -o-transition: all 0.15s cubic-bezier(0.2, 0.3, 0.25, 0.9);
//     background-color: #e2e4e6 !important;
//     padding: 10px 0 0 0 !important;
// }
// </style> 