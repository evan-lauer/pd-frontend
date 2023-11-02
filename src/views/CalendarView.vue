<script setup>
import { ref } from 'vue';
import { dateSelectionForm } from 'src/stores/formStores';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/DatePicker.vue';
import CreateEventButton from 'src/components/calendar/CreateEventButton.vue';
import CreateEventOverlay from 'src/components/calendar/CreateEventOverlay.vue';

const isCreateMenuOpen = ref(false);
</script>

<template>
  <div class="inputBar">
    <CreateEventButton @click="() => (isCreateMenuOpen = !isCreateMenuOpen)" />
    <ModePicker />
    <DatePicker />
  </div>
  <div class="content">
    <MonthView v-if="dateSelectionForm.viewMode === 'month'" />
    <WeekView v-else-if="dateSelectionForm.viewMode === 'week'" />
    <DayView v-else-if="dateSelectionForm.viewMode === 'day'" />
  </div>

  <CreateEventOverlay :active="isCreateMenuOpen" />
</template>

<style scoped>
.inputBar {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
