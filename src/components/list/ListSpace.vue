<script setup>
// TODO: Needs to faciliate adding ListItems that are displayed
//TODO: Need type-able space to add new ListItems --> These need
// to be saved into a store

import { selectedTab, listsData } from 'src/stores/listStores';
</script>

<template>
  <div>
    <!-- v-for to display all list items that have been
    added to an array of lists -->
    <p>Selected id: {{ selectedTab.id }}</p>
    <!-- <div
      v-for="item in listsData.tabDict[selectedTab.id].items"
      :key="item.id"
    >
      {{ item.label }}
    </div> -->
    <!-- <input
      v-model="itemName"
      ref="itemNameInput"
    /> -->
      <textarea class="listArea" name="listArea" 
      v-model="listsData.tabDict[selectedTab.id].items.label" 
      placeholder="Placeholder"></textarea>
      <div v-html="bulletPoints"></div>
    <!-- <button
      @click="
        () => {
          listsData.addItem(selectedTab.id, itemName);
          itemName = '';
        }
      "
    >
      +
    </button> -->
  </div>
</template>

<style scoped>
.listArea {
  display: flex;
  height: 100%;
  width: 90%;
  resize: none;
  font-size: 14px;
}
</style>