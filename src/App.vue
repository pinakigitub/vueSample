import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
<template>
  <div id="app">
    <div id="mydiv" v-show="$root.isLoading">
      <img class="ajax-loader" src="./assets/loading.gif" alt="Image alt" />
    </div>

    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand tag="router-link" :to="{ path: '/' }">Logo</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item tag="router-link" :to="{ path: '/' }">Home</b-nav-item>
            <b-nav-item tag="router-link" :to="{ path: '/about' }">About</b-nav-item>
            <b-nav-item tag="router-link" :to="{ path: '/coins/ethereum' }">Ethereum</b-nav-item>
            <b-nav-item tag="router-link" :to="{ path: '/coins/bitcoin' }">bitcoin</b-nav-item>
            <b-nav-item tag="router-link" :to="{ path: '/players' }">players</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <span class="float-right">
          <b-button variant="mb-2" v-show="$root.isLoggedIn">
            <b-icon icon="person-fill"></b-icon>
            <span style="color:white;">Welcome {{logedInUserName}}</span>
          </b-button>
          <b-button class="mb-2" @click="Logout( $event.target)">
            <span v-show="$root.isLoggedIn">
              <b-icon icon="power"></b-icon>Logout
            </span>
            <span v-show="!$root.isLoggedIn">
              <b-icon icon="person-fill"></b-icon>Login
            </span>
          </b-button>
        </span>
      </b-navbar>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import RestResource from "./services/httpService";

import UtilityResource from "./services/utilityService";
import { EventBus } from "./event-bus";
const restResourceService = new RestResource(this);
export default {
  name: "app",
  data() {
    return {
      logedInUserName: ""
    };
  },
  created() {
    EventBus.$on("loggedinUserName", x => {
      this.logedInUserName = x;
    });
    this.checkUserLoginStatus();
  },
  methods: {
    Logout(ev) {
      UtilityResource.RemoveUserInfo();
      this.$root.isLoggedIn = false;
      this.$router.push({ name: "Logins" }).catch(err => {});
    },
    checkUserLoginStatus() {
      if (UtilityResource.CheckLoggedInUser()) {
        this.RetriveCurrentUserInfo();
      }
    },
    RetriveCurrentUserInfo() {
      let dfg = UtilityResource.GetUserInfo();
      this.logedInUserName = dfg.Email;
      this.$root.isLoggedIn = true;
    }
  },
  watch: {
    $route(to, from) {}
  }
};
</script>
<style >
#mydiv {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: grey;
  opacity: 0.8;
}
.ajax-loader {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 50px;
  width: 50px;
  margin-left: -32px;
  margin-top: -32px;
  display: block;
}
li > a.router-link-exact-active {
  background-color: goldenrod;
}
</style>