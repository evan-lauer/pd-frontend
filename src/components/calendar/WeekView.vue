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
  <div class="weekContainer">
    <div
      v-for="day in 7"
      :key="day"
      :class="day === 1 ? `weekContainer first` : `weekContainer`"
    >
      Day {{ day }}
    </div>

  </div>
  <div class="contentDiv">
  <div class="dayContainer"
  v-for="day in 7"
      :key="day"
      :class="day === 1 ? `dayContainer first` : `dayContainer`"
    >
    <div class ="hourContainer"
      v-for="hour in 24"
        :key="hour"
        :class = "hour === 1 ? `hourContainer first` : `hourContainer`"
    >
    {{hour}}:00
    </div>
  </div>
</div>
</template>

<style scoped>
.weekContainer {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
  border-bottom: var(--calendar-border-grey) 1px solid;


}
.dayContainer {
  flex-direction:row;
  float:left;
  width: 13.755350471%;
  padding-right: 0.53%;
  height: 95.5%;
  
}
.hourContainer {
height: 10%;
  
border-bottom: var(--calendar-border-grey) 1px solid;
}
.contentDiv{
  overflow-y:scroll;
  height: 95.5%;
}

.hourContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}
</style>
