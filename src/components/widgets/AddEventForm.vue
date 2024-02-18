<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { addEventForm } from '../../stores/addEventFormStores';
import { newEventForm } from 'src/stores/formStores';
import SimpleButton from 'src/components/icons/SimpleButton.vue';

function submissionHandler() {
  addEventForm.isFormActive = false;
  newEventForm.putEvent();
  newEventForm.reset();
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
          type="date"
          :value="addEventForm.startDateTime"
        />
      </div>
      <div class="inputRow time">
        Start Time
        <TimePicker :timestamp="addEventForm.startDateTime" />
      </div>
      <div class="inputRow date">
        End Date
        <input
          class="datePicker end"
          type="date"
          :value="addEventForm.endDateTime"
        />
      </div>
      <div class="inputRow time">
        End Time
        <TimePicker :timestamp="addEventForm.endDateTime" />
      </div>
    </div>
    <div class="inputRow">
      <p class="dateLabel">End Date</p>
      <input
        id="endDate"
        class="datePicker"
        type="date"
        v-bind:value="addEventForm.endDateTime"
      />
      <TimePicker
        v-if="addEventForm.isPrefilled"
        :timestamp="prefilledEndTime"
      />
      <TimePicker
        v-else
        :timestamp="addEventForm.endDateTime"
      />
    </div>
    <div class="inputRow">
      <input
        class="descriptionInput"
        placeholder="Add Event Description"
      />
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
</style>
