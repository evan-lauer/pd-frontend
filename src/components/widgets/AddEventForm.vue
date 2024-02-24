<!-- make the margin on the left bigger and shift the icons to the right -->

<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { addEventForm } from 'src/stores/addEventFormStores';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
import { computed } from 'vue';

function submissionHandler() {
  addEventForm.isFormActive = false;
  addEventForm.putEvent();
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

const startDateString = computed(() => getISOString(addEventForm.startDateTime));
const endDateString = computed(() => getISOString(addEventForm.endDateTime));
// This is true if the start timestamp comes before the end.
// If this is false, we can't allow the user to submit the form.
const isValidTimePeriod = computed(() => {
  return addEventForm.startDateTime > addEventForm.endDateTime;
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
  <div class="formContainer">
    <div class="inputRow">
      <input
        class="eventNameInput"
        placeholder="Add Event Title"
        @change="
          (event) => {
            addEventForm.title = event.target.value;
          }
        "
      />
    </div>
    <div class="inputRow">
      <img
        src="src/components/icons/clock9.svg"
        class="clockIcon"
        alt="Time Icon"
      />
      <div class="dateLabel">Start Date</div>
      <input
        class="datePicker"
        :class="{ error: isValidTimePeriod }"
        type="date"
        :value="startDateString"
        @input="
          (event) => {
            addEventForm.startDateTime = rebuildDateObject(
              addEventForm.startDateTime,
              event.target.value
            );
          }
        "
      />
      <TimePicker
        :timestamp="addEventForm.startDateTime"
        :class="{ error: isValidTimePeriod }"
        @timestamp-change="
          (newTimestamp) => {
            addEventForm.startDateTime = newTimestamp;
          }
        "
      />
    </div>
    <div class="inputRow">
      <div class="dateLabel">End Date</div>
      <input
        class="datePicker end"
        :class="{ error: isValidTimePeriod }"
        type="date"
        :value="endDateString"
        @input="
          (event) => {
            addEventForm.endDateTime = rebuildDateObject(
              addEventForm.endDateTime,
              event.target.value
            );
          }
        "
      />
      <TimePicker
        :timestamp="addEventForm.endDateTime"
        :class="{ error: isValidTimePeriod }"
        @timestamp-change="
          (newTimestamp) => {
            addEventForm.endDateTime = newTimestamp;
          }
        "
      />
    </div>
    <div class="inputRow">
      <img
        src="src/components/icons/description.svg"
        class="descriptionIcon"
        alt="Description Icon"
      />
      <input
        class="descriptionInput"
        placeholder="Add Event Description"
        @change="
          (event) => {
            addEventForm.description = event.target.value;
          }
        "
      />
    </div>
    <div class="saveButtonRow">
      <SimpleButton
        inner-text="Save"
        @click="submissionHandler()"
        :disabled="isValidTimePeriod"
      />
    </div>
  </div>
</template>

<style scoped>
.formContainer {
  height: 100%;
  width: 95%;
  display: flex;
  gap: 5px;
  margin: 0 0 0 30px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
}
.clockIcon {
  height: 15px;
  width: 15px;
  position: absolute;
  left: 30px;
}
.descriptionIcon {
  height: 15px;
  width: 15px;
  position: absolute;
  left: 30px;
}
.eventNameInput {
  height: 25px;
  width: 100%;
  border: 1px solid transparent;
  font-size: large;
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
}
.descriptionInput:focus {
  border-bottom: 1px solid var(--primary-default);
  outline: none;
}
.descriptionInput::placeholder {
  font-size: small;
}
.inputRow {
  display: flex;
  align-items: center;
  max-width: 100%;
  justify-content: flex-start;
}
.datePicker {
  width: 110px;
}
.dateLabel {
  display: flex;
  width: 20%;
  height: auto;
  max-height: 10px;
  align-items: center;
}
.saveButtonRow {
  display: flex;
  justify-content: flex-end;
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
</style>
