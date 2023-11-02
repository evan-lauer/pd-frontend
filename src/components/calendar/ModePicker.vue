<script setup>
import { dateSelectionForm } from 'src/stores/formStores';
</script>

<template>
  <div class="modePicker">
    <div
      class="modeOption"
      :class="{ selected: dateSelectionForm.viewMode === 'day' }"
      @click="dateSelectionForm.viewMode = 'day'"
    >
      Day
    </div>
    <div
      class="modeOption"
      :class="{ selected: dateSelectionForm.viewMode === 'week' }"
      @click="dateSelectionForm.viewMode = 'week'"
    >
      Week
    </div>
    <div
      class="modeOption"
      :class="{ selected: dateSelectionForm.viewMode === 'month' }"
      @click="dateSelectionForm.viewMode = 'month'"
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
