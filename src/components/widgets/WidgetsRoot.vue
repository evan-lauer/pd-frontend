<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import AddEventForm from 'src/components/widgets/AddEventForm.vue';
import EventDetails from 'src/components/widgets/EventDetails.vue';
import { eventDetails } from 'src/stores/eventDetailsStores';
import VisualizerWidgets from 'src/components/widgets/VisualizerWidgets.vue';
import CalendarIcon from '../icons/CalendarIcon.vue';
</script>

<template>
  <div class="leftPanel">
    <AddEventForm v-if="addEventForm.isFormActive" />
    <EventDetails v-if="eventDetails.isDetailsActive" />
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
  padding: 10px;
}
.leftPanel {
  display: flex;
}
/* .test {
  width: 50%;
  height: 50%;
} */
</style>
