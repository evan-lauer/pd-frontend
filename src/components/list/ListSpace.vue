<script setup>
import { selectedTab, listsData, listsData_ } from 'src/stores/listStores';

const handleEnterList = (itemId) => {
  const itemName = '';
  const findItem = listsData.tabDict[selectedTab.id].items.find((item) => item.id === itemId);
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
  const findItem = listsData.tabDict[selectedTab.id].items.find((item) => item.id === itemId);
  if (
    findItem.label === '' &&
    event.key === 'Backspace' &&
    listsData.tabDict[selectedTab.id].items.length != 1
  ) {
    const indexOfPrev = listsData.tabDict[selectedTab.id].items.indexOf(findItem) - 1;
    const idOfPrev = listsData.tabDict[selectedTab.id].items[indexOfPrev].id;
    listsData.deleteItem(selectedTab.id, itemId);
    const previousTextarea = document.getElementById(`textArea-${idOfPrev}`);
    previousTextarea.focus();
    event.preventDefault();
  }
};
</script>

<template>
  <div
    class="individualItem"
    v-for="item in listsData.tabDict[selectedTab.id].items"
    :key="item.id"
  >
    <div class="checkboxContainer">
      <input
        type="checkbox"
        class="checkbox"
        v-model="item.checked"
      />
    </div>
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
  align-items: center;
}
.checkboxContainer {
  display: flex;
  width: auto;
  height: auto;
}
/* .checkbox {
  appearance: none;
  margin: 0;
  font: inherit;
  width: 15px;
  height: 15px;
  border: 2px solid #DD825F;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
}

input[type="checkbox"] {
  display: grid;
  place-content: center;
}
input[type="checkbox"]::before {
  content: "";
  width: 15px;
  height: 15px;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

}
input[type="checkbox"]:checked::after {
  transform: scale(1);
} */

/* change font of itemName */
.itemName {
  display: flex;
  height: 20%;
  width: 85%;
  font-size: medium;
  border: 1px solid transparent;

  resize: vertical;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  outline: none;
  font-family: Arial;
}
.itemName:focus {
  border: 1px solid black;
}
</style>
