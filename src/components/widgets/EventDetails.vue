<!-- The view for displaying events in the widget space after a specific -->
<!-- event has been clicked -->
<script setup>
import { eventDetails } from 'src/stores/eventDetailsStores';
import { eventData } from 'src/stores/eventStores';
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
            {{ eventDetails.startDateTime.getHours() }}:{{ eventDetails.startDateTime.getMinutes() }}
          </div>
        </div>
        <div class="eventEnd">
          End Time:
          <div class="theTime">
            {{ eventDetails.endDateTime.toDateString() }} at
            {{ eventDetails.endDateTime.getHours() }}:{{ eventDetails.endDateTime.getMinutes() }}
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
    <div class="eventActionBar">
      <span class="material-symbols-outlined edit"> edit </span>
      <span
        class="material-symbols-outlined delete"
        @click="eventData.deleteEventFromBoth(eventDetails.eventId)"
      >
        delete_forever
      </span>
    </div>
  </div>
</template>

<style>
.eventDisplayContainer {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.eventActionBar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.material-symbols-outlined.edit {
  color: #344f49;
  transition: transform 0.3s ease;
}
.material-symbols-outlined.edit:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}

.material-symbols-outlined.delete {
  color: #344f49;
  transition: transform 0.3s ease;
}

.material-symbols-outlined.delete:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}

.eventDisplayHeader {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 15px;
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
  padding-bottom: 15px;
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
