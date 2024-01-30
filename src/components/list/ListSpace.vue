<!-- TODO: make the whole list scrollable
TODO: make the items deletable. Use deleteItem from listStores.
      if textarea empty and delete key is pressed, call the function?
TODO: automatically switch the text cursor to the newly created item
TODO: change the font of textarea and make height hug its content -->

<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';

const handleEnterList = () => { //this is probably wrong, check later
  const itemName = ''
  listsData.addItem(selectedTab.id, itemName);

  // how do I get to the latest item added?
  // setTimeout(() => {
  //   listsData.tabDict[newId].items.focus();
  // });
}
</script>

<template>
  <div class="individualItem" v-for="item in listsData.tabDict[selectedTab.id].items" :key="item.id">
    <input class="checkbox" type="checkbox" v-model="item.checked">
    <textarea class="itemName" v-model="item.label"
    @keyup.enter="handleEnterList" @keydown.enter.prevent 
    @input="resizeTextarea()"
    :style="{ 'text-decoration': item.checked ? 'line-through' : 'none' }"></textarea>
  </div>

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
</template>

<style scoped>

.addButton {
  vertical-align: center;
  width: 50%;
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

/* change font of itemName */
.itemName { 
  display: flex;
  height: 20%;
  width: 85%;
  font-size: 14px;
  font: Inter-Regular;

  resize: both;
  border: 1px solid green;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  outline: none;
}
.itemName:focus {
  background: rgb(2, 170, 47);
}
</style>