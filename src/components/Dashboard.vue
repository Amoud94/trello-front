<template>
  <div class="ui container">
    <div class="ui stackable grid">
      <div class="ui row">
        <div class="seven wide column">
          <div class="ui fluid action input">
            <input
              type="text"
              placeholder="Board name..."
              v-model="board"
              @keyup.enter="addNewBoard()"
            />
            <button class="ui teal button" @click="addNewBoard()">
              Add new board
            </button>
          </div>
        </div>
      </div>
      <div class="ui row" v-if="dataExist">
        <div class="ui four wide column" v-for="elm in boards" :key="elm.id">
          <div class="ui card" id="card">
            <div class="content">
              <div class="header">
                <router-link :to="'/boards/' + elm.boardID">{{
                  elm.name
                }}</router-link>
              </div>
            </div>
            <div class="content">
              <h4 class="ui sub header">Description</h4>
              <br>
              <p>We set the value to update value so that a table will be created</p>
            </div>
            <div class="extra center aligned content">
              <button
                class="ui small negative button"
                @click="removeBoard(elm.boardID)"
              >
                Delete board
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <data-not-found></data-not-found>
      </div>
    </div>
  </div>
</template>

<script>
import DataNotFound from "./UI/DataNotFound.vue";
export default {
  components: {
    DataNotFound,
  },
  data() {
    return {
      board: "",
      boards: [],
    };
  },
  computed: {
    dataExist() {
      const lenght = this.boards.length;
      if (lenght == 0) {
        return false;
      }
      return true;
    },
    UserData() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    addNewBoard() {
      this.$SERVICES
        .createNewBoard({
          usrId: this.UserData.userID,
          board: {
            name: this.board,
            ref: "brd_" + this.board.split(" ").join(""),
            lists: [],
          },
        })
        .then((response) => {
          if (response.data) {
            console.log("response:", response);
            if (response.data.ReturnedData) {
              this.boards.push(response.data.ReturnedData);
              this.$notify({
                group: "crud",
                title: "Success message",
                type: "success",
                text: "Board is created with success!",
              });
            }
          }
        })
        .catch((error) => {
          this.message = error;
        });
      this.board = "";
    },

    getAllBoards() {
      this.$SERVICES
        .getUserBoards(this.UserData.userID)
        .then((response) => {
          console.log("response:", response);
          this.boards = response.data.ReturnedData;
        })
        .catch((error) => console.log(error));
    },

    removeBoard(data) {
      this.$SERVICES
        .deleteUserBoard(data)
        .then((response) => {
          if (response.status == 200)
            this.boards = this.boards.filter((elm) => elm.boardID !== data);
          this.$notify({
            group: "crud",
            title: "Confirmation message",
            type: "warn",
            text: "Board is deleted with success!",
          });
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.getAllBoards();
  },
};
</script>

<style scoped>
#card {
  margin-bottom: 0.8em;
}
</style>

