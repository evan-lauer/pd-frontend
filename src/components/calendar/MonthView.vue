<script setup>
import { computed, watch } from 'vue';
import { Calendar } from 'calendar-base';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from '../../stores/eventStores';
import EventStar from 'src/components/calendar/events/EventStar.vue';
import { addEventForm } from '../../stores/addEventFormStores';
import { eventDetails } from 'src/stores/eventDetailsStores';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const updateDayClicked = (day, month, year) => {
  selectedDate.setDateToClicked(day, month, year);
};

const displayDays = computed(() => {
  return calendar.getCalendar(
    selectedDate.dateTime.getFullYear(),
    selectedDate.dateTime.getMonth()
  );
});

// 1 indexed
function getDayByIndex(week, day) {
  const index = (week - 1) * 7 + (day - 1);
  if (displayDays.value[index]) {
    return displayDays.value[index];
  } else {
    return false;
  }
}

function isToday(date) {
  const today = new Date();
  return (
    date.year === today.getFullYear() &&
    date.month === today.getMonth() &&
    date.day === today.getDate()
  );
}

function prefilledEventForm(day, month, year) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const laterHour = currentHour + 1; //Default endTime is one hour later than the current time.

  eventDetails.isDetailsActive = false;
  addEventForm.isPrefilled = true;
  addEventForm.isFormActive = true;

  addEventForm.startDateTime = new Date(year, month, day, currentHour, currentMinute);
  addEventForm.endDateTime = new Date(year, month, day, laterHour, currentMinute);

  console.log('Start Time: ', addEventForm.startDateTime, '\nEnd Time: ', addEventForm.endDateTime);
}

userStore.getEvents();
eventData.creatingMonthsEventArray();

watch(
  () => selectedDate.dateTime.getMonth(),
  () => {
    // This ensures that the numsEventsArray is reset when the month is changed
    userStore.getEvents();
    eventData.creatingMonthsEventArray();
  }
);

function renderWeekHeader(week, day) {
  if (week === 1) {
    switch (day) {
      case 1:
        return `Sunday`;
      case 2:
        return `Monday`;
      case 3:
        return `Tuesday`;
      case 4:
        return `Wednesday`;
      case 5:
        return `Thursday`;
      case 6:
        return `Friday`;
      case 7:
        return `Saturday`;
      default:
        return ``;
    }
  }
}
</script>

<template>
  <div class="monthContainer">
    <div
      v-for="week in 6"
      :key="week"
      :class="week === 1 ? 'weekContainer first' : 'weekContainer'"
    >
      <div
        v-for="day in 7"
        :key="day"
        :class="'day'"
      >
        <div
          class="dayHeader"
          v-if="renderWeekHeader(week, day) !== ''"
        >
          {{ renderWeekHeader(week, day) }}
        </div>
        <div
          :class="
            getDayByIndex(week, day).month !== selectedDate.dateTime.getMonth()
              ? `dateNumber lastMonth`
              : `dateNumber`
          "
          :style="isToday(getDayByIndex(week, day)) ? `color: #DD825F; font-weight: bold;` : ``"
        >
          {{ getDayByIndex(week, day).day }}
        </div>
        <div
          class="eventsContainer"
          v-if="getDayByIndex(week, day).month === selectedDate.dateTime.getMonth()"
        >
          <div
            class="eventSymbol"
            @click="() => eventMethods.displayEvent(eventA)"
            v-for="eventA of eventData.monthlyEvents[getDayByIndex(week, day).day]"
            :key="eventA"
          >
            <EventStar />
          </div>
        </div>
        <div
          :class="day === 1 ? `pseudoDay first` : `pseudoDay`"
          @click="
            updateDayClicked(
              getDayByIndex(week, day).day,
              getDayByIndex(week, day).month,
              getDayByIndex(week, day).year
            )
          "
          @dblclick="
            prefilledEventForm(
              getDayByIndex(week, day).day,
              getDayByIndex(week, day).month,
              getDayByIndex(week, day).year
            )
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.monthContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;
}
.weekContainer {
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: var(--calendar-border-grey) 1px solid;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.weekContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}

.day {
  height: 100%;
  width: 100%;
  position: relative;
}

.eventsContainer {
  max-height: 2em;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.eventSymbol {
  z-index: 10;
}

.pseudoDay {
  height: 80%;
  width: 100%;
  position: absolute;
  top: 0;
  margin: 10% 0;
  border-right: 1px solid var(--calendar-border-grey);
}

.pseudoDay.first {
  border-left: 1px solid var(--calendar-border-grey);
}

.dateNumber {
  padding-left: 3px;
}

.dateNumber.lastMonth {
  color: #9098a1;
}

.dayHeader {
  position: absolute;
  top: -20px;
}
</style>
