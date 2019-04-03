<template>
  <b-modal
    v-if="card"
    v-model="showModal"
    id="modal1"
    size="xl"
    ref="myModalRef"
    @hide="modalClosed"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <b-form-input slot="modal-header" class="m-1" v-model="card.title" placeholder="Title"/>
    <section class="nav-modal">
      <div class="containerLabel" v-b-modal.modal4>
        <div class="LabelMenu Red" v-if="checkCorectColor('#ff9191')"></div>
        <div class="LabelMenu Blue" v-if="checkCorectColor('#91abff')"></div>
        <div class="LabelMenu Green" v-if="checkCorectColor('#9eff91')"></div>
        <div class="LabelMenu Yellow" v-if="checkCorectColor('#fdff91')"></div>
        <div class="LabelMenu Purple" v-if="checkCorectColor('#e991ff')"></div>
        <div class="LabelMenu Orange" v-if="checkCorectColor('#ffd591')"></div>
      </div>
      <div v-b-modal.modal6 class="container-member-nav" v-if="card.users">
        <div v-for="user in card.users.slice(0, 2)" :key="user._id">
          <div class="container-name-member" v-if="checkMember(user._id)">
            <div class="logo-user-name">{{user.firstName[0]}}{{user.lastName[0]}}</div>
          </div>
        </div>
        <div class="logo-user-name" v-if="checkSumMember()">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </section>

    <div class="container flex">
      <main class="content flex">
        <div class="cost flex">
          <label class="mt-4" for="time">Cost:</label>
          <div class="flex column m-1">
            <label for="timeEt" class="mb-1">Estimate Time</label>
            <b-form-select
              size="md"
              label="Estimate Time"
              :value="card.et"
              id="time timeEt"
              v-model="card.et"
              :options="{ '0.5 Hour':'0.5 Hour','1 Hour': '1 Hour', '1.5 Hours': '1.5 Hours','2.5 Hours':'2.5 Hours','5 Hours':'5 Hours','7.5 Hours':'7.5 Hours','12.5 Hours':'12.5 Hours','0.5 Day':'0.5 Day','1 Day': '1 Day', '1.5 Days': '1.5 Days','2.5 Days':'2.5 Days','5 Days':'5 Days','7.5 Days':'7.5 Days','12.5 Days':'12.5 Days'}"
            >
              <option slot="first" :value="null">Estimate Time</option>
            </b-form-select>
          </div>
          <div class="flex column m-1">
            <label for="timeAt" class="mb-1">Actual Time</label>
            <b-form-select
              size="md"
              :value="card.at"
              id="timeAt"
              v-model="card.at"
              :options="{ '0.5 Hour':'0.5 Hour','1 Hour': '1 Hour', '1.5 Hours': '1.5 Hours','2.5 Hours':'2.5 Hours','5 Hours':'5 Hours','7.5 Hours':'7.5 Hours','12.5 Hours':'12.5 Hours','0.5 Day':'0.5 Day','1 Day': '1 Day', '1.5 Days': '1.5 Days','2.5 Days':'2.5 Days','5 Days':'5 Days','7.5 Days':'7.5 Days','12.5 Days':'12.5 Days'}"
            >
              <option slot="first" :value="null">Actual Time</option>
            </b-form-select>
          </div>
        </div>

        <div class="time flex">
          <label class="mt-3" for="date">Date:</label>
          <input
            type="date"
            class="custom-select custom-select-sm m-1"
            name="bday"
            size="sm"
            v-model="card.dueDate"
          >
        </div>
        <b-form-textarea
          class="m-1"
          id="textarea"
          v-model="card.description"
          placeholder="Description"
          rows="6"
          max-rows="10"
        />

        <div class="edit-checklist" v-for="checklist in card.checklists" :key="checklist.id">
          <div class="title-Todos">TITLE: {{checklist.title}}</div>
          <div class="edit-Todos" v-for="toDo in checklist.toDos" :key="toDo.id">
            <div class="edit-Todo">
              <i v-if="!toDo.done" @click="checkDone(checklist.id , toDo.id)" class="far fa-square"></i>
              <i
                v-if="toDo.done"
                @click="checkDone(checklist.id , toDo.id)"
                class="fa fa-check-square"
              ></i>
              <div
                v-show="!toDo.editStatus"
                @click.prevent="openEditor(checklist.id , toDo.id)"
              >{{toDo.name}}</div>
            </div>
            <div class="flex editTodo" v-show="toDo.editStatus">
              <b-input
                name="add-todo"
                placeholder="Add todo"
                size="sm"
                v-model="titleToDo"
                autofocus
              />
              <button class="new-todo-options" @click.prevent="addToDo(checklist.id , toDo.id)">Add</button>
              <button class="x-todo-options" @click.prevent="closeEditor(checklist.id , toDo.id)">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <button
            class="new-todo-options new-todo"
            v-if="!editorOpen"
            size="sm"
            @click="addToDo(checklist.id)"
          >Add item</button>
        </div>

        <b-form-input class="m-1" v-model="comment" placeholder="Add comment"/>
        <b-button class="m-1" size="sm" v-on:click="addComment">Save</b-button>
        <b-form-input
          v-for="comment in card.comments"
          :key="comment"
          class="m-1"
          size="sm"
          :value="comment"
          readonly
        />
      </main>
      <div class="nav flex">
        <label class="m-1">Add to Card</label>
        <b-button v-b-modal.modal6 class="m-1 btn-block" size="sm">Members</b-button>
        <b-button v-b-modal.modal10 class="m-1 btn-block" size="sm">Labels</b-button>
        <b-button v-b-modal.modal5 class="m-1 btn-block" size="sm">Checklist</b-button>

        <label class="m-1">Actions</label>
        <!-- <b-button class='m-1 btn-block' v-on:click='moveCard'>Move</b-button> -->
        <b-dropdown class="m-1 btn-block" size="sm" text="Move to">
          <b-dropdown-item
            v-for="list in lists"
            :key="list._id"
            :value="list._id"
            @click="card.listId = list._id"
          >{{ list.title }}</b-dropdown-item>
        </b-dropdown>

        <b-button class="m-1 btn-block" size="sm">Copy</b-button>
        <b-button
          class="m-1 btn-block"
          size="sm"
          v-on:click="saveCard(!card.archived)"
        >{{isArchived}}</b-button>
        <!-- <b-form-checkbox
                    button
                    v-model='card.archived'
                    name='check-button'
        >Archive {{ card.archived }}</b-form-checkbox>-->
        <b-button v-b-modal.modal7 class="m-1 btn-block" size="sm">Share</b-button>
        <b-button v-b-modal.modal10 class="m-1 btn-block" size="sm">Color card</b-button>
      </div>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-button class="m-1 float-right" variant="primary" @click="saveCard(false)">Save</b-button>
      <b-button class="m-1 float-right" @click="modalClosed">Close</b-button>
    </div>
    <!-- Modal card color Component -->
    <b-modal id="modal10" title="Color card">
      <section class="plateColor">
        <div class="color colorffffff" @click="changeCardColor('#ffffff')">
          none
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#ffffff')"></i>
        </div>
        <div class="color colorff9191" @click="changeCardColor('#ff9191')">
          Bug
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#ff9191')"></i>
        </div>
        <div class="color colorffd591" @click="changeCardColor('#ffd591')">
          Duplicate
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#ffd591')"></i>
        </div>
        <div class="color colorfdff91" @click="changeCardColor('#fdff91')">
          Enhancement
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#fdff91')"></i>
        </div>
        <div class="color color9eff91" @click="changeCardColor('#9eff91')">
          Invalid
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#9eff91')"></i>
        </div>
        <div class="color color91abff" @click="changeCardColor('#91abff')">
          Wontfix
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#91abff')"></i>
        </div>
        <div class="color colore991ff" @click="changeCardColor('#e991ff')">
          Question
          <i class="fa fa-check Vgrey" v-if="checkCorectColor('#e991ff')"></i>
        </div>
      </section>
    </b-modal>

    <!-- Modal Members Component -->
    <b-modal id="modal6" title="Members" v-if="board.users">
      <div v-for="user in board.users" :key="user._id">
        <div class="container-member" @click="memberToCard(user._id , user)">
          <div class="container-name-member">
            <div class="logo-user-name">{{user.firstName[0]}}{{user.lastName[0]}}</div>
            <div class="name-member">{{user.firstName}} {{user.lastName}} ({{user.userName}})</div>
          </div>
          <div>
            <i class="fa fa-check" v-if="checkMember(user._id)"></i>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Modal Checklist Component -->
    <b-modal id="modal5" title="Checklist" hide-footer>
      <form class="add-checklist" @submit.prevent="addCheklist()">
        Add Title
        <b-form-input type="text" v-model="titleCheckList" autofocus/>
        <b-button class="mt-3 float-right" type="submit">create</b-button>
      </form>
    </b-modal>
    <!-- Share Modal  -->
    <b-modal id="modal7" title="Link to this card" no-close-on-backdrop ok-only>
      <b-form-input class="m-1" v-model="share" readonly/>
    </b-modal>.
  </b-modal>
  <!-- </section> -->
</template>

<script>
import moment from "moment";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ActivityService from "../services/ActivityService";
import SocketService from "../services/SocketService";
import CardService from "../services/CardService";
import { TweenMax, Power4 } from "gsap";

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

    checkCorectColor(color) {
      return this.card.prefs.bgColor === color;
    },
    changeCardColor(chosenColor) {
      this.card.prefs.bgColor = chosenColor;
      console.log(this.card);
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
.modal-content {
  max-width: 70vw;
  background: #9eff91;
  border-radius: 25px;
}
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

.LabelMenu {
  cursor: pointer;
  width: 23px;
  height: 23px;
  border-radius: 20%;
  margin: 2px;
}
.white {
  background-color: rgb(255, 255, 255);
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
  color: rgb(109, 109, 109);
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

// card color
.plateColor {
  display: flex;
  flex-direction: column;
}
.color {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  margin: 2px;
  border-radius: 10px;
  min-width: 150px;
  height: 50px;
  border: #858585 solid 1px;
  transition: 0.2s;
}
.colorffffff {
  background-color: #ffffff;
}
.colorff9191 {
  background-color: #ff9191;
}
.colorffd591 {
  background-color: #ffd591;
}
.colorfdff91 {
  background-color: #fdff91;
}
.color9eff91 {
  background-color: #9eff91;
}
.color91abff {
  background-color: #91abff;
}
.colore991ff {
  background-color: #e991ff;
}
.Vgrey {
  display: flex;
  flex-direction: row-reverse;
  color: rgba(0, 0, 0, 0.774);
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
