<!-- 
  CalendarRoot.vue

  This file defines the calendar container. WE have two divs,
  one for the input bar and one for the calendar rendering area.

  This component reads from the dateSelectionForm to decide which 
  view of the calendar needs to be rendered.
 -->

<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import { viewMode } from 'src/stores/calendarStores';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/datePickers/DatePicker.vue';
import CreateEventButton from 'src/components/calendar/CreateEventButton.vue';
import { eventDetails } from 'src/stores/eventDetailsStores';

function toggleEventForm() {
  const startDateTime = new Date();
  startDateTime.setMinutes(0);
  startDateTime.setSeconds(0);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  addEventForm.startDateTime = startDateTime;
  addEventForm.endDateTime = endDateTime;
  addEventForm.isFormActive = !addEventForm.isFormActive;
  eventDetails.isDetailsActive = false;
}
</script>

<template>
  <div class="inputBar">
    <DatePicker />
    <div class="rightJustifiedInputs">
      <ModePicker />
      <CreateEventButton @click="toggleEventForm()" />
    </div>
  </div>
  <div class="content">
    <MonthView v-if="viewMode.mode === 'month'" />
    <WeekView v-else-if="viewMode.mode === 'week'" />
    <DayView v-else-if="viewMode.mode === 'day'" />
  </div>
</template>

<style scoped>
.inputBar {
  height: 15%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.rightJustifiedInputs {
  display: flex;
  gap: 10px;
}

.content {
  height: 85%;
  overflow: hidden;
}
</style>
