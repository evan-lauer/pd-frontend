<!-- 
  CalendarRoot.vue

  This file defines the calendar container. WE have two divs,
  one for the input bar and one for the calendar rendering area.

  This component reads from the dateSelectionForm to decide which 
  view of the calendar needs to be rendered.
 -->

<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import { viewMode, selectedDate } from 'src/stores/calendarStores';
import { computed, watch, ref } from 'vue';
import { Calendar } from 'calendar-base';

import ModePicker from 'src/components/calendar/ModePicker.vue';
import MonthView from 'src/components/calendar/MonthView.vue';
import WeekView from 'src/components/calendar/WeekView.vue';
import DayView from 'src/components/calendar/DayView.vue';
import DatePicker from 'src/components/calendar/datePickers/DatePicker.vue';
import CreateEventButton from 'src/components/calendar/CreateEventButton.vue';
import { eventDetails } from 'src/stores/eventDetailsStores';
import { editEventForm } from 'src/stores/editEventFormStores';
import { eventData } from 'src/stores/eventStores';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

function toggleEventForm() {
  const startDateTime = new Date();
  startDateTime.setMinutes(0);
  startDateTime.setSeconds(0);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  addEventForm.startDateTime = startDateTime;
  addEventForm.endDateTime = endDateTime;
  addEventForm.isFormActive = !addEventForm.isFormActive;
  eventDetails.isDetailsActive = false;
  editEventForm.isFormActive = false;
}

const monthDisplayDays = computed(() => {
  const thisMonth = calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth()
  );
  const nextMonth = calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth() + 1
  );
  if (thisMonth.length === 35) {
    // If this month only shows 5 weeks, then we need to append the next week to it.
    const daysToAppend = nextMonth.slice(7, 14);
    return thisMonth.concat(daysToAppend);
  }
  return thisMonth;
});

const getNumDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getMonthViewEvents = (monthViewEvents) => {
  // This array, eventsArray, will be the same exact shape as the calendar
  // array from calendar-base.
  // This will allow us to index into the array using our index in the month view,
  // without having to recalculate anything. We only need to rebuild this when the selectedDate changes.
  //
  // We can also just index into this array to build the week and day arrays.
  // I know this is fucked but bear with me.
  const eventsArray = new Array(7 * 6);
  const startOfMonth = new Date(
    `` +
      monthDisplayDays.value[0].year +
      `-` +
      (monthDisplayDays.value[0].month + 1) +
      `-` +
      monthDisplayDays.value[0].day
  );
  const endOfMonth = new Date(
    `` +
      monthDisplayDays.value[41].year +
      `-` +
      (monthDisplayDays.value[41].month + 1) +
      `-` +
      monthDisplayDays.value[41].day
  );
  // This part is completely fucked. Basically we need to calculate how many days
  // are "wrapping around" from the previous month or the next month
  const thisYear = selectedDate.dateTime.getFullYear();
  const lastMonth =
    selectedDate.dateTime.getMonth() <= 0
      ? selectedDate.dateTime.getMonth() + 12
      : selectedDate.dateTime.getMonth(); // one indexed
  const thisMonth = selectedDate.dateTime.getMonth() + 1; // one indexed
  const nextMonth =
    selectedDate.dateTime.getMonth() + 2 > 12
      ? selectedDate.dateTime.getMonth() + 2 - 12
      : selectedDate.dateTime.getMonth() + 2; // one indexed
  const daysInLastMonth = getNumDays(thisYear, lastMonth);
  const daysInThisMonth = getNumDays(thisYear, thisMonth);
  var numDaysFromLastMonth = 0;
  for (var i = 0; i < monthDisplayDays.value.length; i++) {
    if (monthDisplayDays.value[i].month + 1 === lastMonth) {
      numDaysFromLastMonth += 1;
    }
  }
  // for every event, check if the endTime of the event comes after the start of the month,
  // and if the start time comes before the end of the month. If yes to both, then we need it in the
  // eventsArray
  eventData.theEvents.forEach((event) => {
    if (startOfMonth < event.endTime && event.startTime < endOfMonth) {
      if (event.startTime.getDate() !== event.endTime.getDate()) {
        // In this corner case, the event starts and ends in different days, so we need to handle the special behavior
      }
      var indexIntoNewArray = 0;
      if (event.startTime.getMonth() + 1 === lastMonth) {
        // If this event is wrapping from last month
        indexIntoNewArray =
          event.startTime.getDate() - (daysInLastMonth - numDaysFromLastMonth + 1);
      } else if (event.startTime.getMonth() + 1 === thisMonth) {
        // If this event is from this month
        indexIntoNewArray = event.startTime.getDate() + numDaysFromLastMonth - 1;
      } else {
        // If this event is wrapping from next month
        indexIntoNewArray = numDaysFromLastMonth + daysInThisMonth + event.startTime.getDate() - 1;
      }
      if (indexIntoNewArray >= 0 && indexIntoNewArray <= 41) {
        if (eventsArray[indexIntoNewArray]) {
          eventsArray[indexIntoNewArray].push(event);
        } else {
          eventsArray[indexIntoNewArray] = [event];
        }
      } else {
        console.log('Error with wraparound event indexing...');
      }
    }
  });
  monthViewEvents.value = eventsArray;
};

const monthViewEvents = ref([]);
const weekViewEvents = ref([]);

watch(
  () => selectedDate.dateTime.getMonth(),
  () => getMonthViewEvents(monthViewEvents),
  { immediate: true }
);

watch(
  () => {
    // some function that tests if the selectedDate is in a different week
  },
  () => {
    // some function that builds the weekview events array
  }
);

// finally just build dayViewEvents as a computed property
</script>

<template>
  <div class="inputBar">
    <DatePicker />
    <div class="rightJustifiedInputs">
      <ModePicker />
      <span
        class="material-symbols-outlined add"
        @click="toggleEventForm()"
      >
        add
      </span>
    </div>
  </div>
  <div class="content">
    <MonthView v-if="viewMode.mode === 'month'" />
    <WeekView v-else-if="viewMode.mode === 'week'" />
    <DayView v-else-if="viewMode.mode === 'day'" />
  </div>
</template>

<style scoped>
.inputBar {
  height: 15%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.rightJustifiedInputs {
  display: flex;
  gap: 10px;
  margin-right: 5px;
}

.content {
  height: 85%;
}

.material-symbols-outlined.add {
  color: #344f49;
  transition: transform 0.3s ease;
}

.material-symbols-outlined.add:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}
</style>
