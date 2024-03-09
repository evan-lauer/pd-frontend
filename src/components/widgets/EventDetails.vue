<!-- The view for displaying events in the widget space after a specific -->
<!-- event has been clicked -->
<script setup>
import { eventDetails, eventDeleteConfirm } from 'src/stores/eventDetailsStores';
import { eventData } from 'src/stores/eventStores';
import DeleteConfirm from 'src/components/widgets/DeleteConfirm.vue';
import { computed } from 'vue';

const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

function sendToConfirmView() {
  eventDeleteConfirm.isConfirmDeleteActive = true;
  // confirmDeleteWindowActive = true;
  console.log('The confirm delete view is active ', eventDeleteConfirm.isConfirmDeleteActive);
}

const isCancelActive = computed(() => {
  return eventDeleteConfirm.isConfirmDeleteActive;
});
</script>

<template>
  <!-- <div class="eventDisplayContainer"> -->
  <div :class="isCancelActive ? `eventDisplayContainer disabled` : `eventDisplayContainer`">
    <div class="eventContent">
      <div class="eventDisplayHeader">
        <span
          :class="
            isCancelActive
              ? `material-symbols-outlined calendarMonth disabled`
              : `material-symbols-outlined calendarMonth`
          "
        >
          calendar_month
        </span>
        <div :class="isCancelActive ? `eventTitle disabled` : `eventTitle`">
          {{ eventDetails.title }}
        </div>
      </div>
      <div class="eventDateRange">
        <span
          :class="
            isCancelActive
              ? `material-symbols-outlined schedule disabled`
              : `material-symbols-outlined schedule`
          "
        >
          schedule
        </span>
        <div :class="isCancelActive ? `eventTimes disabled` : `eventTimes`">
          <div class="eventStart">
            Start Time:
            <div class="theTime">
              {{ eventDetails.startDateTime.toDateString() }} at
              {{ eventDetails.startDateTime.toLocaleTimeString(undefined, timeOptions) }}
            </div>
          </div>
          <div class="eventEnd">
            End Time:
            <div class="theTime">
              {{ eventDetails.endDateTime.toDateString() }} at
              {{ eventDetails.endDateTime.toLocaleTimeString(undefined, timeOptions) }}
            </div>
          </div>
        </div>
      </div>
      <div class="eventDescription">
        <span
          :class="
            isCancelActive
              ? `material-symbols-outlined description disabled`
              : `material-symbols-outlined description`
          "
        >
          description
        </span>
        <div :class="isCancelActive ? `eventNotes disabled` : `eventNotes`">
          {{ eventDetails.description }}
        </div>
      </div>
    </div>
    <div class="eventActionBar">
      <span
        :class="
          isCancelActive
            ? `material-symbols-outlined edit disabled`
            : `material-symbols-outlined edit`
        "
        @click="eventData.displayEditEvent(eventDetails)"
      >
        edit
      </span>
      <span
        :class="
          isCancelActive
            ? `material-symbols-outlined delete disabled`
            : `material-symbols-outlined delete`
        "
        @click="sendToConfirmView()"
      >
        delete_forever
      </span>
    </div>
    <DeleteConfirm
      v-if="isCancelActive"
      item="event"
      deleteHandlerIs="event"
    />
  </div>
</template>

<style>
.eventDisplayContainer {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.eventDisplayContainer.disabled {
  background-color: rgba(65, 77, 74, 0.3);
}

.eventActionBar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
}

.material-symbols-outlined.calendarMonth {
  color: #344f49;
}

.material-symbols-outlined.calendarMonth.disabled {
  color: #9098a1;
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

.material-symbols-outlined.edit.disabled {
  color: #9098a1;
  pointer-events: none;
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

.material-symbols-outlined.delete.disabled {
  color: #9098a1;
  pointer-events: none;
}

.material-symbols-outlined.schedule {
  color: #344f49;
}

.material-symbols-outlined.schedule.disabled {
  color: #9098a1;
}

.material-symbols-outlined.description {
  color: #344f49;
}

.material-symbols-outlined.description.disabled {
  color: #9098a1;
}

.eventDisplayHeader {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 15px;
  align-items: center;
}
.eventTitle {
  font-weight: bold;
  font-size: large;
  padding-left: 10px;
}

.eventTitle.disabled {
  color: #9098a1;
}

.eventDescription {
  display: flex;
  flex-direction: row;
  font-style: italic;
  justify-content: flex-start;
}

.eventNotes {
  padding-left: 10px;
  overflow-y: auto;
  max-height: 75px;
}

.eventNotes.disabled {
  color: #9098a1;
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

.eventTimes.disabled {
  color: #9098a1;
}

.eventStart {
  padding-bottom: 5px;
}

.theTime {
  font-weight: normal;
}
</style>
