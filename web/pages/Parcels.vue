<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item parcels-filter-field">
        <md-field>
          <label for="sort-by">Sort By</label>
          <md-select v-model="orderBy" name="sort-by" id="sort-by" @md-selected="fetch">
            <md-option>None</md-option>
            <md-option value="createdAt__desc">Newest</md-option>
            <md-option value="createdAt__asc">Oldest</md-option>
            <md-option value="latestTrackingEvent.timestamp__desc">Recently Updated</md-option>
            <md-option value="consignmentNumber">Consignment No.</md-option>
            <md-option value="parcelNumber">Parcel No.</md-option>
            <md-option value="serviceCode">Service Code</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <md-empty-state
      v-if="isEmpty"
      md-label="Could not find any parcels"
      md-description="Looks like there was no parcels that matched your current filter."
    ></md-empty-state>
    <md-table v-else class="md-scrollbar">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head md-numeric>Consignment No.</md-table-head>
        <md-table-head md-numeric>Parcel No.</md-table-head>
        <md-table-head>Service Code</md-table-head>
        <md-table-head>Created At</md-table-head>
        <md-table-head>Current Status</md-table-head>
        <md-table-head>Status Updated At</md-table-head>
      </md-table-row>
      <md-table-row v-for="parcel in parcels" :key="parcel._id">
        <md-table-cell>
          <md-button :to="`/parcel/${parcel._id}`">Edit</md-button>
        </md-table-cell>
        <md-table-cell md-numeric>{{parcel.consignmentNumber}}</md-table-cell>
        <md-table-cell md-numeric>{{parcel.parcelNumber}}</md-table-cell>
        <md-table-cell class="parcels-table-cell">{{parcel.serviceCode}}</md-table-cell>
        <md-table-cell class="parcels-table-cell">{{formatDate(parcel.createdAt)}}</md-table-cell>
        <md-table-cell
          class="parcels-table-cell"
        >{{formatTrackingEvent(parcel.latestTrackingEvent)}}</md-table-cell>
        <md-table-cell
          class="parcels-table-cell"
        >{{formatDate(parcel.latestTrackingEvent.timestamp)}}</md-table-cell>
      </md-table-row>
    </md-table>
    <div v-if="isLoading" class="loading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-if="loadingFailed">
      <span>Unable to load parcels</span>
    </div>
    <md-button class="md-primary" to="/parcel">Add Parcel</md-button>
  </div>
</template>

<script>
import Vue from "vue";
import {
  MdTable,
  MdField,
  MdRipple,
  MdProgress,
  MdEmptyState,
  MdMenu
} from "vue-material/dist/components";
Vue.use(MdTable);
Vue.use(MdField);
Vue.use(MdRipple);
Vue.use(MdProgress);
Vue.use(MdEmptyState);
Vue.use(MdMenu);

import { getParcels } from "../src/data/parcels";
import { formatDate, formatTrackingEvent } from "../src/utilities";

export default {
  name: "parcels",
  data() {
    return {
      isLoading: false,
      isEmpty: false,
      loadingFailed: false,
      orderBy: "",
      parcels: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        this.isLoading = true;
        const ordering = {};
        if (this.orderBy) {
          const orderingOptions = this.orderBy.split("__");
          ordering.field = orderingOptions[0];
          ordering.direction = orderingOptions[1];
        }
        this.parcels = await getParcels({ ordering });
      } catch (err) {
        this.loadingFailed = true;
        console.log(
          "TODO: Add error notifications... btw there was an error",
          err
        );
      }
      this.isEmpty = this.parcels.length === 0;
      this.isLoading = false;
    },
    formatTrackingEvent,
    formatDate
  }
};
</script>

<style scoped>
.loading {
  margin-left: 50%;
}
.parcels-table-cell {
  white-space: nowrap;
}
.parcels-filter-field {
  max-width: 20em;
}
</style>