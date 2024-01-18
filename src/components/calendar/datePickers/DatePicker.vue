<!-- 
  DatePicker.vue

  This component creates a multi-select dropdown for the month, and
  text inputs for the day and year.

  As the user selects day, month, and year, this component updates the
  selectedDate to reflect the change.
 -->

<script setup>
import { viewMode } from 'src/stores/calendarStores';
import DayDatePicker from 'src/components/calendar/datePickers/DayDatePicker.vue';
import WeekDatePicker from 'src/components/calendar/datePickers/WeekDatePicker.vue';
import MonthDatePicker from 'src/components/calendar/datePickers/MonthDatePicker.vue';
</script>

<template>
  <div>
    <DayDatePicker v-if="viewMode.mode === `day`" />
    <WeekDatePicker v-if="viewMode.mode === `week`" />
    <MonthDatePicker v-if="viewMode.mode === `month`" />
  </div>
</template>
