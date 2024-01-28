<script setup>
import TimePicker from 'src/components/widgets/TimePicker.vue';
import { selectedDate } from 'src/stores/calendarStores';
import { ref } from 'vue';

// Fill this object with the original timestamp of the current selected time (truncated to nearest hour)
const startTime = ref({
  hours:
    selectedDate.dateTime.getHours() > 12
      ? selectedDate.dateTime.getHours() - 12
      : selectedDate.dateTime.getHours(),
  minutes: 0,
  amOrPm: selectedDate.dateTime.getHours() >= 12 ? 'pm' : 'am'
});
const oneHourAhead = new Date(
  new Date(selectedDate.dateTime).setTime(selectedDate.dateTime.getTime() + 60 * 60 * 1000)
);
// Fill this object with a timestamp one hour ahead of selected time (truncated to nearest hour)
const endTime = ref({
  hours: oneHourAhead.getHours() > 12 ? oneHourAhead.getHours() - 12 : oneHourAhead.getHours(),
  minutes: 0,
  amOrPm: oneHourAhead.getHours() >= 12 ? 'pm' : 'am'
});
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
        />
      </div>
      <div class="inputRow time">
        Start Time
        <TimePicker :timestamp="startTime" />
      </div>
      <div class="inputRow date">
        End Date
        <input
          class="datePicker end"
          type="date"
        />
      </div>
      <div class="inputRow time">
        End Time
        <TimePicker :timestamp="endTime" />
      </div>
    </div>
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