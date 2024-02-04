<script setup>
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from '../../icons/LeftChevron.vue';
import RightChevron from '../../icons/RightChevron.vue';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
</script>

<template>
  <div class="monthDropdown">
    <LeftChevron @click="() => selectedDate.decrementDay()" />
    <h1 class="monthHeader">
      {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }} {{ selectedDate.dateTime.getDate() }}
    </h1>
    <RightChevron @click="() => selectedDate.incrementDay()" />
    <h1 class="yearHeader"> {{ selectedDate.dateTime.getFullYear() }}</h1>
  </div>
  <!-- TODO: these buttons are not functional right now
    and not in line with the month and year headers -->
  <div class="buttons">

      <SimpleButton 
        inner-text="Today"
        @click="() => selectedDate.setToToday()"
      />

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
