<script setup>
import { newEventForm, dateSelectionForm } from 'src/stores/formStores';

import CreateXButton from 'src/components/calendar/CreateXButton.vue';
</script>

<template>
  <div
    class="createEventOverlay"
    v-if="dateSelectionForm.active === true"
  >
    <div>
      <CreateXButton @click="() => (dateSelectionForm.active = false)" />
    </div>
    <input
      type="text"
      :value="newEventForm.title"
      @change="(e) => (newEventForm.title = e.target.value)"
    />
    <input
      type="text"
      :value="newEventForm.description"
      placeholder="Description"
      @change="(e) => (newEventForm.description = e.target.value)"
    />
    <div>
      Start Date:
      <input
        type="date"
        @change="
          (e) => {
            newEventForm.startDate.year = parseInt(e.target.value.slice(0, 4));
            newEventForm.startDate.month = parseInt(e.target.value.slice(5, 7));
            newEventForm.startDate.day = parseInt(e.target.value.slice(8));
          }
        "
      />
    </div>
    <div>
      End Date:
      <input
        type="date"
        @change="
          (e) => {
            newEventForm.endDate.year = parseInt(e.target.value.slice(0, 4));
            newEventForm.endDate.month = parseInt(e.target.value.slice(5, 7));
            newEventForm.endDate.day = parseInt(e.target.value.slice(8));
          }
        "
      />
    </div>
    <button
      @click="
        () => {
          newEventForm.putEvent();
          newEventForm.reset();
        }
      "
    >
      Submit
    </button>
  </div>
</template>

<style scoped>
.createEventOverlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  top: 100px;
  height: 600px;
  width: 300px;
  background-color: white;
  box-shadow: -2px 10px 18px 0px rgba(0, 0, 0, 0.29);
}
</style>
