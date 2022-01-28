<template>
  <div class="ui container">
    <div class="ui grid">
      <div class="row">
        <div class="column">
          <h2 class="ui header">
            <i class="clipboard outline icon"></i>
            <div class="content">
              {{ data.name }}
              <div class="sub header">In list {{ data.status }}</div>
            </div>
          </h2>
        </div>
      </div>
      <div class="two column row">
        <div class="twelve wide column">
          <div class="row">
            <div class="column">
              <div class="ui basic segment">
                <h5 class="ui header">
                  <i class="user circle icon"></i>
                  <div class="content">Members</div>
                </h5>
                <button class="ui tiny circular positive icon button">
                  <i class="user icon"></i>
                </button>
                <button class="ui tiny circular icon button">
                  <i class="add icon"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- Attached files  -->

          <div v-if="dataExist">
            <div>
              <div class="row">
                <div class="column">
                  <div class="ui basic segment">
                    <h5 class="ui header">
                      <i class="paperclip icon"></i>
                      <div class="content">Attatched Files :</div>
                    </h5>
                    <div v-if="loaded">
                      <div
                        class="ui tertiary inverted segment"
                        style="height: 100px; margin-bottom: 30px"
                      >
                        <div class="ui active inverted dimmer">
                          <div class="ui text loader">Loading</div>
                        </div>
                        <p></p>
                      </div>
                    </div>
                    <div
                      class="ui content"
                      v-for="elm in data.attachments"
                      :key="elm.id"
                    >
                      <div class="ui two column grid">
                        <div class="fluid column">
                          <a class="ui card" :href="elm.uri">
                            <div class="content">
                              <div class="center aligned header">
                                <h5>{{ elm.name }}</h5>
                              </div>
                              <div class="center aligned description">
                                <p>
                                  {{ elm.type }}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>

                        <div class="fluid column">
                          <div class="two column grid">
                            <div class="column">
                              <button
                                class="tiny fluid ui basic button"
                                @click="downoladFile(elm.name)"
                              >
                                <i class="icon eye"></i>
                                View
                              </button>
                            </div>
                            <div class="column">
                              <button
                                class="tiny ui fluid negative button"
                                @click="removeFile(elm.fileID)"
                              >
                                <i class="icon trash"></i>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="column">
              <div class="ui basic segment">
                <h5 class="ui header">
                  <i class="align justify icon"></i>
                  <div class="content">Description</div>
                </h5>
                <div class="ui form">
                  <div class="field">
                    <textarea
                      placeholder="Add a more detailed discription..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="ui basic segment">
                <h5 class="ui header">
                  <i class="clipboard list icon"></i>
                  <div class="content">Activity</div>
                </h5>
                <div class="ui form">
                  <div class="field">
                    <textarea
                      placeholder="Write a comment..."
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="row">
            <div class="column">
              <h5 class="ui header">Add to card :</h5>
            </div>
            <div class="column">
              <div class="ui vertical labeled icon buttons">
                <button class="tiny left aligned ui button">
                  <i class="icon user"></i>
                  Members
                </button>
                <button class="tiny left aligned ui button">
                  <i class="icon tags"></i>
                  Labels
                </button>
                <button class="tiny left aligned ui button">
                  <i class="icon clipboard check"></i>
                  CheckList
                </button>
                <button
                  class="tiny left aligned ui button"
                  @click="DatePanel()"
                >
                  <i class="icon clock outline"></i>
                  Dates
                </button>
                <input
                  hidden="true"
                  type="file"
                  ref="fileInput"
                  @change="onFileSelected"
                />
                <button
                  class="tiny left aligned ui button"
                  @click="$refs.fileInput.click()"
                >
                  <i class="paperclip icon"></i>
                  Attachement
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="column">
                <h5 class="ui header">Actions :</h5>
              </div>
              <div class="column">
                <button class="tiny fluid left aligned ui basic button">
                  <i class="icon location arrow"></i>
                  Move
                </button>
              </div>
              <div class="column">
                <button class="tiny fluid left aligned ui basic button">
                  <i class="icon copy"></i>
                  Copy
                </button>
              </div>
              <div class="column">
                <button class="tiny fluid left aligned ui basic button">
                  <i class="icon archive"></i>
                  Archive
                </button>
              </div>
              <div class="column">
                <button class="tiny red fluid left aligned ui button">
                  <i class="icon trash"></i>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <modal name="datePanel"></modal> -->
  </div>
</template>

<script>
import DatePicker from "./UI/DatePicker.vue";
export default {
  components: {},
  props: ["data"],
  data() {
    return {
      modal_name : '',
      loading: false,
      selectedFile: "",
      attachedFiles: [],
      ressource: "",
    };
  },
  computed: {
    dataExist() {
      const lenght = this.data.attachments.length;
      if (lenght == 0) {
        return false;
      }
      return true;
    },
    loaded() {
      return this.loading;
    },
  },
  methods: {
    DatePanel() {
      this.$modal.show(DatePicker ,"datePanel", {
        style: {
          "padding-top": "20px ",
          "padding-bottom": "30px",
        },
        width: 330,
        height: "auto",
        scrollable: true,
        adaptive: false,
      });
    },
    onFileSelected(evt) {
      console.log(evt);
      this.selectedFile = evt.target.files[0];
      const data = new FormData();
      data.append("files", this.selectedFile);
      let taskID = this.data.taskID;
      this.$SERVICES
        .uploadFile(taskID, data)
        .then((this.loading = true))
        .then((response) => {
          console.log(response);
          this.data.attachments.push(response.data.ReturnedData);
          this.loading = false;
        })
        .catch((error) => console.log("error :", error));
      this.selectedFile = "";
    },
    downoladFile(file) {
      this.$SERVICES
        .downloadAttachedFile(file)
        .then((response) => {
          console.log(response);
          if (response) this.ressource = response.request.responseURL;
          window.location = this.ressource;
        })
        .catch((error) => console.log("error :", error));
    },
    removeFile(data) {
      console.log("file id :", data);
      this.$SERVICES
        .deleteAttachedFile(data)
        .then((response) => {
          console.log(response);
          if (response.status === 200)
            this.data.attachments = this.data.attachments.filter(
              (elm) => elm.fileID !== data
            );
        })
        .catch((error) => console.log("error :", error));
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1em;
}
.column {
  margin-bottom: 0.3em;
}
.row {
  padding-bottom: 0.5em;
}
</style>