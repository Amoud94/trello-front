<template>
  <div class="ui stackable container">
    <div class="ui teal card">
      <div class="content">
        <div class="ui grid">
          <div class="row">
            <div class="twelve wide column">
              <h3>{{ data.name }}</h3>
            </div>
            <div class="four wide column">
              <button
                class="circular red tiny ui icon button"
                @click="deleteList(data.boardListID)"
              >
                <i class="icon close"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <draggable
          :id="data.boardListID"
          class="list-group kanban-column"
          :list="data.tasks"
          @add="updateTask"
          :group="{ name: data.ref, pull: true, put: true }"
        >
          <div
            class="ui item"
            @click="show(element)"
            v-for="element in data.tasks"
            :key="element.name"
            :id="element.taskID"
          >
            <a class="ui fluid large teal label">
              {{ element.name }}
            </a>
          </div>
          <!-- <modal
            style="padding-top:30px; padding-bottom:30px"
            width="60%"
            height="auto"
            :scrollable="true"
            :adaptive="false"
            name="toto"
          >
            <card :data="currentTask"></card>
          </modal> -->
          <div class="ui fluid input">
            <input
              type="text"
              class="form-control"
              placeholder="Add new task"
              aria-describedby="button-addon2"
              @keyup.enter="addNewTask()"
              v-model="task"
            />
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card.vue";

export default {
  components: {
    draggable,
  },
  props: ["data"],
  data() {
    return {
      task: "",
      element: "",
      currentTask: "",
      attachedElements: [],
    };
  },
  computed: {
    boardID() {
      return this.$route.params.boardID;
    },
  },
  methods: {
    show(task) {
      this.currentTask = task;
      this.$modal.show(
        Card,
        { data: task },
        {
          width:800,
          height: "auto",
          scrollable: true,
          adaptive: false,
        }
      );
    },

    addNewTask() {
      if (this.task.trim()) {
        this.$SERVICES
          .createNewTask({
            listId: this.data.boardListID,
            task: {
              ref: "task_" + this.task.split(" ").join(""),
              name: this.task,
              status: this.data.name,
            },
          })
          .then((response) => {
            console.log(response);
            this.obj = response.data.ReturnedData;
            if (this.data.tasks != null) {
              this.data.tasks.push(this.obj);
            } else {
              this.data.tasks = [this.obj];
            }
          })
          .catch((error) => console.log(error));
      }
      this.task = "";
    },

    updateTask(evt) {
      console.log(evt);
      const task_id = evt.item.id;
      const task = this.data.tasks.find((elm) => elm.taskID == task_id);
      this.$SERVICES
        .updateTaskStatus({
          task: task,
          ListID: evt.to.id,
        })
        .then(() => {})
        .catch((error) => console.log(error));
    },

    deleteList(data) {
      this.$emit("remove-list", data);
      this.data.tasks = this.data.tasks.filter((elm) => elm.taskID !== data);
    },
  },
};
</script>

<style scoped>
.ui.card {
  background-color: rgb(228, 228, 228);
}
.item {
  padding-bottom: 0.3em;
}
</style>
