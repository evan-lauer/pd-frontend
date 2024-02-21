<!-- The view for displaying events in the widget space after a specific -->
<!-- event has been clicked -->
<script setup>
import { eventDetails } from 'src/stores/eventDetailsStores';
</script>

<template>
  <div class="eventDisplayContainer">
    <div class="eventDisplayHeader">
      <span
        class="material-symbols-outlined"
        style="color: #344f49"
      >
        calendar_month
      </span>
      <div class="eventTitle">{{ eventDetails.title }}</div>
    </div>
    <div class="eventDateRange">
      <span
        class="material-symbols-outlined"
        style="color: #344f49"
      >
        schedule
      </span>
      <div class="eventTimes">
        <div class="eventStart">
          Start Time:
          <div class="theTime">
            {{ eventDetails.startDateTime.toDateString() }} at
            {{ eventDetails.startDateTime.toTimeString() }}
          </div>
        </div>
        <div class="eventEnd">
          End Time:
          <div class="theTime">
            {{ eventDetails.endDateTime.toDateString() }} at
            {{ eventDetails.endDateTime.toTimeString() }}
          </div>
        </div>
      </div>
    </div>
    <div class="eventDescription">
      <span
        class="material-symbols-outlined"
        style="color: #344f49"
      >
        description
      </span>
      <div class="eventNotes">
        {{ eventDetails.description }}
      </div>
    </div>
  </div>
</template>

<style>
.material-icons {
  font-family: 'Material Icons';
}

.eventDisplayContainer {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  border: 2px solid var(--primary-default);
  border-radius: 5px;
  padding: 5px;
}
.eventDisplayHeader {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 20px;
}
.eventTitle {
  font-weight: bold;
  font-size: large;
  padding-left: 10px;
}
.eventDescription {
  display: flex;
  flex-direction: row;
  font-style: italic;
  justify-content: flex-start;
}
.eventNotes {
  padding-left: 10px;
}

.eventDateRange {
  display: flex;
  flex-direction: row;
  font-weight: bold;
  justify-content: flex-start;
  padding-bottom: 20px;
}

.eventTimes {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.eventStart {
  padding-bottom: 5px;
}

.theTime {
  font-weight: normal;
}
</style>
