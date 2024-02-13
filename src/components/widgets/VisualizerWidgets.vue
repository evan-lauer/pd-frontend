<!-- TODO: Have a bar that represents a day (24 hours) and fill up the corresponding portions with the tasks scheduled.
TODO: have a circle that represents a certain tab in list and show the percentage of tasks completed-->

<script setups>
import { selectedDate } from '../../stores/calendarStores';
import userStore from 'src/stores/userStore';
import { eventData, eventMethods } from '../../stores/eventStores';
import { defineExpose } from 'vue';


const wow = () => {
  console.log(selectedDate.dateTime);
}
defineExpose({wow});
</script>

<template>
    <div class="widgetContainer">
        <div class="messageContainer">some motivational something lol</div>
        <div class="taskContainer">
            <div class="taskCircle"></div>
            <select class="dropdown">
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
        </div>
        <div class="barContainer" @click="wow()">
            <div class="dayVisualizer">
            </div>
        </div>
    </div>
</template>
              <!-- <div v-for="(row, rowIndex) in eventsOfDayClicked.value" :key="rowIndex">
                <div v-for="(event, eventIndex) in row" :key="eventIndex" class="eventDivs">
                </div>
              </div> -->

<!-- example code -->
<!-- <template>
    <div class="dayBar">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        :style="{ left: getLeftOffset(task.startTime), width: getWidth(task.startTime, task.endTime) }"
        class="taskBlock"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [
          { startTime: 8, endTime: 10 }, // Example tasks with start and end times in hours
          { startTime: 12, endTime: 15 },
          { startTime: 18, endTime: 20 }
        ]
      };
    },
    methods: {
      getLeftOffset(startTime) {
        return `${(startTime / 24) * 100}%`; // Convert start time to percentage for left offset
      },
      getWidth(startTime, endTime) {
        return `${((endTime - startTime) / 24) * 100}%`; // Convert duration to percentage for width
      }
    }
  };
  </script>
  
  <style scoped>
  .taskBlock {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: #007bff; /* Example color for task blocks */
  }
  </style> -->


<style scoped>
.widgetContainer {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 4px 4px;
    grid-auto-flow: row;
}

.messageContainer {
    grid-row: 1; /* Each section will take equal space */
    grid-column: 1;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.taskContainer {
    grid-row: 1; /* Each section will take equal space */
    grid-column: 2;
    border: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.barContainer {
    grid-row: 2;
    grid-column: span 2;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 0px;
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
}
.eventDivs {
    width: 10%;
    height: 100%;
    border: 1px solid orange;
}
</style>