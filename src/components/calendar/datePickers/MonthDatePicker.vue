<script setup>
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from 'src/components/icons/LeftChevron.vue';
import RightChevron from 'src/components/icons/RightChevron.vue';
</script>

<template>
  <div class="monthDropdown">
    <LeftChevron @click="() => selectedDate.decrementMonth()" />
    <h1 class="monthHeader">
      {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }}
    </h1>
    <RightChevron @click="() => selectedDate.incrementMonth()" />
    <h1 class="yearHeader">{{ selectedDate.dateTime.getFullYear() }}</h1>
  </div>
</template>

<style scoped>
.monthHeader {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  width: 200px;
  text-align: center;
}

.yearHeader {
  font-size: 24px;
  font-weight: normal;
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
