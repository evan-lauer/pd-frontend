<!-- make the margin on the left bigger and shift the icons to the right -->

<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { editEventForm } from 'src/stores/editEventFormStores';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
import { computed } from 'vue';
import { eventData } from 'src/stores/eventStores';
import { eventDetails } from 'src/stores/eventDetailsStores';

function submissionHandler(eventId) {
  editEventForm.isFormActive = false;
  eventData.editEvent(
    eventId,
    editEventForm.startDateTime.toISOString(),
    editEventForm.endDateTime.toISOString(),
    editEventForm.description,
    editEventForm.title
  );
}

function cancelEditHandler() {
  editEventForm.isFormActive = false;
}

// Date inputs require the value to be formatted as yyyy-mm-dd
// but our start and end dates are JS Date objects
// so these computed values will sync with the store.
// To update the computed value, we just update the store.
//
// This converts the date object to yyyy-mm-dd
function getISOString(dateObject) {
  const offset = dateObject.getTimezoneOffset();
  dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
  return dateObject.toISOString().split('T')[0];
}

const startDateString = computed(() => getISOString(editEventForm.startDateTime));
const endDateString = computed(() => getISOString(editEventForm.endDateTime));
// This is true if the start timestamp comes before the end.
// If this is false, we can't allow the user to submit the form.
const isValidTimePeriod = computed(() => {
  return editEventForm.startDateTime > editEventForm.endDateTime;
});

function rebuildDateObject(dateObject, dateString) {
  const dateComponents = dateString.split('-');
  const newDate = new Date(dateObject);
  newDate.setFullYear(dateComponents[0]);
  newDate.setMonth(dateComponents[1] - 1);
  newDate.setDate(dateComponents[2]);
  return newDate;
}
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
      <input
        class="eventNameInput"
        placeholder="Add Event Title"
        v-model="editEventForm.title"
      />
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
            <input
              class="datePicker"
              :class="{ error: isValidTimePeriod }"
              type="date"
              :value="startDateString"
              @input="
                (event) => {
                  editEventForm.startDateTime = rebuildDateObject(
                    editEventForm.startDateTime,
                    event.target.value
                  );
                }
              "
            />
            <TimePicker
              :timestamp="editEventForm.startDateTime"
              :class="{ error: isValidTimePeriod }"
              @timestamp-change="
                (newTimestamp) => {
                  editEventForm.startDateTime = newTimestamp;
                }
              "
            />
          </div>
        </div>
        <div class="eventEnd">
          End Time:
          <div class="theTime">
            <input
              class="datePicker end"
              :class="{ error: isValidTimePeriod }"
              type="date"
              :value="endDateString"
              @input="
                (event) => {
                  editEventForm.endDateTime = rebuildDateObject(
                    editEventForm.endDateTime,
                    event.target.value
                  );
                }
              "
            />
            <TimePicker
              :timestamp="editEventForm.endDateTime"
              :class="{ error: isValidTimePeriod }"
              @timestamp-change="
                (newTimestamp) => {
                  editEventForm.endDateTime = newTimestamp;
                }
              "
            />
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
      <input
        class="descriptionInput"
        placeholder="Add Event Description"
        v-model="editEventForm.description"
      />
      <div class="eventNotes"></div>
    </div>
    <div class="saveButtonRow">
      <SimpleButton
        inner-text="Save"
        @click="submissionHandler(eventDetails.eventId)"
        :disabled="isValidTimePeriod"
      />
      <SimpleButton
        inner-text="Cancel"
        @click="cancelEditHandler()"
        :disabled="isValidTimePeriod"
      />
    </div>
  </div>
</template>

<style scoped>
.saveButtonRow {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.saveButton {
  display: flex;
  margin: 4px;
  width: 50px;
  justify-content: center;
}

.error {
  border: 1px solid red;
}
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
  display: flex;
}

.eventNameInput {
  height: 25px;
  width: 100%;
  border: 1px solid transparent;
  font-size: large;
  padding-left: 10px;
}
.eventNameInput::placeholder {
  font-size: large;
}
.eventNameInput:focus {
  border-bottom: 1px solid var(--primary-default);
  outline: none;
}

.descriptionInput {
  height: 25px;
  width: 100%;
  border: 1px solid transparent;
  font-size: small;
  padding-left: 10px;
}
.descriptionInput:focus {
  border-bottom: 1px solid var(--primary-default);
  outline: none;
}
.descriptionInput::placeholder {
  font-size: small;
}
</style>
