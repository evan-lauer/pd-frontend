<script setup>
import { viewMode, selectedDate } from 'src/stores/calendarStores';
import { eventData } from 'src/stores/eventStores';
import { listsData } from 'src/stores/listStores';
import { GChart } from 'vue-google-charts';
import { ref, computed } from 'vue';

eventData.creatingTodaysEvents();

const selectedTabId = ref(null);

const numCompleteTasks = computed(() => {
  let completedTasks = 0;
  if (selectedTabId.value === null) {
    return 1;
  } else {
    for (let i = 0; i < listsData.tabs[selectedTabId.value].items.length; i++) {
      if (listsData.tabs[selectedTabId.value].items[i].checked === true) {
        completedTasks++;
      }
    }
  }
  console.log('taasks completeed', completedTasks);
  return completedTasks;
});

const numIncompleteTasks = computed(() => {
  let incompleteTasks = 0;

  if (selectedTabId.value === null) {
    return 1;
  } else {
    for (let i = 0; i < listsData.tabs[selectedTabId.value].items.length; i++) {
      if (listsData.tabs[selectedTabId.value].items[i].checked === false) {
        incompleteTasks++;
      }
    }
  }
  console.log('incomplete tasks', incompleteTasks);
  return incompleteTasks;
});

const chartData = computed(() => {
  return [
    ['Task Name', 'Items'],
    ['Complete', numCompleteTasks.value],
    ['Incomplete', numIncompleteTasks.value]
  ];
});

const chartType = 'PieChart';

const chartOptions = {
  legend: 'none',
  slices: {
    0: { color: '#dd825f' },
    1: { color: 'grey' }
  },
  chartArea: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '85%',
    backgroundColor: 'red'
  },
  forceIFrame: true,
  pieSliceText: 'percentage',
  sliceVisibilityThreshold: 0,
  height: 75,
  width: 85,
  fontSize: 8,
  backgroundColor: 'transparent',
  enableInteractivity: false
};

const getWidth = (event) => {
  // Calculates the width of the div that represents an event in the day visualizer widget
  const sTime = new Date(event.startTime);
  const eTime = new Date(event.endTime);
  return `${
    ((eTime.getHours() * 60 + eTime.getMinutes() - (sTime.getHours() * 60 + sTime.getMinutes())) /
      1440) *
    100
  }%`;
};

const eventDuration = (event) => {
  // Calculates the duration of each event scheduled on the selectedDate
  // Populates the popup when eventDiv hovered
  let string = '';
  const sTime = new Date(event.startTime);
  const eTime = new Date(event.endTime);
  const durationMS = eTime.getTime() - sTime.getTime();
  const durationM = durationMS / 1000 / 60;
  const hours = Math.floor(durationM / 60);
  const minutes = Math.floor(durationM % 60);

  if (hours === 0) {
    string = minutes + ' mins';
  } else if (minutes === 0) {
    string = hours + ' hrs';
  } else {
    string = hours + ' hrs ' + minutes + ' mins';
  }
  return string;
};

// returns total number of hours allocated to events for a given day
function totalEventTime(selected_date) {
  let event_arr;
  if (viewMode.mode === 'month') {
    event_arr = eventData.monthlyEvents[selected_date];
  } else if (viewMode.mode === 'week') {
    event_arr = eventData.weeklyEvents[selected_date];
  } else {
    event_arr = eventData.dailyEvents;
  }
  let res = 0;
  let str = '';
  if (event_arr) {
    for (let i = 0; i < event_arr.length; i++) {
      res += event_arr[i].endTime.getHours() - event_arr[i].startTime.getHours();
    }
  }
  str = res === 1 ? 'hour' : 'hours';
  return res + ' ' + str;
}

// returns total number of events for a given day
function totalEventQuantity(selected_date) {
  let event_arr;
  if (viewMode.mode === 'month') {
    event_arr = eventData.monthlyEvents[selected_date];
  } else if (viewMode.mode === 'week') {
    event_arr = eventData.weeklyEvents[selected_date];
  } else {
    event_arr = eventData.dailyEvents;
  }
  let str = '0 events';
  if (event_arr) {
    str = event_arr.length === 1 ? 'event' : 'events';
    return event_arr.length + ' ' + str;
  }
  return str;
}

function viewArray(selected_date) {
  let event_arr;
  if (viewMode.mode === 'month') {
    event_arr = eventData.monthlyEvents[selected_date];
  } else if (viewMode.mode === 'week') {
    event_arr = eventData.weeklyEvents[selected_date];
  } else {
    event_arr = eventData.dailyEvents;
  }
  return event_arr;
}

function upcomingEventChecker() {
  // Checks for upcoming events on the current day
  let message = 'No upcoming events today!';
  let current_date = new Date();
  let event_arr;

  const dateOptions = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: '2-digit',
    minute: '2-digit'
  };
  console.log("today's events are: ", eventData.todaysEvents)
  console.log("daily events are: ", eventData.dailyEvents)

  if (viewMode.mode === 'month') {
    event_arr = eventData.monthlyEvents[current_date.getDate()];
  } else if (viewMode.mode === 'week') {
    event_arr = eventData.weeklyEvents[current_date.getDate()];
  } else {
    event_arr = eventData.dailyEvents;
  }
  // console.log("the event array is : ", event_arr)

  if (event_arr && event_arr.length > 0) {
    let nextTask = null;
    let eventObject = null;
    let closestTimeDifference = Infinity;

    for (let i = 0; i < event_arr.length; i++) {
      const dateObjectOfEvent = new Date(
        event_arr[i].startTime
      );

      if (dateObjectOfEvent.getTime() > current_date.getTime()) {
        const timeDifference = dateObjectOfEvent.getTime() - current_date.getTime();

        if (timeDifference > 0 && timeDifference < closestTimeDifference) {
          nextTask = dateObjectOfEvent;
          eventObject = event_arr[i];
          closestTimeDifference = timeDifference;
        }
        if (eventObject && nextTask) {
          message =
            'Your next event is ' +
            eventObject.title +
            ' at ' +
            nextTask.toLocaleTimeString(undefined, dateOptions);
        }
      }
    }
  }
  return message;
}
</script>

<template>
  <div class="widgetContainer">
    <div class="upcomingEventWidget" @click="console.log(eventData.dailyEvents)">
      <div class="upcomingEvent">
        <span
          class="material-symbols-outlined"
          style="color: #344f49"
        >
          event_upcoming
        </span>
        {{ upcomingEventChecker() }}
      </div>
    </div>
    <div class="taskContainer">
      <div class="pieChart">
        <GChart
          :type="chartType"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <select
        v-model="selectedTabId"
        class="dropdown"
      >
        <option
          v-for="(list, listId) in listsData.tabs"
          :key="listId"
          :id="`dropdown-` + listId"
          :value="listId"
        >
          {{ list.listTitle }}
        </option>
      </select>
    </div>
    <div class="barContainer">
      <div style="font-size: 14px">
        You are busy for {{ totalEventTime(selectedDate.dateTime.getDate()) }}<br />and you have
        {{ totalEventQuantity(selectedDate.dateTime.getDate()) }}
      </div>
      <div
        class="dayVisualizer"
        v-if="eventData.monthlyEvents[selectedDate.dateTime] !== ''"
      >
        <div
          v-for="(events, index) in viewArray(selectedDate.dateTime.getDate())"
          :key="index"
          :class="index === 0 ? 'firstEventDiv' : 'eventDivs'"
          :style="{ width: getWidth(events) }"
        >
          <div class="eventNamePopup">{{ events.title }}<br />{{ eventDuration(events) }}</div>
        </div>
      </div>
      <div style="font-size: 12px; font-style: italic">
        {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }}
        {{ selectedDate.dateTime.getDate() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.widgetContainer {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 6px 6px;
  grid-auto-flow: row;
}

.upcomingEventWidget {
  grid-row: 1;
  grid-column: 1;
  border: 2px solid var(--primary-default);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  max-width: 100%;
}

.upcomingEvent {
  text-align: center;
}
.taskContainer {
  grid-row: 1;
  grid-column: 2;
  border: 2px solid #dd825f;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}
.barContainer {
  grid-row: 2;
  grid-column: span 2;
  border: 2px solid var(--primary-default);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0px;
  gap: 10px;
  font-size: medium;
  text-align: center;
}
.dropdown {
  display: flex;
  width: auto;
  height: auto;
  padding: 2px;
  margin: 4px;
  border: 1px solid #dd825f;
  border-radius: 3px;
  text-align: center;
}
.dayVisualizer {
  height: 20px;
  width: 90%;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background: transparent;
  text-align: center;
}
.eventDivs {
  position: relative;
  height: 100;
  border: 0.5px solid black;
  border-top: 0px transparent;
  border-bottom: 0px transparent;
  background-color: var(--primary-default);
  overflow: visible;
}
.eventDivs:hover {
  background-color: lightgreen;
}

.firstEventDiv {
  position: relative;
  height: 100;
  border: 0.5px solid black;
  border-top: 0px transparent;
  border-bottom: 0px transparent;
  background-color: var(--primary-default);
  overflow: visible;
  border-radius: 9px 0px 0px 9px;
}
.firstEventDiv:hover {
  background-color: lightgreen;
}

.firstEventDiv:hover > .eventNamePopup {
  display: flex;
}

.eventNamePopup {
  display: none;
  position: absolute;
  bottom: 25px;
  left: 50%;
  min-width: 100px;
  transform: translateX(-50%);
  border-radius: 5px;
  font-size: small;
  background-color: lightgray;
  padding: 4px;
  z-index: 1;
  justify-content: center;
  align-items: center;
}

.eventDivs:hover > .eventNamePopup {
  display: flex;
}
</style>
