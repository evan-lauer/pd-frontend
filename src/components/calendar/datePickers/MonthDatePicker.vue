<script setup>
import { dateSelectionForm } from 'src/stores/formStores';
</script>

<template>
  <div class="monthDropdown">
    <div>&lt;</div>
    <div>January</div>
    <div>></div>
  </div>
</template>

<style scoped>
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
