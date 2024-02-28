<script setup>
import { ref, watch, onMounted } from 'vue';
import { Calendar } from 'calendar-base';
import userStore from 'src/stores/userStore';
import { selectedDate } from 'src/stores/calendarStores';
import { eventData, eventMethods } from 'src/stores/eventStores';
import EventStar from 'src/components/calendar/events/EventStar.vue';
// import WeekViewEvent from './WeekViewEvent.vue';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const dayWidth = ref(null);
const hourHeight = ref(null);
const allDayEventsHeight = ref(null);

onMounted(() => {
  dayWidth.value = document.querySelector('.hourContainer').offsetWidth;
  console.log('hourContainer width: ', dayWidth.value);
  hourHeight.value = document.querySelector('.hourContainer').offsetHeight;
  console.log('hourContainer height: ', hourHeight.value);
  allDayEventsHeight.value = document.querySelector('.allDayEvents').offsetHeight;
  console.log('allDayEvents height: ', allDayEventsHeight.value);
});

function previousMonth() {
  return calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth() - 1
  );
}
function currentMonth() {
  return calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth()
  );
}
function nextMonth() {
  return calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth() + 1
  );
}

const displayDays = ref([...previousMonth(), ...currentMonth(), ...nextMonth()]);

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
    if (
      displayDays.value[i].day === cur_date.getDate() &&
      displayDays.value[i].month === cur_date.getMonth()
    ) {
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
  return (
    cur_date.day === today.getDate() &&
    cur_date.month === today.getMonth() &&
    cur_date.year === today.getFullYear()
  );
}

watch(
  () => selectedDate.dateTime.getMonth(),
  () => {
    displayDays.value = [...previousMonth(), ...currentMonth(), ...nextMonth()];
    console.log('the selectedDate.dateTime.getMonth() changed value: ', displayDays);
  }
);

userStore.getEvents();
eventData.creatingWeeksEventArray();
watch(
  () => eventData.getWeekOutOfYear(selectedDate.dateTime, new Date().getFullYear()),
  () => {
    // This ensures that the numsEventsArray is reset when the month is changed
    userStore.getEvents();
    eventData.creatingWeeksEventArray();
  }
);

// below are for overlapping event case

// helper function for find_overlap function
function is_overlap(event1, event2) {
  const event1_start = new Date(event1.startTime).getTime();
  const event1_end = new Date(event1.endTime).getTime();
  const event2_start = new Date(event2.startTime).getTime();
  const event2_end = new Date(event2.endTime).getTime();
  return event1_start < event2_end && event1_end > event2_start;
}

// returns array, `res`, of arrays of len 2. each index in `res` contains
// set of two event objects that are overlapping events
function find_overlap(event_arr) {
  if (typeof event_arr === 'undefined') {
    return `event array undefined`;
  }
  const res = [];
  // console.log("Here is the event array once passed intp find_overlap: ", event_arr);
  // console.log("The length of the event array is: ", event_arr.length);
  for (let i = 0; i < event_arr.length; i++) {
    for (let j = 1; j < event_arr.length; j++) {
      if (is_overlap(event_arr[i], event_arr[j])) {
        if (event_arr[i].startTime < event_arr[j].startTime) {
          res.push([event_arr[i], event_arr[j]]);
        } else {
          res.push([event_arr[j], event_arr[i]]);
        }
      }
    }
  }
  return res;
}
</script>

<template>
  {{ console.log('find_overlap', find_overlap(eventData.weeklyEvents[22])) }}
  <div class="weekContainer">
    <div
      v-for="day in 7"
      :key="day"
      :class="day === 1 ? `weekContainer first` : `weekContainer`"
    >
      <div
        class="rowDisplay"
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
      <div class="allDayEvents rowDisplay">
        <div
          class="eventSymbol"
          @click="() => eventMethods.displayEvent(eventA)"
          v-for="eventA of eventData.weeklyEvents[getDays()[day - 1].day]"
          :key="eventA"
        >
          <div v-if="eventA.startTime === eventA.endTime">
            {{ console.log('starttime', eventA.startTime) }}
            <EventStar />
          </div>
        </div>
      </div>
      <div>
        <WeekViewEvent :day="day" />
      </div>
      <div
        v-for="(n, i) in 24"
        :key="n"
        :class="i === 0 ? `hourContainer first hour` + i : `hourContainer hour` + i"
      >
        <div
          v-if="day === 1"
          class="timeStyle"
        >
          {{ i }}:00
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeStyle {
  font-size: 10px;
}
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
  height: 15%;
  border-bottom: var(--calendar-border-grey) 1px solid;
}

.allDayEvents {
  height: 10%;
}
.contentDiv {
  position: relative;
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

.times {
  font-size: 13px;
}

.eventsContainer {
  /* width: 14%; */
  max-width: 14%;
  border-radius: 7px;
  background-color: #9098a1;
  position: absolute;
  /* z-index: 1; */
  border: 1px solid aliceblue;
  overflow-y: auto;
}

.eventDesc {
  font-size: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
  width: 80%;
  overflow: hidden;
}

.boldFont {
  font-weight: bold;
}
</style>
