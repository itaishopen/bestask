<template>
  <!-- <section> -->
  <!-- Modal Component -->
  <b-modal
    v-if="card"
    v-model="showModal"
    id="modal1"
    ref="myModalRef"
    @hide="modalClosed"
    title="Edit Card"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
  >
    <section class="nav-modal">
      <div class="containerLabel" v-b-modal.modal4>
        <div class="LabelMenu Red" v-if="checkLabel('red')"></div>
        <div class="LabelMenu Blue" v-if="checkLabel('blue')"></div>
        <div class="LabelMenu Green" v-if="checkLabel('green')"></div>
        <div class="LabelMenu Yellow" v-if="checkLabel('yellow')"></div>
        <div class="LabelMenu Purple" v-if="checkLabel('purple')"></div>
        <div class="LabelMenu Orange" v-if="checkLabel('orange')"></div>
      </div>
      <div v-b-modal.modal6 class="container-member-nav">
        <div v-for="user in board.users.slice(0, 2)" :key="user">
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
              <i v-if="!toDo.done" @click="checkDone" class="far fa-square"></i>
              <i v-if="toDo.done" @click="checkDone" class="fa fa-check-square"></i>
              <div v-if="editStatus" @click.prevent="closeEditor">{{toDo.name}}</div>
            </div>
            <div class="flex" v-if="!editStatus">
              <b-input name="add-todo" placeholder="Add todo" size="sm" v-model="toDo.name"/>
              <b-button class="m-1 float-right" variant="primary" size="sm" @click="addToDo">Add</b-button>
              <button @click="closeEditor">&times;</button>
            </div>
          </div>
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
        <b-button v-b-modal.modal4 class="m-1 btn-block" size="sm">Labels</b-button>
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
        <b-button class="m-1 btn-block" size="sm" v-on:click="saveCard(true)">Archive</b-button>
        <!-- <b-form-checkbox
                    button
                    v-model='card.archived'
                    name='check-button'
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
      <div class="Label Red" @click="changeLabel('red')">
        Bug
        <i class="fa fa-check Vwhite" v-if="checkLabel('red')"></i>
      </div>
      <div class="Label Blue" @click="changeLabel('blue')">
        Duplicate
        <i class="fa fa-check Vwhite" v-if="checkLabel('blue')"></i>
      </div>
      <div class="Label Green" @click="changeLabel('green')">
        Enhancement
        <i class="fa fa-check Vwhite" v-if="checkLabel('green')"></i>
      </div>
      <div class="Label Yellow" @click="changeLabel('yellow')">
        Invalid
        <i class="fa fa-check Vwhite" v-if="checkLabel('yellow')"></i>
      </div>
      <div class="Label Purple" @click="changeLabel('purple')">
        Question
        <i class="fa fa-check Vwhite" v-if="checkLabel('purple')"></i>
      </div>
      <div class="Label Orange" @click="changeLabel('orange')">
        Wontfix
        <i class="fa fa-check Vwhite" v-if="checkLabel('orange')"></i>
      </div>
    </b-modal>

    <!-- Modal Members Component -->
    <b-modal id="modal6" title="Members" v-if="board.users">
      <div v-for="user in board.users" :key="user">
        <div class="container-member" @click="memberToCard(user._id)">
          <div class="container-name-member">
            <div
              class="logo-user-name"
            >{{user.firstName[0].toUpperCase()}}{{user.lastName[0].toUpperCase()}}</div>
            <div class="name-member">{{user.firstName}} {{user.lastName}} ({{user.userName}})</div>
          </div>
          <div>
            <i class="fa fa-check" v-if="checkMember(user._id)"></i>
          </div>
        </div>
      </div>
      <hr>
      <pre>card {{card}}</pre>
      <hr>
    </b-modal>

    <!-- Modal Checklist Component -->
    <b-modal id="modal5" title="Checklist" hide-footer>
      <form class="add-checklist" @submit="addCheklist()">
        Title
        <b-form-input type="text" v-model="checklist.title"/>
        <b-button class="mt-3 float-right" type="submit">create</b-button>
      </form>
    </b-modal>
  </b-modal>
  <!-- </section> -->
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'CardEdit',
  data() {
    return {
      comment: '',
      openModalMembers: false,
      SumMember: false,
      checklist: {
        title: '',
        toDos: []
      },
      toDo: { name: '', done: false },
      editStatus: false
    }
  },
  created() {
    var cardId = this.$route.params.cardId
    this.$store.dispatch({ type: 'loadCard', cardId }).then(card => {
      this.card = card
    })
  },
  mounted() {
    this.$refs.myModalRef.show()
  },
  computed: {
    card: {
      get() {
        return this.$store.getters.getCurrCard
      },
      set(cardItem) {
        this.$store.commit('setCard', { card: cardItem })
      }
    },
    board: {
      get() {
        return this.$store.getters.getBoard
      },
      set(boardItem) {
        this.$store.commit('setBoard', { board: boardItem })
      }
    },
    lists() {
      return this.$store.getters.getLists.filter(
        list => list._id !== this.card.listId
      )
    },

    showModal: {
      get() {
        return this.$route.meta.showModal
      },
      set(value) {
        // this.$store.commit('setCard', { card: cardItem })
        this.$route.meta.showModal = value
      }
    },
    share() {
      return window.location.href
    }
  },
  methods: {
    memberToCard(userId) {
      const index = this.card.members.findIndex(member => member === userId)
      if (index === -1) {
        this.card.members.push(userId)
      } else {
        this.card.members.splice(index, 1)
      }
    },
    checkMember(userId) {
      return this.card.members.findIndex(member => member === userId) === -1
        ? false
        : true
    },
    checkSumMember() {
      var sum = 0
      this.card.members.forEach(member => {
        sum++
      })
      if (sum > 2) {
        return true
      }
    },
    closeEditor() {
      this.editStatus = !this.editStatus
    },
    checkDone() {
      this.toDo.done = !this.toDo.done
      // this.card.checklists.forEach(checklist => {
      //     if (checklist.title === this.checklist.title) {
      //   checklist.toDo.done = !checklist.toDo.done
      //     }
      //   })
    },
    addCheklist() {
      this.checklist.toDos.push(this.toDo)
      this.card.checklists.push(this.checklist)
    },
    addToDo() {
      this.card.checklists.forEach(checklist => {
        if (checklist.title === this.checklist.title) {
          checklist.toDos.push(this.toDo)
          this.toDo = { name: '', done: false }
        }
      })
    },
    addMember(member) {
      this.card.members.push(member)
    },
    checkLabel(color) {
      return this.card.labels.findIndex(label => label === color) === -1
        ? false
        : true
    },
    markChose() {
      this.card.labels.forEach(label => {
        this.labelIsChosen.forEach(color => {
          if (label === color) {
            this.labelIsChosen = true
          }
        })
      })
    },

    changeLabel(chosenColor) {
      const index = this.card.labels.findIndex(label => label === chosenColor)
      if (index === -1) {
        this.card.labels.push(chosenColor)
      } else {
        this.card.labels.splice(index, 1)
      }
    },
    closeModal() {
      // this.$refs.myModalRef.hide()
      // this.$router.push('/card')
      // this.$router.push('/board/' + this.$store.getters.getBoard._id)
      this.$router.go(-1)
    },
    saveCard(archive) {
      console.log('archive', archive)
      if (archive) this.card.archived = true
      console.log('Saving card..', this.card)
      this.$store
        .dispatch({ type: 'saveCardToList', card: this.card })
        .then(card => {
          let activity = ActivityService.getEmptyActivity()
          activity.text = ' changed the card in list '
          activity.userId = this.$store.getters.loggedInUser._id
          activity.boardId = this.board._id
          activity.listId = card.listId
          activity.cardId = card._id
          activity.createdAt = moment(Date.now()).format(
            'MMMM Do YYYY, h:mm:ss a'
          )
          this.$store.dispatch({ type: 'saveActivity', activity })
          // this.$router.push('/card')
          // this.$router.push('/board/' + this.$store.getters.getBoard._id)
          this.$router.go(-1)
        })
        .catch(err => {
          console.log(err)
          // this.$router.push('/card')
          // this.$router.push('/board/' + this.$store.getters.getBoard._id)
          this.$router.go(-1)
        })
    },

    addComment() {
      if (this.comment) {
        // var date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
        var date = moment(Date.now()).format('DD/MM/YY hh:mm')
        var comment = date + ' ' + this.comment
        if (!this.card.comments) this.card.comments = [comment]
        else this.card.comments.unshift(comment)
        this.comment = ''
      }
    },
    modalClosed() {
      console.log('modalClosed')
      // this.$router.push('/card')
      // this.$router.push('/board/' + this.$store.getters.getBoard._id)
      this.$router.go(-1)
    },
    moveCard() {
      // console.log(this.$store.getters.getLists)
      this.$store.getters.getLists.map(list => console.log(list.title))
    }
  },

  components: {},
  // watch: {
  //   card: function() {
  //     console.log('change in card')
  //     this.$store.dispatch({ type: 'saveCard', card: this.card })
  //   }
  // },
  '$route.meta'({ showModal }) {
    this.showModal = showModal
  }
}
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
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: rgb(255, 255, 255);
  justify-content: flex-start;
}
.name-member {
  margin-left: 8px;
}
</style>
