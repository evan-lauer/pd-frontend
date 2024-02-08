<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import AddEventForm from 'src/components/widgets/AddEventForm.vue';
import EventDetails from 'src/components/widgets/EventDetails.vue';
import { eventDetails } from 'src/stores/eventDetailsStores';
import TimeVisualizer from 'src/components/widgets/TimeVisualizer.vue'
</script>
<template>
  <div class="leftPanel">
    <AddEventForm v-if="addEventForm.isFormActive" />
    <EventDetails v-if="eventDetails.isDetailsActive" />
  </div>
  <div class="rightPanel">
    <TimeVisualizer />
  </div>
</template>
<style scoped>
.leftPanel,
.rightPanel {
  width: 50%;
  height: 100%;
  font-size: small;
  padding: 15px;
}
.test {
  width: 50%;
  height: 50%;
}
</style>
