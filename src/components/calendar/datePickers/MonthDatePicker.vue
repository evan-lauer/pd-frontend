<script setup>
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from '../../icons/LeftChevron.vue';
import RightChevron from '../../icons/RightChevron.vue';
</script>

<template>
  <div class="monthDropdown">
    <LeftChevron @click="() => selectedDate.decrementMonth()" />
    <h1 class="monthHeader">
      {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }}
    </h1>
    <RightChevron @click="() => selectedDate.incrementMonth()" />
  </div>
</template>

<style scoped>
.monthHeader {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

.monthDropdown {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.monthDropdown > div {
  background-color: gray;
}
</style>
