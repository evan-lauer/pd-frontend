<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';
// TODO: Needs to faciliate adding ListItems that are displayed
//TODO: Need type-able space to add new ListItems --> These need
// to be saved into a store
</script>

<template>
  <div>
    <!-- v-for to display all list items that have been
    added to an array of lists -->
    <p>Selected id: {{ selectedTab.id }}</p>
    <div
      v-for="item in listsData.tabDict[selectedTab.id].items"
      :key="item.id"
    >
      {{ item.label }}
    </div>
    <input
      v-model="itemName"
      ref="itemNameInput"
    />
    <button
      @click="
        () => {
          listsData.addItem(selectedTab.id, itemName);
          itemName = '';
        }
      "
    >
      +
    </button>
  </div>
</template>

<style scoped></style>
