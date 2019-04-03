<template>
  <v-layout column align-center justify-center>
    <v-dialog
      v-if="card"
      v-model="showModal"
      id="modal1"
      ref="myModalRef"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <v-text-field v-model="card.title" placeholder="Title" class="headline"></v-text-field>
          <v-card-text class="text-xs-left">
            <small>From list {{card.list[0].title}}</small>
          </v-card-text>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4 class="containerLabel">
                <div class="LabelMenu Red" v-if="checkCorectColor('#ff9191')"></div>
                <div class="LabelMenu Blue" v-if="checkCorectColor('#91abff')"></div>
                <div class="LabelMenu Green" v-if="checkCorectColor('#9eff91')"></div>
                <div class="LabelMenu Yellow" v-if="checkCorectColor('#fdff91')"></div>
                <div class="LabelMenu Purple" v-if="checkCorectColor('#e991ff')"></div>
                <div class="LabelMenu Orange" v-if="checkCorectColor('#ffd591')"></div>
              </v-flex>
              <v-flex row align-center justify-center>
                <v-flex max-width="120px" min-width="120px">
                  <v-select
                    v-model="card.et"
                    offset-y
                    max-width="120px"
                    min-width="120px"
                    :items="['0.5 Hour','1 Hour', '1.5 Hours','2.5 Hours','5 Hours','7.5 Hours','12.5 Hours','0.5 Day','1 Day', '1.5 Days','2.5 Days','5 Days','7.5 Days','12.5 Days']"
                    label="Estimate Time"
                  ></v-select>
                </v-flex>
                <v-flex max-width="120px" min-width="120px">
                  <v-select
                    v-model="card.at"
                    offset-y
                    max-width="120px"
                    min-width="120px"
                    :items="['0.5 Hour','1 Hour', '1.5 Hours','2.5 Hours','5 Hours','7.5 Hours','12.5 Hours','0.5 Day','1 Day', '1.5 Days','2.5 Days','5 Days','7.5 Days','12.5 Days']"
                    label="Actual Time"
                  ></v-select>
                </v-flex>
                <v-flex xs12 lg6>
                  <v-menu
                    :close-on-content-click="true"
                    :nudge-left="20"
                    lazy
                    color="#000"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="card.dueDate"
                        label="Date"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                        max-width="100px"
                        min-width="100px"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      max-width="100px"
                      min-width="100px"
                      v-model="card.dueDate"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-flex>
              <v-container fluid grid-list-md>
                <v-textarea
                  name="input-7-1"
                  box
                  label="Description"
                  auto-grow
                  v-model="card.description"
                ></v-textarea>
              </v-container>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="showModal = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="showModal = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import Vuetify from 'vuetify'
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css'
import ActivityService from "../services/ActivityService";
import SocketService from "../services/SocketService";
import CardService from "../services/CardService";

export default {
  name: "card",
  data() {
    return {
      comment: "",
      titleCheckList: "",
      titleToDo: "",
      openModalMembers: false,
      SumMember: false,
      editStatus: false,
      modalOpen: false,
      editorOpen: false
    };
  },
  created() {
    var cardId = this.$route.params.cardId;
    this.$store.dispatch({ type: "loadCard", cardId }).then(card => {
      this.card = card;
      this.modalOpen = true;
    });
  },
  mounted() {
    this.$refs.myModalRef.show();
  },
  computed: {
    card: {
      get() {
        return this.$store.getters.getCurrCard;
      },
      set(cardItem) {
        this.$store.commit("setCard", { card: cardItem });
      }
    },
    board: {
      get() {
        return this.$store.getters.getBoard;
      },
      set(boardItem) {
        this.$store.commit("setBoard", { board: boardItem });
      }
    },
    lists() {
      return this.$store.getters.getLists.filter(
        list => list._id !== this.card.listId
      );
    },

    showModal: {
      get() {
        return this.$route.meta.showModal;
      },
      set(value) {
        this.$route.meta.showModal = value;
      }
    },
    share() {
      return window.location.href;
    },
    isArchived() {
      return this.card.archived ? "Restore" : "Archive";
    }
  },
  methods: {
    memberToCard(userId, user) {
      const index = this.card.members.findIndex(member => member === userId);
      const idx = this.card.users.findIndex(member => member === user);
      if (index === -1) {
        this.card.members.push(userId);
        this.card.users.push(user);
      } else {
        this.card.members.splice(index, 1);
        this.card.users.splice(idx, 1);
      }
    },
    checkMember(userId) {
      return this.card.members.findIndex(member => member === userId) === -1
        ? false
        : true;
    },
    checkSumMember() {
      var sum = 0;
      if (this.card.users.length > 2) {
        return true;
      }
    },
    closeEditor(checklistId, toDoId) {
      this.editorOpen = false;
      this.card.checklists.forEach(checklist => {
        if (checklist.id === checklistId) {
          checklist.toDos.forEach(toDo => {
            if (toDoId === toDo.id) {
              toDo.editStatus = false;
              if (toDo.name === "") {
                console.log(checklist.length);
                checklist.toDos.splice(checklist.toDos.length - 1, 1);
              }
            }
          });
        }
      });
    },
    openEditor(checklistId, toDoId) {
      this.editorOpen = true;
      this.card.checklists.forEach(checklist => {
        if (checklist.id === checklistId) {
          checklist.toDos.forEach(toDo => {
            toDo.editStatus = false;
            if (toDoId === toDo.id) {
              this.titleToDo = toDo.name;
              toDo.editStatus = true;
            }
          });
        }
      });
    },
    checkDone(checklistId, toDoId) {
      this.card.checklists.forEach(checklist => {
        if (checklist.id === checklistId) {
          console.log(checklist, "checkDone");
          checklist.toDos.forEach(toDo => {
            if (toDoId === toDo.id) {
              toDo.done = !toDo.done;
            }
          });
        }
      });
    },
    addCheklist() {
      this.editorOpen = true;
      var newChecklist = CardService.getEmptyChecklist();
      newChecklist.title = this.titleCheckList;
      var newToDo = CardService.getEmptyToDo();
      newChecklist.toDos.push(newToDo);
      this.card.checklists.push(newChecklist);
    },
    addToDo(checklistId, toDoId) {
      var newTodo = false;
      this.card.checklists.forEach(checklist => {
        if (!toDoId && checklistId === checklist.id) {
          console.log(checklist.id, checklistId);
          this.editorOpen = true;
          var newToDo = CardService.getEmptyToDo();
          checklist.toDos.push(newToDo);
          this.titleToDo = "";
        }
        if (checklist.id === checklistId) {
          checklist.toDos.forEach(toDo => {
            if (toDoId === toDo.id) {
              if (toDo.name === "") {
                newTodo = true;
              }
              toDo.name = this.titleToDo;
              toDo.editStatus = false;
            }
          });
          if (newTodo) {
            var newToDo = CardService.getEmptyToDo();
            checklist.toDos.push(newToDo);
            this.titleToDo = "";
          }
        }
      });
      this.editStatus = !this.editStatus;
    },
    addMember(member) {
      this.card.members.push(member);
    },
    checkLabel(color) {
      return this.card.labels.findIndex(label => label === color) !== -1;
    },
    markChose() {
      this.card.labels.forEach(label => {
        this.labelIsChosen.forEach(color => {
          if (label === color) {
            this.labelIsChosen = true;
          }
        });
      });
    },
    checkCorectColor(color) {
      return this.card.prefs.bgColor === color;
    },
    changeLabel(chosenColor) {
      const index = this.card.labels.findIndex(label => label === chosenColor);
      if (index === -1) {
        this.card.labels.push(chosenColor);
      } else {
        this.card.labels.splice(index, 1);
      }
    },
    saveCard(isArchive) {
      this.card.archived = isArchive;
      console.log("Saving card..", this.card);
      this.modalOpen = false;
      this.$store
        .dispatch({ type: "saveCardToList", card: this.card })
        .then(card => {
          let activity = ActivityService.getEmptyActivity();
          activity.text = " changed the card in list ";
          activity.userId = this.$store.getters.loggedInUser._id;
          activity.boardId = this.board._id;
          activity.listId = card.listId;
          activity.cardId = card._id;
          activity.createdAt = moment(Date.now()).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          this.$store.dispatch({ type: "saveActivity", activity });
          SocketService.send(this.board._id);
          // setTimeout(() => {
          this.$router.go(-1);
          // }, 1500);
        })
        .catch(err => {
          console.log(err);
          this.$router.go(-1);
        });
    },

    addComment() {
      if (this.comment) {
        var date = moment(Date.now()).format("DD/MM/YY hh:mm");
        var comment = date + " " + this.comment;
        if (!this.card.comments) this.card.comments = [comment];
        else this.card.comments.unshift(comment);
        this.comment = "";
      }
    },
    modalClosed() {
      this.modalOpen = false;
      // setTimeout(() => {
      this.$router.go(-1);
      // }, 1500);
    },
    moveCard() {
      this.$store.getters.getLists.map(list => console.log(list.title));
    }
  },

  components: {}
};
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
}

.main-container {
  /* display: flex; */
  /* flex-direction: column; */
  /* height: 100vh; */
  /* background-color: yellow; */
}

.header {
  /* height: 5em; */
  /* background-color: #1E2129; */
}

.container {
  /* display: flex; */
  /* flex-direction: column; */
  /* flex: 1; */
  /* width: 100%; */
  /* background-color: blue; */
  padding-right: 0px;
  padding-left: 0px;
  /* justify-content: space-between; */
}

.content {
  flex-direction: column;
  flex-basis: 80%;
  align-items: flex-start;
  margin: 5px;
  /* background-color: #46A3A3; */
}

.nav {
  flex-direction: column;
  /* align-items: center; */
  margin: 5px;
}

.comments {
  flex-direction: column;
}

.Label {
  padding: 10px;
  margin: 3px;
  cursor: pointer;
  height: 37px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.Label:hover {
  border-left: 15px solid rgba(78, 78, 78, 0.13);
}
.containerLabel {
  display: flex;
  flex-direction: row;
}
.LabelMenu {
  cursor: pointer;
  width: 23px;
  height: 23px;
  border-radius: 20%;
  margin: 2px;
}
.Red {
  background-color: rgb(231, 55, 55);
}
.Blue {
  background-color: rgb(45, 70, 214);
}
.Green {
  background-color: rgb(33, 175, 68);
}
.Yellow {
  background-color: rgb(255, 239, 22);
}
.Purple {
  background-color: rgb(189, 22, 255);
}
.Orange {
  background-color: rgb(255, 154, 22);
}
.Vwhite {
  display: flex;
  flex-direction: row-reverse;
  color: rgb(255, 255, 255);
}

.nav-modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.container-member,
.container-member-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.container-member-nav {
  display: grid;
  grid-template-columns: repeat(4, [col] 25px);
  grid-template-rows: repeat(1, [row] auto);
}
.container-member {
  justify-content: space-between;
  border: 1px solid rgb(216, 216, 216);
  background-color: rgb(245, 245, 245);
  border-radius: 12px;
  padding: 5px;
  margin: 5px;
}

.container-name-member {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo-user-name {
  font-size: 15px;
  font-weight: bold;
  min-width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 50%;
  border: 1px solid rgb(66, 178, 206);
  background-color: rgb(174, 216, 226);
  justify-content: flex-start;
}
.name-member {
  margin-left: 8px;
}

.edit-checklist {
  color: black;
  display: flex;
  flex-direction: column;
}
.edit-Todos {
  display: flex;
}
.edit-Todo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-Todos {
  margin: 10px 0;
}
.fa-square,
.fa-check-square {
  font-size: 25px;
  margin-right: 8px;
}
.new-todo-options {
  max-width: 109px;
  font-size: 17px;
  font-weight: bold;
  background-color: rgb(51, 236, 66);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px 18px;
  margin: 0 3px;
}
.new-todo {
  margin: 8px 0;
}

.x-todo-options {
  background-color: rgb(236, 51, 51);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px 18px;
  margin: 0 3px;
}
// #modal-container {
//   position: fixed;
//   display: table;
//   height: 100%;
//   width: 100%;
//   top: 0;
//   left: 0;
//   transform: scale(0);
//   z-index: 1;
//   &.one {
//     transform: scaleY(0.01) scaleX(0);
//     animation: unfoldIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
//     .modal-background {
//       .modal {
//         transform: scale(0);
//         animation: zoomIn 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
//       }
//     }
//     &.out {
//       transform: scale(1);
//       animation: unfoldOut 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
//       .modal-background {
//         .modal {
//           animation: zoomOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
//         }
//       }
//     }
//   }
// }
// @keyframes unfoldIn {
//   0% {
//     transform: scaleY(0.005) scaleX(0);
//   }
//   50% {
//     transform: scaleY(0.005) scaleX(1);
//   }
//   100% {
//     transform: scaleY(1) scaleX(1);
//   }
// }

// @keyframes unfoldOut {
//   0% {
//     transform: scaleY(1) scaleX(1);
//   }
//   50% {
//     transform: scaleY(0.005) scaleX(1);
//   }
//   100% {
//     transform: scaleY(0.005) scaleX(0);
//   }
// }

// @keyframes zoomIn {
//   0% {
//     transform: scale(0);
//   }
//   100% {
//     transform: scale(1);
//   }
// }

// @keyframes zoomOut {
//   0% {
//     transform: scale(1);
//   }
//   100% {
//     transform: scale(0);
//   }
// }
</style>
