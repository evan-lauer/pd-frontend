<!-- TODO: make the whole list scrollable
TODO: make the items deletable. Use deleteItem from listStores.
      if textarea empty and delete key is pressed, call the function?
TODO: automatically switch the text cursor to the newly created item
TODO: @enter, create a new textarea RIGHT BELOW the currently focused textarea-->

<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';

const handleEnterList = () => {
  //Have to disable this once we reach 10 tabs
  const itemName = '';
  listsData.addItem(selectedTab.id, itemName);

  // how do I get to the latest item added?
  // setTimeout(() => {
  //   listsData.tabDict[newId].items.focus();
  // });
};

const handleItemDelete = (itemId) => {
  // needs the id of the item
  const findItem = listsData.tabDict[selectedTab.id].items.find(item => item.id === itemId)

  if (findItem.label === ''){
    listsData.deleteItem(selectedTab.id, itemId)
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
      class="itemName"
      v-model="item.label"
      @keyup.enter="handleEnterList"
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
}
.itemAddButton:hover {
  cursor: pointer;
}

.individualItem {
  display: flex;
  flex-wrap: wrap;
  vertical-align: center;
}

.checkbox {
  display: flex;
  width: auto;
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

  resize: vertical;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  outline: none;
}
.itemName:focus {
  background: yellow;
}
</style>
