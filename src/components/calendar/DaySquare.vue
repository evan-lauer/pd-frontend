<script setup>
defineProps({
  day: Number
});
</script>

<template>
  <div class="dayContainer">
    <div class="numberCorner">{{ day }}</div>
    <div class="contentBox"></div>
  </div>
</template>

<style scoped>
.dayContainer {
  height: 85px;
  width: 100px;
  border: 1px solid grey;
}
.numberCorner {
  width: fit-content;
  height: 20px;
  padding-left: 3px;
}

.contentBox {
  height: 65px; /* height of day container - height of number corner */
}
</style>
