<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import AddEventForm from 'src/components/widgets/AddEventForm.vue';
import EventDetails from 'src/components/widgets/EventDetails.vue';
import { eventDetails } from 'src/stores/eventDetailsStores';
</script>
<template>
  <div class="leftPanel">
    <AddEventForm v-if="addEventForm.isFormActive" />
    <EventDetails v-if="eventDetails.isDetailsActive" />
  </div>
  <div class="rightPanel"></div>
</template>
<style scoped>
.leftPanel,
.rightPanel {
  width: 50%;
  height: 100%;
}
.test {
  width: 50%;
  height: 50%;
}
</style>
