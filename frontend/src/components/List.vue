<template>
  <section class='list'>
    <div class='title-list' v-if='!isChangeTitle' @click.prevent='choseTitle'>{{list.title}}</div>
    <form v-if='isChangeTitle' @submit.prevent='changeTitle' class='form-add'>
      <input
        class='input-title-list'
        ref='title'
        v-model='list.title'
        placeholder='Enter title here...'
        autofocus
      >
      <button class='btn-title-list' type='submit'>
        <i class='fa fa-plus'></i>
      </button>
    </form>
    <!-- <draggable
      v-model='list.cards'
      v-bind='dragOptions'
      group='list'
      @start='drag=true'
      @end='endMoveCard'
      :move='moveCard'
      class="drag-list"
    >
      <transition-group class="drag-group" type='transition'>
          <div v-for='card in list.cards' :key='card._id'>
            <card-preview v-if='!card.archived' :card='card'></card-preview>
          </div>
          
      </transition-group>
    </draggable> -->
     <Container
            group-name="list"
            @drop="(e) => onCardDrop(list._id, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(list._id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in list.cards" :key="card._id">
              <!-- <div :class="card.props.className" :style="card.props.style">
                <p>{{ card.data }}</p>
              </div> -->
              <!-- <card-preview v-if='!card.archived' :card='card'></card-preview> -->
              <card-preview :card='card'></card-preview>
            </Draggable>
      </Container>
    <!-- <ul class='list-cards'>
            <li v-for='card in list.cards' :key='card._id'>
                <card-preview v-if='!card.archived' :card='card'></card-preview>
            </li>
    </ul>-->
    <button class='list-add-card' v-if='!isAddClick' @click='newCard'>
      Add card
      <i class='fa fa-plus'></i>
    </button>
    <form v-if='isAddClick' @submit.prevent='addCard' class='list-add-card form-add-card'>
      <div>
        <textarea class='text-area' v-model='card.title' placeholder='Enter text here...' autofocus></textarea>
      </div>
      <div class='container-add-card-btns'>
        <button class='list-new-card-options' type='submit'>Add card</button>
        <button class='list-x-card-options' @click='closeAdd'>&times;</button>
      </div>
    </form>
  </section>
</template>

<script>
import CardPreview from '@/components/CardPreview.vue'
import CardService from '../services/CardService.js'
// import draggable from 'vuedraggable'
import ListService from '../services/ListService.js'
import ActivityService from '../services/ActivityService.js'
import SocketService from '../services/SocketService.js'
import moment from 'moment'
import { Container, Draggable } from 'vue-smooth-dnd'
export default {
  name: 'list',
  props: ['list'],
  data() {
    return {
      isAddClick: false,
      moveCardId: null,
      fromListId: null,
      toListId: null,
      fromList: null,
      toList: null,
      isChangeTitle: false,
      hasfocus: false,
      // toListFutureIndex: -1
      // cardTitle: null,
      // currList: null
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  components: {
    CardPreview,
    // draggable,
    Container,
    Draggable
  },
  methods: {
    onCardDrop (listId, dropResult) {
      console.log('onCardDrop', dropResult);
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        // const scene = Object.assign({}, this.scene)
        // const column = scene.children.filter(p => p.id === columnId)[0]
        const fromList = this.$store.getters.getLists.find(list => list._id === listId);
        // const columnIndex = scene.children.indexOf(column)
        const fromListIndex = this.$store.getters.getLists.indexOf(fromList);
        // const newColumn = Object.assign({}, column)
        const newList = Object.assign({}, this.list);
        newList.cards = this.applyDrag(newList.cards, dropResult);
        // scene.children.splice(columnIndex, 1, newColumn)
        // this.scene = scene
      }
    },
    log (...params) {
      // console.log(...params)
    },
    getCardPayload (listId) {
      return index => {
        return this.list.cards[index];
      }
    },
    applyDrag (arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

  return result
},
    moveCard(evt) {
      console.log(evt.relatedContext);
      
      this.moveCardId = evt.draggedContext.element._id
      this.fromListId = evt.draggedContext.element.listId
      this.toListId = evt.relatedContext.element.listId
      this.fromList = this.$store.getters.getLists.find(
        list => list._id === this.fromListId
      )
      this.toList = this.$store.getters.getLists.find(
        list => list._id === this.toListId
      )
      // if (this.toList.cards.length === 0) {
      //   this.toList.cards =
      // }
      
    },
    endMoveCard(evt) {
      if (this.fromListId === this.toListId) {
        for (var i = 0; i < this.fromList.cards.length; i++) {
          this.fromList.cards[i].order = i
        }
        this.$store
          .dispatch({ type: 'saveList', list: this.fromList })
          .then(() => {
            SocketService.send(this.list.boardId)
          })
      } else {
        var testCard = this.toList.cards.find(
          card => card.listId === this.fromListId
        )
        for (var i = 0; i < this.fromList.cards.length; i++) {
          this.fromList.cards[i].order = i
        }
        this.$store.dispatch({ type: 'saveList', list: this.fromList })
        testCard.listId = this.toListId
        for (var j = 0; j < this.toList.cards.length; j++) {
          this.toList.cards[j].order = j
        }
        this.$store
          .dispatch({ type: 'saveList', list: this.toList })
          .then(() => {
            SocketService.send(this.list.boardId)
          })
      }
      SocketService.send(this.list.boardId)
      // this.$store.dispatch({ type: 'saveCard', card: this.card })
      //     .then(res => {
      //         console.log(res)
      //         console.log(this.toList)
      //         this.$store.dispatch({ type: 'saveList', list: this.fromList })
      //         if (this.fromListId !== this.toListId) {
      //             this.$store.dispatch({ type: 'saveList', list: this.toList })
      //         }
      //         // console.log(this.toList)
      //         // this.toList.cards.splice(this.toListFutureIndex, 0, this.card)
      //         // console.log(this.toList)
      //     })
      //     .catch(err => {
      //         console.log(err)
      //     })
    },
    newCard() {
      // this.cardTitle = CardService.getEmpty()
      console.log('new card', this.card)
      console.log((this.card.order = this.list.cards.length + 1))
      this.isAddClick = !this.isAddClick
    },
    closeAdd() {
      this.isAddClick = !this.isAddClick
    },
    addCard() {
      this.card.listId = this.list._id
      // (this.card.order = this.list.cards[this.list.cards.length - 1].order + 1),
      this.card.order = this.list.cards.length
      this.$store
        .dispatch({ type: 'saveCardToList', card: this.card })
        .then(card => {
          var boardId = this.list.boardId
          let activity = ActivityService.getEmptyActivity()
          activity.text = ' added a new card to list '
          activity.userId = this.$store.getters.loggedInUser._id
          activity.boardId = boardId
          activity.listId = this.list._id
          activity.cardId = card._id
          activity.createdAt = moment(Date.now()).format(
            'MMMM Do YYYY, h:mm:ss a'
          )
          this.$store.dispatch({ type: 'saveActivity', activity })
          var cardItem = CardService.getEmptyCard()
          this.$store.commit('setCard', { card: cardItem })
          this.$store.dispatch({ type: 'loadBoard', boardId })
          SocketService.send(boardId)
        })
      this.isAddClick = !this.isAddClick
    },
    choseTitle() {
      console.log('isChangeTitle', this.isChangeTitle)
      this.isChangeTitle = !this.isChangeTitle
    },
    changeTitle() {
      console.log('this.list', this.list)
      this.$store.dispatch({ type: 'saveList', list: this.list })
      this.isChangeTitle = !this.isChangeTitle
      SocketService.send(this.list.boardId)
    }
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
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  created() {
    var cardItem = CardService.getEmptyCard()
    this.$store.commit('setCard', { card: cardItem })
    // this.currList = this.list
  },
  watch: {
    // list: function() {
    //   console.log('change in list')
    //   this.$store.dispatch({ type: 'saveList', list: this.list })
    //   SocketService.send(this.list.boardId)
    // }
  }
}
</script>

<style lang='scss'>
.title-list {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  margin: 10px 0 4px;
  font-size: 18px;
  color: rgb(0, 2, 34);
  font-weight: bold;
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
  display: flex;
}
.list-add-card {
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
.form-add-card {
  width: 270px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px;
}
.text-area {
  min-width: 270px;
  height: 80px;
  border: none;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  padding: 5px;
  margin-top: 10px;
}
.container-add-card-btns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.list-add-card:hover {
  background-color: rgba(199, 199, 199, 0);
  color: rgb(0, 0, 0);
}
.list-new-card-options {
  background-color: rgb(51, 236, 66);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 0 3px;
}
.list-x-card-options {
  background-color: rgba(51, 236, 66, 0);
  border: none;
  width: 20px;
}
.input-title-list {
  font-size: 18px;
  font-weight: bold;
  height: 32px;
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.911);
  padding-left: 10px;
}
.btn-title-list {
  background: rgba(255, 255, 255, 0.911);
  border: none;
}
.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}
.drag-list {
  min-height: 50px;
}
.drag-group {
  min-height: 50px;
}

.draggable-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-bottom: 2px;
    margin-top: 2px;
    cursor: default;
    user-select: none;
}

.draggable-item-horizontal {
    height: 300px;
    padding: 10px;
    line-height: 100px;
    text-align: center;
    /* width : 200px; */
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-right: 4px;
    cursor: default;
}

.dragging {
    background-color: yellow;
}

.card-scene {
    padding: 50px;
    /* background-color: #fff; */
}

.card-container {
    width: 320px;
    padding: 10px;
    margin: 5px;
    margin-right: 45px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
}

.card {
    margin: 5px;
    /* border: 1px solid #ccc; */
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    padding: 10px;
}

.card-column-header {
    font-size: 18px;
}

.column-drag-handle {
    cursor: move;
    padding: 5px;
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}

.opacity-ghost {
    transition: all .18s ease;
    opacity: 0.8;
    /* transform: rotateZ(5deg); */
    background-color: cornflowerblue;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
    opacity: 1;
    /* transform: rotateZ(0deg); */
    background-color: white;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}


.form-demo {
    width: 650px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    display: flex
}

.form {
    flex: 3;
    /* width: 500px; */
    /* background-color: #f3f3f3; */
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 6px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
}

.form-fields-panel {
    flex: 1;
    margin-right: 50px;
}


.form-ghost {
    transition: 0.18s ease;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.08);
}

.form-ghost-drop {
    box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.0);
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
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
//     font-family: 'Open Sans', sans-serif;
//     font-weight: 400;
//     font-size: 12px;
//     color: #4d4d4d;
// }
// .list {
//     padding-top: 10px;
//     width: 275px;
//     background-color: #e2e4e6;
//     border-radius: 3px;
//     font-family: 'Open Sans', sans-serif;
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
//         font-family: 'Open Sans', sans-serif;
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