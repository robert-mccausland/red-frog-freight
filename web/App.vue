<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{$route.name}}</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button to="/home">
            <span class="md-title">Red Frog Freight</span>
          </md-button>
        </md-toolbar>
        <md-list>
          <md-list-item to="/parcels">
            <span class="md-title">
              <md-icon>local_shipping</md-icon>&nbsp;Parcels
            </span>
          </md-list-item>
        </md-list>
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
  MdToolbar,
  MdDrawer,
  MdButton,
  MdList,
  MdIcon,
  MdContent
} from "vue-material/dist/components";
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdDrawer);
Vue.use(MdButton);
Vue.use(MdList);
Vue.use(MdIcon);
Vue.use(MdContent);

export default {
  name: "app",
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