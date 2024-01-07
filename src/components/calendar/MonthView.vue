<script setup>
import { computed } from 'vue';
import { Calendar } from 'calendar-base';
import { dateSelectionForm } from 'src/stores/formStores';
import userStore from 'src/stores/userStore';
import DaySquare from 'src/components/calendar/DaySquare.vue';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const displayDays = computed(() => {
  return calendar.getCalendar(dateSelectionForm.date.year, dateSelectionForm.date.month - 1);
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
userStore.getEvents();
</script>

<template>
  <div class="monthContainer">
    <div
      v-for="week in 6"
      :key="week"
      :class="week === 1 ? `weekContainer first` : `weekContainer`"
    >
      week
    </div>
  </div>
</template>

<style scoped>
.monthContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.weekContainer {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
  border-bottom: var(--calendar-border-grey) 1px solid;
}

.weekContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}
</style>
