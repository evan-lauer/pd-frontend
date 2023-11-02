<script setup>
// import { ref } from 'vue';
import { formStore } from 'src/stores/formStore';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/DatePicker.vue';
import CreateEvent from 'src/components/calendar/CreateEvent.vue';

// const isCreateMenuOpen = ref(false);
</script>

<template>
  <div class="inputBar">
    <CreateEvent />
    <ModePicker />
    <DatePicker />
  </div>

  <MonthView v-if="formStore.viewMode === 'month'" />
  <WeekView v-else-if="formStore.viewMode === 'week'" />
  <DayView v-else-if="formStore.viewMode === 'day'" />
</template>

<style scoped>
.inputBar {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
</style>
