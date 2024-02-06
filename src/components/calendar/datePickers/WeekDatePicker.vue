<script setup>
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from '../../icons/LeftChevron.vue';
import RightChevron from '../../icons/RightChevron.vue';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
</script>

<template>
  <div class="datePickerFormat">
  <div class="monthDropdown">
    <h1 class="monthHeader">
      {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }}
    </h1>
    <h1 class="yearHeader">{{ selectedDate.dateTime.getFullYear() }}</h1>
  </div>
  <div class="buttons">
      <LeftChevron @click="() => selectedDate.decrementWeek()" />
      <SimpleButton 
        inner-text="Today"
        @click="() => selectedDate.setToToday()"
      />
      <RightChevron @click="() => selectedDate.incrementWeek()" />
    </div>
  </div>
</template>

<style scoped>
.datePickerFormat {
  display: flex;
  gap: 15px;
}

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

.buttons {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.monthDropdown > div {
  background-color: gray;
}
</style>
