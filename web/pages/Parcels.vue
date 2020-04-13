<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>Consignment Number</md-table-head>
        <md-table-head md-numeric>Parcel Number</md-table-head>
        <md-table-head>Service Code</md-table-head>
        <md-table-head>Created At</md-table-head>
        <md-table-head>Current Status</md-table-head>
        <md-table-head>Status Updated At</md-table-head>
      </md-table-row>
      <md-table-row v-for="parcel in parcels" :key="parcel._id">
        <md-table-cell md-numeric>{{parcel.consignmentNumber}}</md-table-cell>
        <md-table-cell md-numeric>{{parcel.parcelNumber}}</md-table-cell>
        <md-table-cell>{{parcel.serviceCode}}</md-table-cell>
        <md-table-cell>{{formatDate(parcel.createdAt)}}</md-table-cell>
        <md-table-cell>{{parcel.latestTrackingEvent.description}} ({{parcel.latestTrackingEvent.code}})</md-table-cell>
        <md-table-cell>{{formatDate(parcel.latestTrackingEvent.timestamp)}}</md-table-cell>
        <md-table-cell>
          <md-button :to="`/parcel/${parcel._id}`">Edit</md-button>
        </md-table-cell>
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
import { getParcels } from "../src/data/parcels";
import { formatDate } from "../src/utilities";

export default {
  name: "parcels",
  data() {
    return {
      isLoading: false,
      loadingFailed: false,
      parcels: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try{
      this.isLoading = true;
      this.parcels = await getParcels();
      }
      catch(err)
      {
        this.loadingFailed = true;
        console.log(
          "TODO: Add error notifications... btw there was an error",
          err
        );
      }
      this.isLoading = false;
    },
    formatDate
  }
};
</script>

<style scoped>
.loading {
  margin-left: 50%;
}
</style>