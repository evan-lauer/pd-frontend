<script setup>
import { computed } from 'vue';
import { Calendar } from 'calendar-base';
import { formStore } from 'src/stores/formStore';
import DaySquare from 'src/components/calendar/DaySquare.vue';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const displayDays = computed(() => {
  return calendar.getCalendar(formStore.year, formStore.month - 1);
});

// 1 indexed
function getDayByIndex(week, day) {
  const index = (week - 1) * 7 + (day - 1);
  if (displayDays.value[index]) {
    return displayDays.value[index];
  } else {
    return false;
  }
}
</script>

<template>
  <h4>This is the month view</h4>
  <div class="monthContainer">
    <div
      v-for="week in 6"
      :key="week"
      class="weekContainer"
    >
      <DaySquare
        v-for="day in 7"
        :key="day"
        :day="getDayByIndex(week, day).day"
      />
    </div>
  </div>
</template>

<style scoped>
.monthContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: fit-content;
}
.weekContainer {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
