<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';

const handleEnterList = () => {
  const itemName = ''
  listsData.addItem(selectedTab.id, itemName);
}

</script>

<template>
  <div>
    <!-- v-for to display all list items that have been
    added to an array of lists -->
    <p>Selected id: {{ selectedTab.id }}</p>
    <textarea
      v-for="item in listsData.tabDict[selectedTab.id].items"
      @keyup.enter="handleEnterList"
      @keydown.enter.prevent
      :key="item.id"
      placeholder="Add item!"
    >
      {{ item.label }}
    </textarea>
    <!-- <input
      v-model="itemName"
      ref="itemNameInput"
    /> -->
    <button
      class="addButton"
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

<style scoped>

.addButton {
  width: 100%;
}

textarea {
  display: flex;
  height: 100%;
  width: 90%;
  resize: none;
  font-size: 14px;
}
</style>