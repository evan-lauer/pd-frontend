<!-- 
  CalendarRoot.vue

  This file defines the calendar container. WE have two divs,
  one for the input bar and one for the calendar rendering area.

  This component reads from the dateSelectionForm to decide which 
  view of the calendar needs to be rendered.
 -->

<script setup>
import { dateSelectionForm } from 'src/stores/formStores';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/DatePicker.vue';
import CreateEventButton from 'src/components/calendar/CreateEventButton.vue';
import CreateEventOverlay from 'src/components/calendar/CreateEventOverlay.vue';
</script>

<template>
  <div class="inputBar">
    <DatePicker />
    <ModePicker />
    <CreateEventButton @click="() => (dateSelectionForm.active = !dateSelectionForm.active)" />
  </div>
  <div class="content">
    <MonthView v-if="dateSelectionForm.viewMode === 'month'" />
    <WeekView v-else-if="dateSelectionForm.viewMode === 'week'" />
    <DayView v-else-if="dateSelectionForm.viewMode === 'day'" />
  </div>

  <CreateEventOverlay />
</template>

<style scoped>
.inputBar {
  height: 15%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.content {
  height: 85%;

}
</style>
