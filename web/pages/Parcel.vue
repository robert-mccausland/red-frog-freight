<template>
  <div>
    <div v-if="isLoading" class="loading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else-if="notFound">
      <span>Parcel with id: {{$route.params.id}} not found</span>
    </div>
    <div v-else>
      <md-card class="card">
        <md-card-header>
          <span class="md-title">Details</span>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Consignment Number</label>
            <md-input v-model="parcel.consignmentNumber"></md-input>
          </md-field>
          <md-field>
            <label>Parcel Number</label>
            <md-input v-model="parcel.parcelNumber"></md-input>
          </md-field>
          <md-field>
            <label>Service Code</label>
            <md-input v-model="parcel.serviceCode"></md-input>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button
            v-if="isNew"
            class="md-primary"
            :disabled="isUpdating"
            @click="create"
          >Add Parcel</md-button>
          <md-button v-else class="md-primary" :disabled="isUpdating" @click="update">Update Parcel</md-button>
        </md-card-actions>
      </md-card>

      <div v-if="!isNew">
        <md-card class="card">
          <md-card-header>
            <span class="md-title">Tracking Events</span>
          </md-card-header>
          <md-card-content>
            <md-table class="tracking-table">
              <md-table-row>
                <md-table-head>Status Code</md-table-head>
                <md-table-head>Status Description</md-table-head>
                <md-table-head>Timestamp</md-table-head>
              </md-table-row>
              <md-table-row v-for="trackingEvent in parcel.trackingEvents" :key="trackingEvent._id">
                <md-table-cell>{{trackingEvent.code}}</md-table-cell>
                <md-table-cell>{{trackingEvent.description}}</md-table-cell>
                <md-table-cell>{{formatDate(trackingEvent.timestamp)}}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
          <md-card-actions>
            <md-button
              class="md-primary"
              :disabled="isUpdating"
              @click="showAddTrackingEventDialog = true"
            >Add Tracking Event</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <md-dialog :md-active.sync="showAddTrackingEventDialog">
      <md-dialog-title>Add Tracking Event</md-dialog-title>
      <div class="card">
        <md-field>
          <label>Status Code</label>
          <md-input v-model="trackingEvent.code"></md-input>
        </md-field>
        <md-field>
          <label>Status Description</label>
          <md-input v-model="trackingEvent.description"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          :disabled="isUpdating"
          @click="showAddTrackingEventDialog = false"
        >Cancel</md-button>
        <md-button class="md-primary" :disabled="isUpdating" @click="addTracking">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import {
  getParcel,
  updateParcel,
  createParcel,
  addTracking
} from "../src/data/parcels";
import { formatDate } from "../src/utilities";

export default {
  name: "parcel",
  data() {
    return {
      notFound: false,
      isLoading: false,
      isNew: false,
      isUpdating: false,
      parcel: {},
      trackingEvent: {},
      showAddTrackingEventDialog: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (this.$route.params.id) {
        this.isLoading = true;
        const parcel = await getParcel(this.$route.params.id);
        if (parcel != null) {
          this.parcel = parcel;
        } else {
          this.notFound = true;
        }
        this.isLoading = false;
      } else {
        this.isNew = true;
      }
    },
    async create() {
      try {
        this.isUpdating = true;
        this.parcel = await createParcel(this.parcel);
        this.isNew = false;
      } catch (err) {
        console.log(
          "TODO: Add error notifications... btw there was an error",
          err
        );
      } finally {
        this.isUpdating = false;
      }
    },
    async update() {
      try {
        this.isUpdating = true;
        this.parcel = await updateParcel(this.parcel);
      } catch (err) {
        console.log(
          "TODO: Add error notifications... btw there was an error",
          err
        );
      } finally {
        this.isUpdating = false;
      }
    },
    async addTracking() {
      try {
        this.isUpdating = true;
        this.parcel = await addTracking(this.parcel._id, this.trackingEvent);
        this.trackingEvent = {};
        this.showAddTrackingEventDialog = false;
      } catch (err) {
        console.log(
          "TODO: Add error notifications... btw there was an error",
          err
        );
      } finally {
        this.isUpdating = false;
      }
    },
    formatDate
  }
};
</script>

<style scoped>
.loading {
  margin-left: 50%;
}
.card {
  margin: 1em;
}
.tracking-table {
  padding: 1em;
}
</style>