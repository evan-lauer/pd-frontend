<!-- change eventData.monthlyEvents[selectedDate.dateTime.getDate()] to eventData.testEvents (hardcoded) to test 
day container and upcoming tasks-->

<script setup>
import { selectedDate } from '../../stores/calendarStores';
import { eventData } from '../../stores/eventStores';

const getWidth = (event) => {
  const sTime = new Date(event.startTime);
  const eTime = new Date(event.endTime);
  return `${((eTime.getHours() - sTime.getHours()) / 24) * 100}%`;
}

const widgetsTestData = [
  {
    description: '',
    endTime: '2024-02-16T12:00:00.000Z',
    eventId: '5TZIPTLMGs',
    startTime: '2024-02-16T08:00:00.000Z',
    title: 'event1',
    userId: 'test-user'
  },
  {
    description: '',
    endTime: '2024-02-16T23:00:00.000Z',
    eventId: '5TZIPTLMGs',
    startTime: '2024-02-16T21:00:00.000Z',
    title: 'event2',
    userId: 'test-user'
  },
]

function upcomingEventChecker() { 
  // Checks for any upcoming events 
  let message = 'No upcoming events today!';
  const dateOptions = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit'
  }

  if (eventData.monthlyEvents[currentDayTime.getDate()].length > 0) {
    let nextTask = null;
    let eventObject = null;
    let closestTimeDifference = Infinity;

    for (let i = 0; i < eventData.monthlyEvents[currentDayTime.getDate()].length; i++){
      const dateObjectOfEvent = new Date(eventData.monthlyEvents[currentDayTime.getDate()][i].startTime);
      const timeDifference = dateObjectOfEvent.getTime() - currentDayTime.getTime();

      if (timeDifference > 0 && timeDifference < closestTimeDifference){
        nextTask = dateObjectOfEvent;
        eventObject = eventData.monthlyEvents[currentDayTime.getDate()][i];
        closestTimeDifference = timeDifference;
      }
      if (eventObject && nextTask) {
        message = 'Your next task is ' + eventObject.title + ' at ' + nextTask.toLocaleTimeString(undefined, dateOptions);
      }
    }}
  return message;
}

const currentDayTime = new Date();
</script>

<template>
    <div class="widgetContainer">
        <div class="upcomingEventWidget">
          <div class="upcomingEvent">  {{ upcomingEventChecker() }} </div>
        </div>
        <div class="taskContainer">
            <div class="taskCircle" @click="console.log(upcomingEventChecker());"></div>
            <select class="dropdown">
              <option>1</option>
            </select>
        </div>
        <div class="barContainer" >
            Tasks for 
            {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }} 
            {{selectedDate.dateTime.getDate()}} 
            {{selectedDate.dateTime.getFullYear()}}
            <div class="dayVisualizer" v-if="eventData.monthlyEvents[selectedDate.dateTime] !== ''">
              <div v-for="events in eventData.monthlyEvents[selectedDate.dateTime.getDate()]"
              :key="events" class="eventDivs"
              :style="{ width: getWidth(events) }"
              >
              </div>
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
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex-direction: column;
}

.upcomingEvent {
  text-align: center;
}
.taskContainer {
    grid-row: 1; /* Each section will take equal space */
    grid-column: 2;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.barContainer {
    grid-row: 2;
    grid-column: span 2;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0px;
    gap: 10px;
    font-size: medium;
}

.taskCircle {
    /* height: 70%; */
    padding-top: 35%;
    width: 35%;
    background-color: #bbb;
    border-radius: 50%;
    margin: 5px;
}

.dropdown{
  width: auto;
  height: auto;
}

.dayVisualizer {
    height: 20px;
    width: 90%;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    background: transparent;
}
.eventDivs {
    height: 95%;
    border: 1px solid orange;
    background-color: blue;
    z-index: 0;
}
</style>