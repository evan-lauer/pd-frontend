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
  <span
    class="material-symbols-outlined add"
    @click="handleCreate('')"
  >
    add_box
  </span>
  <!-- <button
    class="itemAddButton"
    @click="handleCreate('')"
  >
    +
  </button> -->
</template>

<style scoped>
/* .itemAddButton {
  justify-content: center;
  width: 15%;
  border-radius: 20px;
  border-style: solid;
  margin: 5px;
}
.itemAddButton:hover {
  cursor: pointer;
} */
.material-symbols-outlined.add {
  color: #344f49;
  transition: transform 0.3s ease;
}

.material-symbols-outlined.add:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}
</style>
