<template>
  <div>
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
  </div>
</template>

<script>
import Vue from "vue";
import { MdList, MdIcon, MdButton } from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdList);
Vue.use(MdIcon);

export default {};
</script>

<style scoped></style>
