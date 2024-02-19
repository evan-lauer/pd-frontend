<!-- The view for displaying events in the widget space after a specific -->
<!-- event has been clicked -->
<script setup>
import { eventDetails } from '../../stores/eventDetailsStores';
</script>

<template>
  <div class="eventDisplayContainer">
    <div class="eventDisplayHeader">
      <div class="eventTag">The Tag</div>
      <div class="eventTitle">Title: {{ eventDetails.title }}</div>
    </div>
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
    <div class="eventDescription">Description: {{ eventDetails.description }}</div>
  </div>
</template>

<style>
.eventDisplayContainer {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-evenly;
}
.eventDisplayHeader {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-direction: column;
}
.eventTitle {
  font-weight: bold;
  font-size: large;
}
.eventDescription {
  font-style: italic;
}
.eventTimes {
  font-weight: bold;
}
.theTime {
  font-weight: normal;
}
</style>
