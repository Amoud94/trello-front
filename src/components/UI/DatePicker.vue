<template>
  <div class="ui container">
    <h4 class="ui top attached center aligned disabled header">Dates</h4>
    <div class="ui compact attached segment">
      <datepicker
        :highlighted="highlighted"
        :value="date"
        :inline="true"
      ></datepicker>
    </div>
    <div class="ui compact attached segment">
      <div class="ui form">
        <div class="grouped fields">
          <div class="field">
            <label>Date de début</label>
            <div class="inline fields">
              <div class="field">
                <div class="ui checkbox">
                  <input type="checkbox" v-model="startDate" name="example" />
                  <label></label>
                </div>
              </div>
              <div class="field">
                <div class="ui mini input" style="width: 100px">
                  <input
                    type="text"
                    placeholder="D/M/YYYY"
                    v-model="highlighted.from"
                    :disabled="!startDate"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label>Date limit</label>
            <div class="inline fields">
              <div class="field">
                <div class="ui checkbox">
                  <input type="checkbox" v-model="limitDate" name="example" />
                  <label></label>
                </div>
              </div>
              <div class="field">
                <div class="ui mini input" style="width: 100px">
                  <input
                    type="text"
                    placeholder="D/M/YYYY"
                    v-model="highlighted.to"
                    :disabled="!limitDate"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui mini input" style="width: 80px">
                  <input
                    type="text"
                    placeholder="HH:mm"
                    :disabled="!limitDate"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label>Définir un rappel </label>
            <select class="ui dropdown">
              <option value="">Aucun</option>
              <option value="1">À la date limite</option>
              <option value="0">15 minutes avant</option>
              <option value="0">30 minutes avant</option>
              <option value="0">1 heure avant</option>
              <option value="0">2 heure avant</option>
              <option value="0">1 jour avant</option>
              <option value="0">2 jours avant</option>
            </select>
            <div class="ui message">
              <p>
                Les rappels seront envoyés à tous les membres et les
                observateurs de cette carte.
              </p>
            </div>
          </div>
          <div class="field">
            <button class="ui fluid primary button">Enregistrer</button>
          </div>
          <div class="field">
            <button class="ui fluid basic button">Effacer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      highlighted: {
        from: new Date(),
        to: new Date(2021,10,20),
      },
      startDate: false,
      limitDate: false,
      date: Date.now(),
    };
  },
  computed:{
    //   highlighted(){
    //       if(this.highlighted){
    //           this.highlighted.from = new Date(this.highlighted.from )
    //       }
    //   }
  }
};
</script>

<style  scoped>
.container {
  margin: auto;
}
</style>