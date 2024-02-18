<script setup>
import { watch } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from '../../stores/eventStores';
import miniCalendarPicker from './miniCalendarPicker.vue';

userStore.getEvents();
eventData.creatingDaysEventArray();
watch(
  () => selectedDate.dateTime.getDate(),
  () => {
    // This ensures that the numsEventsArray is reset when the month is changed
    userStore.getEvents();
    eventData.creatingDaysEventArray();
  }
);

// for event containers, functions from week view; all hard coded for now, numbers may differ
// depending on heights of hour containers
function calculate_height(startTime, endTime) {
  const start_date = new Date(startTime);
  const end_date = new Date(endTime);
  const height = (end_date.getHours() - start_date.getHours()) * 48;
  return height + 'px';
}

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
  <div class="dayHeader">
    <div
      v-for="day in 1"
      :key="day"
      :class="day === 1 ? `dayHeader first` : `dayHeader`"
    ></div>
  </div>
  <div class="contentDiv">
    <div
      class="dayContainer"
      v-for="day in 1"
      :key="day"
      :class="day === 1 ? `dayContainer first` : `dayContainer`"
    >
        <div
          class="eventSymbol eventsContainer"
          :style="{height:calculate_height(eventA.startTime, eventA.endTime), top:calculate_top(eventA.startTime)}"
          @click="() => eventMethods.displayEvent(eventA)"
          v-for="eventA of eventData.dailyEvents"
          :key="eventA"
        >
          <div v-if="eventA.startTime !== eventA.endTime">
            <div class="eventDesc">{{ eventA.title }}</div>
            <div class="eventDesc">{{ formatTimes(eventA.startTime, eventA.endTime) }}</div>
          </div>
        </div>
      <div
        class="hourContainer"
        v-for="hour in 24"
        :key="hour"
        :id="hour - 1"
        :class="hour === 1 ? `hourContainer first` : `hourContainer`"
      >
        <div class="hourText">{{ hour - 1 }}:00</div>
        <div
          class="halfHourContainer"
          v-for="halfHour in 2"
          :key="halfHour"
          :id="halfHour - 1"
          :class="halfHour === 1 ? `halfHourContainer first` : `halfHourContainer`"
        ></div>
      </div>
    </div>
  </div>
  <div class="datePickerDiv">
    <miniCalendarPicker />
  </div>
</template>

<style scoped>
.dayHeader {
  text-align: center;
  width: 100%;
  gap: 5px;
  border-bottom: var(--calendar-border-grey) 1px solid;
}
.dayContainer {
  flex-direction: row;
  padding-right: 0.53%;
  height: 95.5%;
}
.hourContainer {
  height: 24%;
  border-bottom: var(--calendar-border-grey) 1px solid;
  max-height: min-content;
}
.halfHourContainer {
  height: 50%;
  position: flex;
}
.hourText {
  position: relative;
  height: 0%;
  z-index: 1;
  top:5%;
  left:1%;
}
.halfHourContainer.first {
  height: 50%;
  border-bottom: var(--calendar-border-grey) 1px dashed;
}
.contentDiv {
  overflow-y: scroll;
  overflow-x:hidden;
  height: 95.5%;
  width: 70%;
  float: left;
  z-index: 0;
}
.datePickerDiv {
  float: center;
  min-width:100%;
  min-height:100%;
}
.eventsContainer {
  border-radius: 7px;
  background-color: gray;
  position: absolute;
  z-index: 1;
}

.eventDesc {
  font-size: 10px;
  padding: 5px;
  width: 80%;
  overflow: hidden;
}
</style>
