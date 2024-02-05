<script setup>
import { ref } from 'vue';
import { Calendar } from 'calendar-base';
import userStore from 'src/stores/userStore';
import { selectedDate } from 'src/stores/calendarStores';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const previousMonth = ref(calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth() - 1
  ));

const currentMonth = ref(calendar.getCalendar(
  selectedDate.dateTime.getFullYear(),
  selectedDate.dateTime.getMonth()
));

const nextMonth = ref(calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth() + 1
  ));

const displayDays = ref([...previousMonth.value, ...currentMonth.value, ...nextMonth.value])

function getWeekDays(weekDay) {
  switch (weekDay) {
    case 0:
      return `Sun`;
    case 1:
      return `Mon`;
    case 2:
      return `Tues`;
    case 3:
      return `Wed`;
    case 4:
      return `Thurs`;
    case 5:
      return `Fri`;
    case 6:
      return `Sat`;
    default:
      return ``;
  }
}

// getDays() helper
function getDateIndex() {
  const cur_date = selectedDate.dateTime;
  for (let i = 0; i < displayDays.value.length; i++) {
    if (displayDays.value[i].day === cur_date.getDate() && 
      displayDays.value[i].month === cur_date.getMonth()) {
        return i;
      }
  }
}

// return arr of days in week of today.
function getDays() {
  const cal_index = getDateIndex();
  const cur_day_weekday = displayDays.value[cal_index].weekDay;
  const start_date_index = cal_index - cur_day_weekday;
  const get_days_arr = [];
  for (let i = start_date_index; i < start_date_index + 7; i++) {
    get_days_arr.push(displayDays.value[i]);
  }
  return get_days_arr;
}

function isToday(cur_date) {
  const today = new Date();
  return (cur_date.day === today.getDate() &&
    cur_date.month === today.getMonth() &&
    cur_date.year === today.getFullYear());
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
      <div class="rowDisplay"
        :style="isToday(getDays()[day - 1]) ? `color: #DD825F; font-weight: bold;` : ``"
      >
        <div class="rowDisplay">
          {{ getDays()[day - 1].day }}
        </div>
        <div class="rowDisplay dateHeader">
          {{ getWeekDays(day - 1) }}
        </div>
      </div>
    </div>
  </div>
  <div class="contentDiv">
    <div
      class="dayContainer"
      v-for="day in 7"
      :key="day"
      :class="day === 1 ? `dayContainer first` : `dayContainer`"
    >
      <div
        class="hourContainer"
        v-for="(n, i) in 24"
        :key="n"
        :class="i === 0 ? `hourContainer first` : `hourContainer`"
      >
        <div v-if="day === 1">{{ i }}:00</div>
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
.rowDisplay {
  display: flex;
  flex-direction: row;
  padding-right: 5px;
}
.rowDisplay.dateHeader {
  font-size: 70%;
  align-self: flex-end;
}
.dayContainer {
  flex-direction: row;
  float: left;
  width: 13.755350471%;
  padding-right: 0.53%;
  height: 95.5%;
}
.hourContainer {
  height: 10%;

  border-bottom: var(--calendar-border-grey) 1px solid;
}
.contentDiv {
  overflow-y: scroll;
  height: 95.5%;
}

.hourContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}

.dateNumber {
  padding-left: 3px;
}

.dateNumber.lastMonth {
  color: #9098a1;
}
</style>
