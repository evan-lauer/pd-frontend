<script setup>
import { ref } from 'vue';
defineProps({
  timestamp: {
    hour: Number,
    minute: Number,
    amOrPm: String
    // change to accept Date object instead
  }
});

const selectedField = ref('none');
// When the input changes we will emit a "time-change" event with arguments hours, minutes, amOrPm
</script>

<template>
  <div class="timePickerContainer">
    <div
      :class="selectedField === 'hours' ? `selected hours field` : `hours field`"
      @click="selectedField = 'hours'"
    >
      <p class="typography">
        {{ timestamp.hours < 10 ? `0` + timestamp.hours : timestamp.hours }}
      </p>
    </div>
    <div
      :class="selectedField === 'minutes' ? `selected minutes field` : `minutes field`"
      @click="selectedField = 'minutes'"
    >
      <p class="typography">
        {{ timestamp.minutes < 10 ? `0` + timestamp.minutes : timestamp.minutes }}
      </p>
    </div>
    <div
      :class="selectedField === 'amOrPm' ? `selected amOrPm field` : `amOrPm field`"
      @click="selectedField = 'amOrPm'"
    >
      <p class="typography">
        {{ timestamp.amOrPm }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.timePickerContainer {
  height: 20px;
  width: 80px;
  display: flex;
  gap: 5px;
}

.field {
  height: 100%;
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
}

.field:hover {
  cursor: default;
}

.typography {
  margin: 0;
}

.selected .typography {
}
</style>
