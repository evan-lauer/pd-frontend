<script setup>
import { ref, watch } from 'vue';
import { Calendar } from 'calendar-base';
import userStore from 'src/stores/userStore';
import { selectedDate } from 'src/stores/calendarStores';
import { eventData, eventMethods } from '../../stores/eventStores';
import EventStar from './events/EventStar.vue';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

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

// calculations need some fixing

// event container height component
function calculate_height(startTime, endTime) {
  const start_date = new Date(startTime);
  const end_date = new Date(endTime);
  const height = (end_date.getHours() - start_date.getHours()) * 48;
  return height + 'px';
}
// event container top component
function calculate_top(startTime) {
  const date = new Date(startTime);
  const top_percent = 24 + (date.getHours() * 51)
  return top_percent + "px";
}

function formatTimes(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() + '-' + end.getHours() + ':' + (end.getMinutes() < 10 ? '0' : '') + end.getMinutes();
}
</script>

<template>
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
      <div class="hourContainer allDayEvents rowDisplay">
        <div
          class="eventSymbol"
          @click="() => eventMethods.displayEvent(eventA)"
          v-for="eventA of eventData.weeklyEvents[getDays()[day - 1].day]"
          :key="eventA"
        >
          <div
            v-if="eventA.startTime === eventA.endTime">
            {{ console.log('starttime', eventA.startTime) }}
            <EventStar />
          </div>
        </div>
      </div>
      <div>
        <!-- known bug: event container doesn't move with scrolling right now -->
        <div
          class="eventSymbol eventsContainer"
          :style="{height:calculate_height(eventA.startTime, eventA.endTime), top:calculate_top(eventA.startTime)}"
          @click="() => eventMethods.displayEvent(eventA)"
          v-for="eventA of eventData.weeklyEvents[getDays()[day - 1].day]"
          :key="eventA"
        >
          <div
            v-if="eventA.startTime !== eventA.endTime">
            <!-- <EventStar /> -->
            <div class="eventDesc">{{ eventA.title }}</div>
            <div class="eventDesc">{{ formatTimes(eventA.startTime, eventA.endTime) }}</div>
          </div>
        </div>
      </div>
      <div
        class="hourContainer"
        v-for="(n, i) in 24"
        :key="n"
        :class="i === 0 ? `hourContainer first` : `hourContainer`"
      >
        <div v-if="day === 1" class="timeStyle">{{ i }}:00</div>
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

.hourContainer.allDayEvents {
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

.eventsContainer{
  width: 14%;
  border-radius:7px;
  background-color:gray;
  position:absolute;
  z-index:1;
}

.eventDesc {
  font-size: 10px;
  padding: 5px;
  width: 80%;
  overflow: hidden;
}
</style>
