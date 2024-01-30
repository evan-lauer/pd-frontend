<script setup>
import { selectedTab, listsData } from 'src/stores/listStores';
import { ref } from 'vue';
// TODO: make it scrollable
// TODO: make the items deletable. Use deleteItem from listStores.
      // if textarea empty and delete key is pressed, call the function?
// TODO: automatically switch the cursor to the newly created item

const handleEnterList = () => { //this is probably wrong, check later
  const itemName = ''
  listsData.addItem(selectedTab.id, itemName);
}

const autoResize = () => { // supposedly modifies textarea to hug its content height-wise
  const textarea = textareaRef.value;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

const textareaRef = ref(null);
</script>

<template>
  <div>
    <!-- v-for to display all list items that have been
    added to an array of lists -->
    <p>Selected id: {{ selectedTab.id }}</p>
    <textarea
      class="item"
      v-for="item in listsData.tabDict[selectedTab.id].items"
      @input="autoResize()"
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

.item {
  display: flex;
  height: 20%;
  width: 90%;
  font-size: 14px;

  resize: none;
  border: 1px solid green;
  border-radius: 5px;
  margin: 8px;
  outline: none;
}
</style>