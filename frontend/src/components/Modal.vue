<template>
  <!-- template for the modal component -->
  <script v-if="card && showModal" type="text/x-template" id="modal-template">
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container">
                  <div class="modal-header">
                        <div class="model-title"  @click="isTitleEdit=!isTitleEdit">
                            <h2 class="card-title">{{card.title}}</h2>
                            <textarea
                                v-if="isTitleEdit"
                                class="card-title-input no-drag"
                                v-model="card.title"
                                placeholder="Enter title here..."
                                autofocus
                            ></textarea>
                        </div>
                        <div class="title-list-contect">in list {{card.list.title}}</div>
                  </div>

                  <div class="modal-body">

                  </div>
                <div class="modal-sidebar">
                    
                </div>
                  <div class="modal-footer">
                      <slot name="footer">
                          <button class="modal-default-button" v-on:click="emitSave">Save</button>
                          <button class="modal-default-button" v-on:click="emitClose">Close</button>
                      </slot>
                  </div>
              </div>
          </div>
      </div>
  </transition>
  </script>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isTitleEdit: false,
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
    },
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    emitSave() {
      this.$emit('save');
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  margin: 20px 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  height: 10px;
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  margin: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
