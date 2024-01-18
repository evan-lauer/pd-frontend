<script setup>
import { ref } from 'vue';
const tabs = ref([
  { id: 1, title: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, title: 'Tab 2', content: 'Content for Tab 2' }
]);
// return {tabs};
</script>

<template>
  <div
    class="tabs"
    v-for="tab in tabs"
    :key="tab.id"
  >
    <!-- Your tab content goes here -->
    {{ tab.title }}
  </div>
</template>

<style>
.tabs {
  border: black 1px solid;
  border-radius: 10%;
  padding: 4px;
}
</style>
