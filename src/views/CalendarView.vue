<script setup>
// import { Calendar } from 'calendar-base';
import { ref } from 'vue';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/DatePicker.vue';

const mode = ref('month');
const year = ref(2000);
const month = ref(1);
const day = ref(1);
</script>

<template>
  <h1>Calendar</h1>
  <ModePicker
    :mode="mode"
    :setMode="(newMode) => (mode = newMode)"
  />
  <DatePicker
    :year="year"
    :setYear="(newYear) => (year = newYear)"
    :month="month"
    :setMonth="(newMonth) => (month = newMonth)"
    :day="day"
    :setDay="(newDay) => (day = newDay)"
  />

  <MonthView
    v-if="mode === 'month'"
    :day="day"
    :month="month"
    :year="year"
  />
  <WeekView
    v-else-if="mode === 'week'"
    :day="day"
    :month="month"
    :year="year"
  />
  <DayView
    v-else-if="mode === 'day'"
    :day="day"
    :month="month"
    :year="year"
  />

  <p>{{ month + '/' + day + '/' + year }}</p>
</template>

<style scoped></style>
