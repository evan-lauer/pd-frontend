<!-- 
  DatePicker.vue

  This component creates a multi-select dropdown for the month, and
  text inputs for the day and year.

  As the user selects day, month, and year, this component updates the
  dateSelectionForm to reflect the change.
 -->

<script setup>
import { dateSelectionForm } from 'src/stores/formStores';
import DayDatePicker from 'src/components/calendar/datePickers/DayDatePicker.vue';
import WeekDatePicker from 'src/components/calendar/datePickers/WeekDatePicker.vue';
import MonthDatePicker from 'src/components/calendar/datePickers/MonthDatePicker.vue';
</script>

<template>
  <div>
    <DayDatePicker v-if="dateSelectionForm.viewMode === `day`" />
    <WeekDatePicker v-if="dateSelectionForm.viewMode === `week`" />
    <MonthDatePicker v-if="dateSelectionForm.viewMode === `month`" />
  </div>
</template>
