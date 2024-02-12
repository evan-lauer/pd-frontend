<script setup>
import { watch } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from '../../stores/eventStores';
import DatePicker from './datePickers/miniCalendar.vue';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
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
      <div class="eventsContainer">
        <div
          class="eventSymbol"
          @click="() => eventMethods.displayEvent(eventA)"
          v-for="eventA of eventData.monthlyEvents[selectedDate.dateTime.getDay()]"
          :key="eventA"
        >
          {{ eventA.title }} <br />
          {{ eventA.description }} <br />
          {{ eventA.startTime }} <br />
          {{ eventA.endTime }} <br />
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
    <input
      type="datetime-local"
      id="newDate"
    />
    <br />
    <SimpleButton
      inner-text="Submit"
      @click="updateDate()"
    />
  </div>
</template>
<script>
function updateDate() {
  selectedDate.setToDate(document.getElementById('newDate').value);
}
</script>
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

.hourContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}
.halfHourContainer {
  height: 50%;
  position: flex;
}
.hourText {
  position: relative;
  height: 0%;
  z-index: 1;
}
.halfHourContainer.first {
  height: 50%;
  border-bottom: var(--calendar-border-grey) 1px dashed;
}
.contentDiv {
  overflow-y: scroll;
  height: 95.5%;
  width: 70%;
  float: left;
  z-index: 0;
}
.datePickerDiv {
  float: center;
}
.eventsContainer {
  border-radius: 7px;
  background-color: rgb(101, 39, 94);
  position: relative;
  z-index: 1;
  top: 20%;
}
</style>
