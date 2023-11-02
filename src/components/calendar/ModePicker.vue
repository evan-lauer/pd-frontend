<script setup>
import { formStore } from 'src/stores/formStore';
</script>

<template>
  <div class="modePicker">
    <div
      class="modeOption"
      :class="{ selected: formStore.viewMode === 'day' }"
      @click="formStore.setMode('day')"
    >
      Day
    </div>
    <div
      class="modeOption"
      :class="{ selected: formStore.viewMode === 'week' }"
      @click="formStore.setMode('week')"
    >
      Week
    </div>
    <div
      class="modeOption"
      :class="{ selected: formStore.viewMode === 'month' }"
      @click="formStore.setMode('month')"
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
