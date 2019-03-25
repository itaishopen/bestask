<template>
  <!-- <section> -->
  <!-- Modal Component -->
  <b-modal
    v-if="card"
    id="modal1"
    ref="myModalRef"
    @hide="modalClosed"
    title="Edit Card"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <div class="container flex">
      <main class="content flex">
        <b-form-input class="m-1" v-model="card.title" placeholder="Title"/>
        <b-form-textarea
          class="m-1"
          id="textarea"
          v-model="card.description"
          placeholder="Description"
          rows="6"
          max-rows="10"
        />

        <div v-for="checklist in card.checklists" :key="checklist">
          TITLE: {{checklist.title}}
          <div v-for="toDo in checklist.toDos" :key="toDo">
            <div class="flex">
              <i v-if="!toDo.done" class="far fa-square"></i>
              <i v-if="toDo.done" class="fa fa-check-square"></i>
              {{toDo.name}}
            </div>
            <div class="flex">
              <b-form-input name="add-todo" placeholder="Add todo" size="sm" v-model="toDo.name"/>
              <b-button
                class="m-1 float-right"
                variant="primary"
                size="sm"
                @click.stop="addToDo"
              >add todo</b-button>
            </div>
          </div>
        </div>

        <b-form-input class="m-1" v-model="comment" placeholder="Add comment"/>

        <!-- <b-form-input class="m-1" v-model="toDo.name" placeholder/> -->

        <b-button class="m-1" size="sm" v-on:click="addComment">Save</b-button>
        <div v-for="comment in card.comments" :key="comment">{{comment}}</div>
      </main>
      <div class="nav flex">
        <label class="m-1">Add to Card</label>
        <b-button v-b-modal.modal6 class="m-1 btn-block" size="sm">Members</b-button>
        <b-button v-b-modal.modal4 class="m-1 btn-block" size="sm">Labels</b-button>
        <b-button v-b-modal.modal9 class="m-1 btn-block" size="sm">Checklist</b-button>

        <label class="m-1">Actions</label>
        <!-- <b-button class="m-1 btn-block" v-on:click="moveCard">Move</b-button> -->
        <b-dropdown class="m-1 btn-block" size="sm" text="Move to">
          <b-dropdown-item
            v-for="list in lists"
            :key="list._id"
            :value="list._id"
            @click="card.listId = list._id"
          >{{ list.title }}</b-dropdown-item>
        </b-dropdown>

        <b-button class="m-1 btn-block" size="sm">Copy</b-button>
        <b-button class="m-1 btn-block" size="sm" v-on:click="saveCard(true)">Archive</b-button>
        <!-- <b-form-checkbox
                    button
                    v-model="card.archived"
                    name="check-button"
        >Archive {{ card.archived }}</b-form-checkbox>-->
        <b-button class="m-1 btn-block" size="sm">Share</b-button>
      </div>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-button class="m-1 float-right" variant="primary" @click="saveCard(false)">Save</b-button>
      <b-button class="m-1 float-right" @click="closeModal">Close</b-button>
    </div>
    <!-- Modal Labels Component -->
    <b-modal id="modal4" title="Labels">
      <div class="LabelRed" @click="changeLabel('red')">
        Bug
        <i class="fa fa-check" v-if="checkLabel('red')"></i>
      </div>
      <div class="LabelBlue" @click="changeLabel('blue')">
        Duplicate
        <i class="fa fa-check" v-if="checkLabel('blue')"></i>
      </div>
      <div class="LabelGreen" @click="changeLabel('green')">
        Enhancement
        <i class="fa fa-check" v-if="checkLabel('green')"></i>
      </div>
      <div class="LabeYellow" @click="changeLabel('yellow')">
        Invalid
        <i class="fa fa-check" v-if="checkLabel('yellow')"></i>
      </div>
      <div class="LabePurple" @click="changeLabel('purple')">
        Question
        <i class="fa fa-check" v-if="checkLabel('purple')"></i>
      </div>
      <div class="LabeOrange" @click="changeLabel('orange')">
        Wontfix
        <i class="fa fa-check" v-if="checkLabel('orange')"></i>
      </div>
      <p class="my-4">Labels!</p>
    </b-modal>

    <!-- Modal Labels Component -->
    <!-- <b-modal id="modal6" title="Members">
      <form>
        <input type="search" name="search" placeholder="Search Members">
      </form>
      <hr>
      {{card.members}}
      <hr>
      <form class="add-member" @submit.prevent="addMember()">
        <div v-for="user in users.userName" :key="user">
            <div>{{user}}</div>
        </div>
      </form>
    </b-modal>-->

    <!-- Modal Labels Component -->
    <b-modal id="modal9" title="Checklist">
      <form class="add-checklist" @submit.prevent="addCheklist()">
        Title
        <input type="text" v-model="checklist.title">
        <button type="submit">create</button>
      </form>
    </b-modal>
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

export default {
  name: "CardEdit",
  data() {
    return {
      comment: "",
      openModalMembers: false,
      checklist: {
        title: "",
        toDos: []
      },
      toDo: { name: "", done: false }
    };
  },
  created() {
    var cardId = this.$route.params.cardId;
    this.$store.dispatch({ type: "loadCard", cardId }).then(card => {
      this.card = card;
    });
    this.$store.dispatch({ type: "loadCard", cardId }).then(card => {
      this.card = card;
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
    lists() {
      return this.$store.getters.getLists.filter(
        list => list._id !== this.card.listId
      );
    }
  },
  methods: {
    addCheklist() {
      this.card.checklists.toDos.push(this.toDo);
      console.log("Checklist", this.card);
    },
    addToDo() {
      console.log("Checklist", this.card);
        
      this.card.checklists.forEach(checklist => {
        if ((checklist.title === this.checklist.title)) {
            checklist.toDos.push(this.toDo);
            this.toDo = { name: "", done: false }
        }
      });
    },
    checkLabel(color) {
      return this.card.labels.findIndex(label => label === color) === -1
        ? false
        : true;
    },
    markChose() {
      this.card.labels.forEach(label => {
        console.log(label);

        this.labelIsChosen.forEach(color => {
          console.log(color);
          if (label === color) {
            this.labelIsChosen = true;
          }
        });
      });
    },
    changeLabel(chosenColor) {
      const index = this.card.labels.findIndex(label => label === chosenColor);
      console.log({ index });
      if (index === -1) {
        this.card.labels.push(chosenColor);
        console.log(chosenColor, this.card.labels);
      } else {
        this.card.labels.splice(index, 1);
      }
      console.log(this.card.labels);
    },
    closeModal() {
      // this.$refs.myModalRef.hide();
      this.$router.push("/task");
    },
    saveCard(archive) {
      console.log("archive", archive);
      if (archive) this.card.archived = true;
      console.log("Saving card..", this.card);
      this.$store
        .dispatch({ type: "saveCardToList", card: this.card })
        .then(card => {
          let activity = ActivityService.getEmptyActivity();
          activity.text = " changed the card in list ";
          activity.userId = this.$store.getters.loggedInUser._id;
          activity.boardId = this.$store.getters.getBoard._id;
          activity.listId = card.listId;
          activity.cardId = card._id;
          this.$store.dispatch({ type: "saveActivity", activity });
          // EventBusService.$emit(SHOW_MSG, { txt: 'Card Saved!', type: 'success' });
          this.$router.push("/task");
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/task");
        });
    },

    addComment() {
      if (this.comment) {
        var date = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");
        var comment = this.comment + "\t" + date;
        if (!this.card.comments) this.card.comments = [comment];
        else this.card.comments.unshift(comment);
        this.comment = "";
      }
    },
    modalClosed() {
      console.log("modalClosed");
      this.$router.push("/task");
    },
    moveCard() {
      // console.log(this.$store.getters.getLists);
      this.$store.getters.getLists.map(list => console.log(list.title));
    }
  },

  components: {},
  watch: {
    card: function() {
      console.log("change in card");
      this.$store.dispatch({ type: "saveCard", card: this.card });
    }
  }
};
</script>

<style lang="css" scoped>
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

.LabelRed,
.LabelBlue,
.LabelGreen,
.LabeYellow,
.LabePurple,
.LabeOrange {
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
.LabelRed:hover,
.LabelBlue:hover,
.LabelGreen:hover,
.LabeYellow:hover,
.LabePurple:hover,
.LabeOrange:hover {
  border-left: 15px solid rgba(61, 61, 61, 0.349);
}
.LabelRed {
  background-color: rgb(231, 55, 55);
}
.LabelBlue {
  background-color: rgb(45, 70, 214);
}
.LabelGreen {
  background-color: rgb(33, 175, 68);
}
.LabeYellow {
  background-color: rgb(255, 239, 22);
}
.LabePurple {
  background-color: rgb(189, 22, 255);
}
.LabeOrange {
  background-color: rgb(255, 154, 22);
}
.fa-check {
  display: flex;
  flex-direction: row-reverse;
  color: rgb(255, 255, 255);
}
</style>
