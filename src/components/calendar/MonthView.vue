<script setup>
import { computed } from 'vue';
import { Calendar } from 'calendar-base';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventExists } from 'src/stores/eventStores';
import { eventData } from '../../stores/eventStores';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const displayDays = computed(() => {
  return calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth()
  );
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

function isToday(date) {
  const today = new Date();
  return (
    date.year === today.getFullYear() &&
    date.month === today.getMonth() &&
    date.day === today.getDate()
  );
}

userStore.getEvents();
eventData.creatingDaysEventArray();

function renderWeekHeader(week, day) {
  if (week === 1) {
    switch (day) {
      case 1:
        return `Sunday`;
      case 2:
        return `Monday`;
      case 3:
        return `Tuesday`;
      case 4:
        return `Wednesday`;
      case 5:
        return `Thursday`;
      case 6:
        return `Friday`;
      case 7:
        return `Saturday`;
      default:
        return ``;
    }
  }
}
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
        <div
          class="dayHeader"
          v-if="renderWeekHeader(week, day) !== ''"
        >
          {{ renderWeekHeader(week, day) }}
        </div>
        <div
          :class="
            getDayByIndex(week, day).month !== selectedDate.dateTime.getMonth()
              ? `dateNumber lastMonth`
              : `dateNumber`
          "
          :style="isToday(getDayByIndex(week, day)) ? `color: #DD825F; font-weight: bold;` : ``"
        >
          {{ getDayByIndex(week, day).day }}
        </div>
        <div class="eventsContainer">
          <div
            class="eventSymbol"
            v-for="x in eventData.numEventsArray[getDayByIndex(week, day).day]"
          >
            <!-- v-if="eventData.numEventsArray[getDayByIndex(week, day).day] >= 1" -->
            <!-- Using the eventStores, display a "o" if there is/are events -->
            <!-- This is just to test out getting events to display -->
            o
          </div>
        </div>
        <div :class="day === 1 ? `pseudoDay first` : `pseudoDay`">
          <!-- Pseudo element for CSS styling only -->
        </div>
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
  position: relative;
}

.eventsContainer {
  max-height: 2em;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.pseudoDay {
  height: 80%;
  width: 100%;
  position: absolute;
  top: 0;
  margin: 10% 0;
  border-right: 1px solid var(--calendar-border-grey);
}

.pseudoDay.first {
  border-left: 1px solid var(--calendar-border-grey);
}

.dateNumber {
  padding-left: 3px;
}

.dateNumber.lastMonth {
  color: #9098a1;
}

.dayHeader {
  position: absolute;
  top: -20px;
}
</style>
