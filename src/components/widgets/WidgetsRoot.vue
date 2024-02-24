<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import { eventDetails } from 'src/stores/eventDetailsStores';
import { editEventForm } from 'src/stores/editEventFormStores';
import AddEventForm from 'src/components/widgets/AddEventForm.vue';
import EventDetails from 'src/components/widgets/EventDetails.vue';
import VisualizerWidgets from 'src/components/widgets/VisualizerWidgets.vue';
import EditEventForm from 'src/components/widgets/EditEventForm.vue';
</script>

<template>
  <div class="leftPanel">
    <AddEventForm v-if="addEventForm.isFormActive" />
    <EventDetails v-if="eventDetails.isDetailsActive" />
    <EditEventForm v-if="editEventForm.isFormActive" />
  </div>
  <div class="rightPanel">
    <VisualizerWidgets />
  </div>
</template>

<style scoped>
.leftPanel,
.rightPanel {
  width: 50%;
  height: auto;
  font-size: small;
}
.leftPanel {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border: 2px solid var(--primary-default);
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.rightPanel {
  padding: 10px;
}
</style>
