<template>
  <div class="ui stackable inverted teal small menu">
    <a class="header item">LOGO</a>
    <router-link to="/dashBoards" class="item" v-if="currentUser"
      >Dashboard</router-link
    >
    <div class="right menu">
      <router-link to="/login" class="item" v-if="!currentUser">
        <div class="ui primary button">Sign In</div>
      </router-link>
      <a class="item" v-if="currentUser">
        <div>
          <img
            class="ui right avatar meduim image"
            src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
          />
          User Profile
        </div>
      </a>
      <a class="item" v-if="currentUser">
        <div class="ui red button" @click="signOut()">Sign Out</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentUser() {
      let user = this.$store.getters.getUser;
      if (user.loggedIn) {
        return user.loggedIn;
      }
      return false;
    },
  },
  methods: {
    signOut() {
      this.$SERVICES.logout().then(() => {
        this.$store.dispatch("setToken", "");
        this.$store.dispatch("setUser", {});
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style  scoped>
.menu {
  margin-bottom: 40px;
}
</style>