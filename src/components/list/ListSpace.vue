<!--
TODO: automatically switch the text cursor to the newly created item
TODO: @enter, create a new textarea RIGHT BELOW the currently focused textarea. might use indexOf function to do this-->

<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';

const handleEnterList = (indexOfPrevItem) => {
  const itemName = '';
  console.log("in handleEnterList");
  // have to retrieve the index of the textarea that we are currently in, rather than the index of the most recently
  // added item
  console.log(indexOfPrevItem);
  const newId = listsData.addItem(selectedTab.id, itemName, indexOfPrevItem);

  setTimeout(() => {
    const newTextarea = document.getElementById(`textArea-${newId}`);
    if (newTextarea) {
      newTextarea.focus();
    }
  });
};

const handleItemDelete = (itemId) => {
  // maybe the find used below is not finding the object so it's returning -1
  const findItem = listsData.tabDict[selectedTab.id].items.find(item => item.id === itemId);
  if (findItem.label === ''){
    listsData.deleteItem(selectedTab.id, itemId);
  }
}
</script>

<template>
  <div
    class="individualItem"
    v-for="item in listsData.tabDict[selectedTab.id].items"
    :key="item.id"
  >
    <input
      class="checkbox"
      type="checkbox"
      v-model="item.checked"
    />
    <textarea
      :id="'textArea-' + item.id"
      class="itemName"
      v-model="item.label"
      @keyup.enter="handleEnterList(listsData.tabDict[selectedTab.id].items.indexOf(listsData.tabDict[selectedTab.id].items.find(item => item.id === itemId)))"
      @keydown.enter.prevent
      @keyup.delete="handleItemDelete(item.id)"
      :style="{ 'text-decoration': item.checked ? 'line-through' : 'none' }"
    ></textarea>
  </div>

  <button
    class="itemAddButton"
    @click="
      () => {
        listsData.addItem(selectedTab.id, itemName);
        itemName = '';
      }
    "
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

.individualItem {
  display: flex;
  flex-wrap: wrap;
  vertical-align: center;
  width: 100%;
  border-bottom: 1px solid rgb(0, 162, 255);
}

.checkbox {
  display: flex;
  width: auto;
  height: auto;
}
.checkbox:hover {
  cursor: pointer;
}

/* change font of itemName */
.itemName {
  display: flex;
  height: 20%;
  width: 85%;
  font-size: 14px;
  border: 1px solid transparent;

  resize: vertical;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  outline: none;
}
.itemName:focus {
  border: 1px solid black;
}
</style>
