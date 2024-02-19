<script setup>
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from 'src/components/icons/LeftChevron.vue';
import RightChevron from 'src/components/icons/RightChevron.vue';
import SimpleButton from 'src/components/icons/SimpleButton.vue';
</script>

<template>
  <div class="monthDropdown">
    <LeftChevron @click="() => selectedDate.decrementDay()" />
    <h1 class="monthHeader">
      {{ selectedDate.dateTime.toLocaleString('default', { month: 'long' }) }}
      {{ selectedDate.dateTime.getDate() }}
    </h1>
    <RightChevron @click="() => selectedDate.incrementDay()" />
    <br />
    <h1 class="yearHeader">{{ selectedDate.dateTime.getFullYear() }}</h1>
    <div class="buttons">
      <SimpleButton
        inner-text="Today"
        @click="() => selectedDate.setToToday()"
      />
    </div>
  </div>
</template>

<style scoped>
.monthHeader {
  font-size: 36px;
  font-weight: 700;
  margin: 0;

  width: 400px;
  text-align: center;
}

.yearHeader {
  font-size: 24px;
  font-weight: normal;
  justify-content: center;
  padding-left: 20px;
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
  justify-content: left;
  align-items: center;
  padding-left: 20px;
}
</style>
