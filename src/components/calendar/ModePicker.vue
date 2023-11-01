<script setup>
defineProps({
  mode: String,
  setMode: Function
});
</script>

<template>
  <div>
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
