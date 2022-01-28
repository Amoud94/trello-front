<template>
  <div class="container">
    <div class="ui middle aligned center aligned grid">
      <div class="row">
        <h2 class="ui center teal aligned header">
          <div class="content">Log-in to your account</div>
        </h2>
      </div>
      <div class="ui row">
        <div class="six wide column">
          <div class="ui form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input
                    v-model="user.username"
                    type="text"
                    class="form control"
                    name="username"
                    placeholder="Nom d'utilisateur"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form control"
                    name="password"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
              <div class="ui fluid teal submit button" @click="handleLogin()">
                <span>Log In</span>
              </div>
            </div>
            <div class="ui error message"></div>
          </div>
          <div class="ui teal message">
            New to us ? <router-link to="/register">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getUser;
    },
  },
  beforeMount() {
    if (this.loggedIn.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$SERVICES
          .login(this.user)
          .then((response) => {
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setUser", response.data);
            console.log(response);
            if (response.data.loggedIn) {
              this.$notify({
                group: "crud",
                title: "Success message",
                type: "success",
                text: "Logged In with success!",
              });
            }
            this.$router.push("/dashBoards");
          })
          .catch((error) => {
            console.log(error);
            this.user.username = "";
            this.user.password = "";
            this.$notify({
              group: "crud",
              title: "Warning message",
              type: "warn",
              text: "Invalid username or password !",
            });
          });
      }
    },
  },
  mounted() {
    $(".ui.form").form({
      fields: {
        username: "empty",
        password: ["empty"],
      },
    });
  },
};
</script>

<style scoped>
.container {
  padding-top: 30px;
}

label {
  display: block;
  margin-top: 10px;
}
</style>