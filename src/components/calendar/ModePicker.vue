<script setup>
import { viewMode } from 'src/stores/calendarStores';
import SimpleButton from '../icons/SimpleButton.vue';
</script>

<template>
  <div class="modePicker">
    <SimpleButton inner-text="Day" />
    <div
      class="modeOption"
      :class="{ selected: viewMode.mode === 'day' }"
      @click="viewMode.mode = 'day'"
    >
      Day
    </div>
    <div
      class="modeOption"
      :class="{ selected: viewMode.mode === 'week' }"
      @click="viewMode.mode = 'week'"
    >
      Week
    </div>
    <div
      class="modeOption"
      :class="{ selected: viewMode.mode === 'month' }"
      @click="viewMode.mode = 'month'"
    >
      Month
    </div>
  </div>
</template>

<style scoped>
.modePicker {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.modeOption {
  cursor: default;
  padding: 10px;
}
.modeOption:hover {
  cursor: pointer;
}
.selected {
  background-color: grey;
}
</style>
