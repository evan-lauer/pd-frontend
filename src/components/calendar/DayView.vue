<script setup>
import { watch } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from '../../stores/eventStores';
import EventStar from './events/EventStar.vue';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
import miniCalendarPicker from './miniCalendarPicker.vue';

userStore.getEvents();
eventData.creatingDaysEventArray();
watch(
  () => selectedDate.dateTime.getMonth(),
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
      <div
        class="hourContainer"
        v-for="hour in 24"
        :key="hour"
        :id="hour - 1"
        :class="hour === 1 ? `hourContainer first` : `hourContainer`"
      >
        {{ hour - 1 }}:00
        <div class="eventsContainer">
          <div
            class="eventSymbol"
            @click="() => eventMethods.displayEvent(eventA)"
            v-for="eventA of eventData.monthlyEvents[selectedDate.dateTime.getDay()]"
            :key="eventA"
          >
            <EventStar />
          </div>
        </div>
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
}

.hourContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
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
</style>
