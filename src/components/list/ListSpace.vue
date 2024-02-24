<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';
import ListItem from 'src/components/list/ListItem.vue';

const handleCreate = (itemContent) => {
  listsData.createListItem(selectedTab.id, listsData.tabs[selectedTab.id].listTitle, itemContent);
};
</script>

<template>
  <ListItem
    v-for="item in listsData.tabs[selectedTab.id].items"
    :key="item.itemId"
    :listId="selectedTab.id"
    :item="item"
    @delete-item="
      (listId, itemId) => {
        listsData.deleteListItem(listId, itemId);
      }
    "
    @create-item="handleCreate('')"
  />
  <button
    class="itemAddButton"
    @click="handleCreate('')"
  >
    +
  </button>
</template>

<style scoped>
.itemAddButton {
  justify-content: center;
  width: 15%;
  border-radius: 20px;
  border-style: solid;
  margin: 5px;
}
.itemAddButton:hover {
  cursor: pointer;
}
</style>
