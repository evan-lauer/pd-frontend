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
      <div class="inputRow">
        <input class="eventNameInput" placeholder="Add Event Title"/>
      </div>
      <div class="inputRow">
        <img src="src/components/icons/clock9.svg" class="clockIcon" alt="Time Icon">
        <div class="dateLabel">Start Date</div>
        <input
          class="datePicker"
          type="date"
          :value="addEventForm.startDateTime"
        />
        <TimePicker :timestamp="addEventForm.startDateTime" />
      </div>
      <div class="inputRow">
        <div class="dateLabel">End Date</div>
        <input
          class="datePicker"
          type="date"
          :value="addEventForm.endDateTime"
        />
        <TimePicker :timestamp="addEventForm.endDateTime" />
      </div>
      <div class="inputRow">
        <img src="src/components/icons/description.svg" class="descriptionIcon" alt="Description Icon">
        <input class="descriptionInput" placeholder="Add Event Description" />
      </div>
      <div class="saveButtonRow">
        <SimpleButton
          inner-text="Save"
          @click="submissionHandler()"
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
  margin: 0 0 0 20px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
}
.clockIcon {
  height: 15px;
  width: 15px;
  position: absolute;
  left: 25px;  
}
.descriptionIcon {
  height: 15px;
  width: 15px;
  position: absolute;
  left: 25px;  
}
.eventNameInput {
  height: 25px;
  width: 100%;
  border: 1px solid transparent;
  font-size: large;
}
.eventNameInput::placeholder{
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
</style>