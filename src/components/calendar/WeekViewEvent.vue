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

// height component
function calculate_height(startTime, endTime) {
  const height =
    (endTime.getHours() +
      endTime.getMinutes() / 60 -
      (startTime.getHours() + startTime.getMinutes() / 60)) *
    hourContainerHeight.value;
  console.log('height for this event: ', height);
  return height + 'px';
}
// top component
function calculate_top(startTime) {
  const hourNumber = startTime.getHours();

  const minutes = startTime.getMinutes();

  const top = hourContainerOffsets.value[hourNumber] + (minutes / 60) * hourContainerHeight.value;
  console.log('top for this event: ', top);

  return top + 'px';
}

// insert overlapping event case code here

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
    }"
    @click="() => eventMethods.displayEvent(eventA)"
    v-for="eventA of eventData.weeklyEvents[getDays()[day - 1].day]"
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
    /* z-index: 1; */
    border: 1px solid aliceblue;
    transition: background-color 0.1s linear;
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
