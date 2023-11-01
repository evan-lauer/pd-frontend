<script setup>
defineProps({
  mode: String,
  setMode: Function
});
</script>

<template>
  <div class="modePicker">
    <div
      :class="{ modeOption: true, selected: mode === 'day' }"
      @click="setMode('day')"
    >
      Day
    </div>
    <div
      :class="{ modeOption: true, selected: mode === 'week' }"
      @click="setMode('week')"
    >
      Week
    </div>
    <div
      :class="{ modeOption: true, selected: mode === 'month' }"
      @click="setMode('month')"
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
