<script setup>
import { watch } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from 'src/stores/eventStores';
import miniCalendarPicker from 'src/components/calendar/miniCalendarPicker.vue';
import DayViewEvent from './DayViewEvent.vue'

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
    <DayViewEvent :day="day"/>
    <div
      class="dayContainer"
      v-for="day in 1"
      :key="day"
      :class="day === 1 ? `dayContainer first` : `dayContainer`"
    >
      <div
        class="hourContainer"
        v-for="(hour, index) in 24"
        :key="hour"
        :id="hour - 1"
        :class="index === 0 ? `hourContainer first hour` + index : `hourContainer hour` + index"
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
  top: 5%;
  left: 1%;
  font-size: small;
}
.halfHourContainer.first {
  height: 50%;
  border-bottom: var(--calendar-border-grey) 1px dashed;
}
.contentDiv {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 95.5%;
  width: 70%;
  float: left;
  position: relative;
  z-index: 0;
}
.datePickerDiv {
  float: center;
}
.eventsContainer {
  /* width: 14%; */
  border-radius: 7px;
  background-color: #9098A1;
  position: relative;
  z-index: 2;
  border: 1px solid aliceblue;
  overflow-y: auto;
}

.eventDesc {
  font-size: 10px;
  padding: 5px;
  width: 80%;
  overflow: hidden;
}
</style>
