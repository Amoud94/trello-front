<template>
  <div class="ui container">
    <div class="ui stackable grid">
      <div class="ui row">
        <div class="six wide column">
          <div class="ui fluid action input">
            <input
              type="text"
              placeholder="Add new board list"
              v-model="list"
              @keyup.enter="addNewList()"
            />
            <button class="ui teal button" @click="addNewList()">
              Add new list
            </button>
          </div>
        </div>
      </div>

      <div class="ui row" v-if="dataExist">
        <div
          class="ui four wide column"
          id="list"
          v-for="elm in arrList"
          :key="elm.name"
        >
          <board-list :data="elm" @remove-list="removeList"></board-list>
        </div>
      </div>
      <div v-else>
        <data-not-found></data-not-found>
      </div>
    </div>
  </div>
</template>

<script>
import BoardList from "./List.vue";
import DataNotFound from "./UI/DataNotFound.vue";

export default {
  components: {
    BoardList,
    DataNotFound,
  },
  data() {
    return {
      message: "",
      boardID: "",
      list: "",
      arrList: [],
    };
  },
  computed: {
    dataExist() {
      const lenght = this.arrList.length;
      if (lenght == 0) {
        return false;
      }
      return true;
    },
  },

  methods: {
    getAllBoardList() {
      this.$SERVICES
        .getBoardLists(this.boardID)
        .then((response) => {
          if (response.data) {
            this.arrList = response.data.ReturnedData;
          }
        })
        .catch((error) => (this.message = error));
    },

    addNewList() {
      this.$SERVICES
        .createNewBoardList({
          boardId: this.boardID,
          list: {
            ref: "list_" + this.list.split(" ").join(""),
            name: this.list,
            tasks: [],
          },
        })
        .then((response) => {
          if (response.data) {
            this.arrList.push(response.data.ReturnedData);
            // this.getAllBoardList();
          }
          this.$notify({
            group: "crud",
            title: "Success message",
            type: "success",
            text: "List is created with success!",
          });
        })
        .catch((error) => {
          this.message = error;
          console.log(this.message);
        });
      this.list = "";
    },

    removeList(id) {
      this.$SERVICES
        .deleteBoardList(id)
        .then((response) => {
          if (response.status == 200)
            this.arrList = this.arrList.filter((elm) => elm.boardListID !== id);
          this.$notify({
            group: "crud",
            title: "Confirmation message",
            type: "warn",
            text: "List is deleted with success!",
          });
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.boardID = this.$route.params.boardID;
  },

  mounted() {
    this.getAllBoardList();
  },
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 290px;
}
#list {
  padding-bottom: 1.3em;
}
</style>
