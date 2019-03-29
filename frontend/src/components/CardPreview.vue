<template>
  <div class="card-preview">
    <router-link :to="{ name: 'Card Edit', params: { cardId: card._id } }">
      <section class="title-card">
        <div class="containerHead">
          <ul class="labels">
            <li class="label-li" v-for="label in card.labels" :key="label">
              <div class="label" :style="{background: label}"></div>
            </li>
          </ul>
        </div>
        <div class="card-middle">
          <div class="title-card-text">{{card.title}}</div>
          <div
            class="due-date"
            v-if="card.dueDate"
            :style="{ background: checkDoDate() }"
          >{{changeDate}}</div>
        </div>
        <div class="info-bar">
          <div class="info-bar-left">
            <div class="info-bar-marks" title="cardDescr()" v-if="card.description">
              <i class="fas fa-bars"></i>
            </div>
            <div
              class="info-bar-marks"
              title="You have card.checklists.length checklists"
              v-if="card.checklists.length !== 0"
            >
              <i class="fas fa-list"></i>
            </div>
          </div>
          <div class="info-bar-center">
            <div class="et far fa-clock fa-xs" v-if="card.et && !card.at">ET: {{card.et}}</div>
            <div class="at far fa-clock fa-xs" v-if="card.at">AT: {{card.at}}</div>
          </div>
          <div class="info-bar-right">
            <section class="container-member">
              <div v-for="user in this.card.users.slice(0, 2)" :key="user._id">
                <div class="container-name-member">
                  <div class="logo-user-name">{{user.firstName[0]}}{{user.lastName[0]}}</div>
                </div>
              </div>
              <div class="logo-user-name" v-if="checkSumMember()">
                <i class="fas fa-plus"></i>
              </div>
            </section>
          </div>
        </div>
      </section>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CardPreview",
  props: ["card"],
  created() { },
  data() {
    return {};
  },
  computed: {
    board: {
      get() {
        return this.$store.getters.getBoard;
      },
      set(boardItem) {
        this.$store.commit("setBoard", { board: boardItem });
      }
    },
    users() {
      var usertodisplay = [];
      for (let i = 0; i < this.board.users.length; i++) {
        var user = this.board.users[i];
        if (user) {
          usertodisplay.push(user);
        }
      }
      return usertodisplay;
    },
    changeDate() {
      return moment(this.card.dueDate, 'YYYY/MM/DD').format('DD/MM')
    }
  },
  methods: {
    checkMember(userId) {
      return this.card.members.findIndex(member => member === userId) === -1;
    },
    checkSumMember() {
      if (this.card.users.length > 2) {
        return true;
      }
    },
    checkDoDate() {
      let dateAsMoment = moment(this.card.dueDate, 'YYYY/MM/DD')
      let today = moment()
      if (dateAsMoment.diff(today, 'days') <= -1) return '#544e44'
      if (dateAsMoment.diff(today, 'days') <= 1) return '#e52e2d'
      if (dateAsMoment.diff(today, 'days') <= 3) return '#eea41c'
      return '#3b8006'

    }
  },
  components: {}
};
</script>
<style lang='scss' scoped>
a {
  text-decoration: none;
  outline: none;
  text-decoration-line: none;
  text-decoration-style: none;
}

a:hover {
  text-decoration: none;
  outline: none;
  text-decoration-line: none;
  text-decoration-style: none;
}
.label-li {
  height: 10px;
}
.labels {
  display: flex;
  justify-content: flex-start;
}
.label {
  margin: 0 3px;
  width: 37px;
  height: 9px;
  border-radius: 20px;
}
.title-card {
  padding: 4px;
  min-width: 270px;
  max-width: 270px;
  min-height: 90px;
  max-height: 250px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  margin: 0.7px 3px;
  box-shadow: 0px 5px 6px -4px rgba(0, 0, 0, 0.4);
  border-bottom: 0.9px solid rgb(167, 165, 165);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  transition: 0.2s;
}
.title-card:hover {
  background-color: rgb(250, 250, 250);
}
.card-middle {
  display: flex;
  width: 100%;
  & .title-card-text {
    color: black;
    font-size: 18px;
    display: flex;
    justify-self: center;
    align-self: center;
    width: 190px;
    justify-content: flex-start;
  }
  & .due-date {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    justify-items: center;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 255, 255);
    padding: 5px 10px 5px 10px;
    border-radius: 25px;
  }
}

.card-preview {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.containerHead {
  height: 25px;
  top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.info-bar {
  color: #525252;
  width: 100%;
  display: flex;
  bottom: 5px;
}

.info-bar-left {
  display: flex;
  min-width: 75px;
  justify-content: flex-start;
}

.info-bar-right {
  display: flex;
  flex-direction: row-reverse;
  min-width: 75px;
  align-items: center;
  justify-items: flex-end;
}

.info-bar-center {
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-bar-marks {
  margin: 5px;
}

.container-member {
  display: flex;
  flex-direction: row;
}
.logo-user-name {
  font-size: 10px;
  font-weight: bold;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
  color: black;
  border: 1px solid rgb(133, 133, 133);
  background-color: rgb(243, 243, 243);
  justify-content: flex-start;
}
</style>
