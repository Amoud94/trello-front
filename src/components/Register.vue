<template>
  <div class="ui container">
    <div class="ui stackable middle aligned center aligned grid">
      <div class="row">
        <h2 class="ui center teal aligned header">
          <div class="content">Create your account</div>
        </h2>
      </div>
      <div class="ui row">
        <div class="ten wide column">
          <div class="ui form">
            <div class="ui teal segment">
              <div class="two fields">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input
                      v-model="data.firstname"
                      type="text"
                      class="form control"
                      name="firstname"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input
                      v-model="data.lastname"
                      type="text"
                      class="form control"
                      name="lastname"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              <div class="fields">
                <div class="ten wide field">
                  <div class="ui left icon input">
                    <i class="key icon"></i>
                    <input
                      v-model="data.username"
                      type="text"
                      class="form control"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div class="six wide field">
                  <select class="ui dropdown" v-model="data.sex">
                    <option selected value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="two fields">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input
                      v-model="data.password"
                      type="password"
                      class="form control"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input
                      v-model="confirmedPassword"
                      type="password"
                      class="form control"
                      name="confirmedPassword"
                      placeholder="Confirme your password"
                    />
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="mail icon"></i>
                  <input
                    v-model="data.email"
                    type="text"
                    class="form control"
                    name="email"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="phone icon"></i>
                  <input
                    v-model="data.phoneNumber"
                    type="text"
                    class="form control"
                    name="phoneNumber"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div class="ui fluid teal submit button" @click="SignIn(data)">
                <span>Sign Up</span>
              </div>
            </div>
            <div class="ui error message"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import authService from "../services/auth-service.js";

export default {
  data() {
    return {
      data: {},
      confirmedPassword: "",
      message: "",
    };
  },
  computed: {},
  methods: {
    SignIn(data) {
      if (data.password === this.confirmedPassword) {
        data.role = "user";
        this.$SERVICES
          .register(data)
          .then((response) => {
            console.log(response);
            if (response.data) {
              this.$router.push("/login");
              this.$notify({
                group: "crud",
                title: "Success message",
                type: "success",
                text: "User is registered with success!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (data.password != this.confirmedPassword && data.password) {
        this.$notify({
          group: "crud",
          title: "Warring message",
          type: "warn",
          text: "Password does not match ! please re-enter your passwords",
        });
      }
    },
  },
  mounted() {
    $(".ui.dropdown").dropdown();
    $(".ui.form").form({
      fields: {
        firstname: "empty",
        lastname: "empty",
        username: "empty",
        password: ["minLength[6]", "empty"],
        confirmedPassword: ["minLength[6]", "empty"],
        email: "empty",
        phoneNumber: "empty",
      },
    });
  },
};
</script>

<style scoped>
.container {
  padding-top: 10px;
}

label {
  display: block;
  margin-top: 10px;
}
</style>