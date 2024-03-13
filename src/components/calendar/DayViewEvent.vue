<script setup>
import { Calendar } from 'calendar-base';
import { selectedDate } from 'src/stores/calendarStores';
import { eventData, eventMethods } from 'src/stores/eventStores';

import { onMounted, ref } from 'vue';

defineProps({ day: Number });

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });
const hourContainerHeight = ref(0);
const hourContainerOffsets = ref(new Array(24).fill(0));

onMounted(() => {
  const hourContainer = document.getElementsByClassName(`hour0`)[0];
  hourContainerHeight.value = hourContainer.offsetHeight;
  const hourOffsets = new Array(24);
  for (let i = 0; i < 24; i++) {
    const hourElement = document.getElementsByClassName(`hour` + i)[0];
    hourOffsets[i] = hourElement.offsetTop;
  }
  hourContainerOffsets.value = hourOffsets;
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

// functions below are for event containers.
// heights in calculations are hard coded right now, but the basic functionality/reactivity is there.
// sincerely apologize for the inconvenience.

// height component
function calculate_height(startTime, endTime) {
  const height =
    (endTime.getHours() +
      endTime.getMinutes() / 60 -
      (startTime.getHours() + startTime.getMinutes() / 60)) *
    hourContainerHeight.value;
  // const height = hourHeight.value * ((end_date.getHours() + end_date.getMinutes() / 60) - (start_date.getHours() + start_date.getMinutes() / 60));
  // console.log('height for this event: ', height);
  return height + 'px';
}
// top component
function calculate_top(startTime) {
  const hourNumber = startTime.getHours();

  const minutes = startTime.getMinutes();

  const top = hourContainerOffsets.value[hourNumber] + (minutes / 60) * hourContainerHeight.value;
  // console.log('top for this event: ', top);

  return top + 'px';
}

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

function calculate_z(cur_event, event_arr) {
  const overlap_events = find_overlap(event_arr);
  for (let i = 0; i < overlap_events.length; i++) {
    if (overlap_events[i].includes(cur_event)) {
      return overlap_events[i].indexOf(cur_event);
    }
  }
}

function calculate_width(cur_event, event_arr) {
  const overlap_events = find_overlap(event_arr);
  for (let i = 0; i < overlap_events.length; i++) {
    if (overlap_events[i].includes(cur_event)) {
      const height = overlap_events[i].indexOf(cur_event) == 0 ? '14' : '7';
      return height + '%';
    }
  }
}

function formatTimes(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return (
    start.getHours() +
    ':' +
    (start.getMinutes() < 10 ? '0' : '') +
    start.getMinutes() +
    '-' +
    end.getHours() +
    ':' +
    (end.getMinutes() < 10 ? '0' : '') +
    end.getMinutes()
  );
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
</script>

<template>
  <div
    class="eventSymbol eventsContainer"
    :style="{
      height: calculate_height(eventA.startTime, eventA.endTime),
      top: calculate_top(eventA.startTime),
      zIndex: calculate_z(eventA, eventData.dailyEvents)
    }"
    @click="() => eventMethods.displayEvent(eventA)"
    v-for="eventA of eventData.dailyEvents"
    :key="eventA"
  >
    <div v-if="eventA.startTime !== eventA.endTime">
      <!-- <EventStar /> -->
      <div class="eventDesc boldFont">{{ eventA.title }}</div>
      <div class="eventDesc">{{ eventA.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.eventsContainer {
  width: 14%;
  max-width: 14%;
  border-radius: 7px;
  background-color: #c3d7ca;
  position: absolute;
  border: 1px solid aliceblue;
  transition: background-color 0.1s linear;
  left: 50px;
}

.eventsContainer:hover {
  background-color: #a4bcad;
}

.eventDesc {
  font-size: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
  width: 80%;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.boldFont {
  font-weight: bold;
}
</style>
