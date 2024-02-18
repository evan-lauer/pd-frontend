<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { addEventForm } from '../../stores/addEventFormStores';
import { newEventForm } from 'src/stores/formStores';

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
    <button
      class="submitButton"
      @click="submissionHandler()"
    >
      Submit
    </button>
  </div>
</template>
<style scoped>
.formTitleHeader {
  font-size: 24px;
}
.formContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.datePickerPanel {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.inputRow {
  display: flex;
  gap: 8px;
}
</style>
