<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{$route.name}}</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <Navigation></Navigation>
      </md-app-drawer>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Vue from "vue";
import {
  MdApp,
  MdContent,
  MdToolbar,
  MdDrawer
} from "vue-material/dist/components";
Vue.use(MdToolbar);
Vue.use(MdDrawer);
Vue.use(MdApp);
Vue.use(MdContent);

import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
  components: { Navigation },
  created: function() {
    document.title = `Red Frog Freight - ${this.$route.name}`;
  },
  updated: function() {
    document.title = `Red Frog Freight - ${this.$route.name}`;
  }
};
</script>

<style scoped>
</style>
