<script setup>
import { addEventForm } from 'src/stores/addEventFormStores';
import AddEventForm from 'src/components/widgets/AddEventForm.vue';
</script>
<template>
  <div class="leftPanel">
    <AddEventForm v-if="addEventForm.isFormActive" />
  </div>
  <div class="rightPanel"></div>
</template>
<style scoped>
.leftPanel,
.rightPanel {
  width: 50%;
  height: 100%;
}
</style>
