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
      :class="week === 1 ? 'weekContainer first' : 'weekContainer'"
    >
      <div
        v-for="day in 7"
        :key="day"
        :class="'day'"
      >
        <div class="dateNumber">
          {{ getDayByIndex(week, day).day }}
        </div>
      </div>
      <div
        v-for="pseudoDay in 7"
        :key="pseudoDay"
        :class="`pseudoDay`"
      >
        <!-- Psuedo element for CSS styling only -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.monthContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;
}
.weekContainer {
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: var(--calendar-border-grey) 1px solid;
  /* padding: 10px; */
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.weekContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}

.day {
  height: 100%;
  width: 100%;
}
</style>
