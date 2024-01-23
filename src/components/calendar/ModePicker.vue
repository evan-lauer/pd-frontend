<script setup>
import { viewMode } from 'src/stores/calendarStores';
import SimpleButton from '../icons/SimpleButton.vue';
</script>

<template>
  <div class="modePicker">
    <SimpleButton
      inner-text="Day"
      :selected="viewMode.mode === 'day'"
      @click="viewMode.mode = 'day'"
    />
    <SimpleButton
      inner-text="Week"
      :selected="viewMode.mode === 'week'"
      @click="viewMode.mode = 'week'"
    />
    <SimpleButton
      inner-text="Month"
      :selected="viewMode.mode === 'month'"
      @click="viewMode.mode = 'month'"
    />
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
  align-items: center;
}
</style>
