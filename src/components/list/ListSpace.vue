<!--
TODO: automatically switch the text cursor to the newly created item
TODO: @enter, create a new textarea RIGHT BELOW the currently focused textarea. might use indexOf function to do this-->

<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';

const handleEnterList = (itemId) => {
  const itemName = '';
  const findItem = listsData.tabDict[selectedTab.id].items.find(item => item.id === itemId);
  const indexOfPrevItem = listsData.tabDict[selectedTab.id].items.indexOf(findItem);
  const newId = listsData.addItem(selectedTab.id, itemName, indexOfPrevItem);

  setTimeout(() => {
    const newTextarea = document.getElementById(`textArea-${newId}`);
    if (newTextarea) {
      newTextarea.focus();
    }
  });
};

const handleItemDelete = (itemId, event) => {
  const findItem = listsData.tabDict[selectedTab.id].items.find(item => item.id === itemId);
  if (findItem.label === '' && event.key === "Backspace" && listsData.tabDict[selectedTab.id].items.length != 1){
    const indexOfPrev = listsData.tabDict[selectedTab.id].items.indexOf(findItem) - 1;
    const idOfPrev = listsData.tabDict[selectedTab.id].items[indexOfPrev].id;
    listsData.deleteItem(selectedTab.id, itemId);
    const previousTextarea = document.getElementById(`textArea-${idOfPrev}`);
    previousTextarea.focus();
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
      @keyup.enter="handleEnterList(item.id)"
      @keydown.enter.prevent
      @keydown="handleItemDelete(item.id, $event)"
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
