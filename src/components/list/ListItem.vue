<script setup>
import { listsData_ } from 'src/stores/listStores';
import debounce from 'src/util/debounce';

defineProps({
  listId: String,
  item: {
    itemId: String,
    itemContent: String,
    timestamp: Number
  }
});

// We need to make a debounced save function for each individual
const debouncedSaveItem = debounce(listsData_.updateListItemContent, 500);

const handleSpecialKeys = (event) => {
  if (event.key === 'Backspace') {
    if (event.target.value === '') {
      console.log("let's delete this ");
    }
  } else if (event.key === 'Enter') {
    console.log("let's create a new one");
  }
};
</script>

<template>
  <div class="individualItem">
    <div class="checkboxContainer">
      <input
        type="checkbox"
        class="checkbox"
      />
      <!-- TODO: Handle the checkbox with the stores -->
    </div>
    <textarea
      :id="'textArea-' + item.itemId"
      class="itemName"
      :value="item.itemContent"
      @input="debouncedSaveItem(listId, item.itemId, $event.target.value)"
      @keydown="handleSpecialKeys($event)"
      @keydown.enter.prevent
    ></textarea>
  </div>
</template>

<style scoped>
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
