<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { addEventForm } from 'src/stores/addEventFormStores';
import { newEventForm } from 'src/stores/formStores';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
import { computed } from 'vue';

function submissionHandler() {
  addEventForm.isFormActive = false;
  newEventForm.putEvent();
  newEventForm.reset();
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
    <h1 class="formTitleHeader">Create Event</h1>
    <input class="titleInput" />
    <input class="descriptionInput" />
    <div class="datePickerPanel">
      <div class="inputRow date">
        Start Date
        <input
          class="datePicker start"
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
      </div>
      <div class="inputRow time">
        Start Time
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
      <div class="inputRow date">
        End Date
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
      </div>
      <div class="inputRow time">
        End Time
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
    </div>
    <div class="saveButtonRow">
      <SimpleButton
        inner-text="Submit"
        @click="submissionHandler()"
      />
    </div>
  </div>
</template>

<style scoped>
.formTitleHeader {
  font-size: large;
  display: flex;
  justify-content: center;
}
.formContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  gap: 5px;
  padding: 2px;
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
  width: 20%;
  height: auto;
  max-height: 10px;
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
