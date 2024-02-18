<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { selectedDate } from 'src/stores/calendarStores';
import { ref, watch } from 'vue';
import { addEventForm } from '../../stores/addEventFormStores';
import { newEventForm } from 'src/stores/formStores';
import SimpleButton from 'src/components/icons/SimpleButton.vue';


// Fill this object with the original timestamp of the current selected time (truncated to nearest hour)
// const prefilledStartTime = ref({
//   hours: addEventForm.startDateTime.getHours(),
//   minutes: addEventForm.startDateTime.getMinutes(),
//   amOrPm: addEventForm.startDateTime.getHours() >= 12 ? 'pm' : 'am'
// });

// const prefilledEndTime = ref({
//   hours: addEventForm.endDateTime.getHours(),
//   minutes: addEventForm.endDateTime.getMinutes(),
//   amOrPm: addEventForm.endDateTime.getHours() >= 12 ? 'pm' : 'am'
// });

// watch(
//   () => [addEventForm.startDateTime, addEventForm.endDateTime],
//   ([startDateTime, endDateTime]) => {
//     prefilledStartTime.value = {
//       hours: startDateTime.getHours(),
//       minutes: startDateTime.getMinutes(),
//       amOrPm: startDateTime.getHours() >= 12 ? 'pm' : 'am'
//     };
//     prefilledEndTime.value = {
//       hours: endDateTime.getHours(),
//       minutes: endDateTime.getMinutes(),
//       amOrPm: endDateTime.getHours() >= 12 ? 'pm' : 'am'
//     };
//   }
// );

// // const startTime = ref({
// //   hours:
// //     selectedDate.dateTime.getHours() > 12
// //       ? selectedDate.dateTime.getHours() - 12
// //       : selectedDate.dateTime.getHours(),
// //   minutes: 0,
// //   amOrPm: selectedDate.dateTime.getHours() >= 12 ? 'pm' : 'am'
// // });
const oneHourAhead = new Date(
  new Date(selectedDate.dateTime).setTime(selectedDate.dateTime.getTime() + 60 * 60 * 1000)
);
// Fill this object with a timestamp one hour ahead of selected time (truncated to nearest hour)
const endTime = ref({
  hours: oneHourAhead.getHours() > 12 ? oneHourAhead.getHours() - 12 : oneHourAhead.getHours(),
  minutes: 0,
  amOrPm: oneHourAhead.getHours() >= 12 ? 'pm' : 'am'
});

const startDate = ref(
  selectedDate.dateTime.getFullYear() +
    `-` +
    selectedDate.dateTime.getMonth() +
    1 +
    `-` +
    selectedDate.dateTime.getDate()
);
const endDate = ref(
  selectedDate.dateTime.getFullYear() +
    `-` +
    selectedDate.dateTime.getMonth() +
    1 +
    `-` +
    selectedDate.dateTime.getDate()
);

function submissionHandler() {
  addEventForm.isFormActive = false;
  addEventForm.isPrefilled = false;
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
      <p class="dateLabel">Start Date</p>
      <input
        id="startDate"
        class="datePicker"
        type="date"
        v-bind:value="addEventForm.startDateTime"
      />
      <TimePicker
        :timestamp="addEventForm.startDateTime"
      />
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
      <input class="descriptionInput" placeholder="Add Event Description" />
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