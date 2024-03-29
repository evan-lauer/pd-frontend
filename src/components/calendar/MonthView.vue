<script setup>
import { computed, watch } from 'vue';
import { Calendar } from 'calendar-base';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from 'src/stores/eventStores';
import { eventDetails } from 'src/stores/eventDetailsStores';
import EventStar from 'src/components/calendar/events/EventStar.vue';
import { addEventForm } from 'src/stores/addEventFormStores';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const updateDayClicked = (day, month, year) => {
  selectedDate.setDateToClicked(day, month, year);
};

const displayDays = computed(() => {
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

function prefilledEventForm(weekIndex, dayIndex) {
  const clickedDate = getDayByIndex(weekIndex, dayIndex);
  const startDateTime = new Date();
  startDateTime.setDate(clickedDate.day);
  startDateTime.setMonth(clickedDate.month);
  startDateTime.setFullYear(clickedDate.year);
  startDateTime.setMinutes(0);
  startDateTime.setSeconds(0);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  addEventForm.startDateTime = startDateTime;
  addEventForm.endDateTime = endDateTime;
  eventDetails.isDetailsActive = false;
  addEventForm.isFormActive = true;
}

function isSelectedDate(date) {
  const timestamp = selectedDate.dateTime;
  return (
    date.day === timestamp.getDate() &&
    date.month === timestamp.getMonth() &&
    date.year === timestamp.getFullYear()
  );
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
        class="day"
        :class="{ selected: isSelectedDate(getDayByIndex(week, day)) }"
        @click="
          updateDayClicked(
            getDayByIndex(week, day).day,
            getDayByIndex(week, day).month,
            getDayByIndex(week, day).year
          )
          // upcomingTaskChecker();
        "
      >
        <div
          class="dayHeader"
          v-if="renderWeekHeader(week, day) !== ''"
        >
          {{ renderWeekHeader(week, day) }}
        </div>
        <div
          class="dateNumber"
          :class="{
            lastMonth: getDayByIndex(week, day).month !== selectedDate.dateTime.getMonth(),
            today: isToday(getDayByIndex(week, day))
          }"
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
          class="pseudoDay"
          :class="{ first: day === 1 }"
          @dblclick="
            () => {
              prefilledEventForm(week, day);
            }
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
  transition: background 0.1s linear;
}

.day:hover {
  background: var(--google-docs-grey);
}

.day.selected {
  background: #f0f3f5;
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
  z-index: 5;
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

.dateNumber.today {
  color: #dd825f;
  font-weight: 500;
}

.day.selected > .dateNumber {
  font-weight: 700;
}

.dayHeader {
  position: absolute;
  top: -20px;
  font-size: 1.2vw;
}
</style>
