<script setup>
import { listsData } from 'src/stores/listStores';
import { ref } from 'vue';
import debounce from 'src/util/debounce';
import XButton from 'src/components/icons/XButton.vue';

const emit = defineEmits(['createItem', 'deleteItem']);
const props = defineProps({
  listId: String,
  item: {
    itemId: String,
    itemContent: String,
    timestamp: Number,
    checked: Boolean
  }
});

const checked = ref(props.item.checked);

// We need to make a debounced save function for each individual
const debouncedSaveItem = debounce(listsData.updateListItemContent, 500);

const debouncedCheckItem = debounce(listsData.checkListItem, 300);

const handleSpecialKeys = (event) => {
  if (event.key === 'Backspace') {
    if (event.target.value === '') {
      console.log("let's delete this ");
    }
  } else if (event.key === 'Enter') {
    emit('createItem');
  }
};
</script>

<template>
  <div class="individualItem">
    <div class="checkboxContainer">
      <input
        type="checkbox"
        class="checkbox"
        :checked="checked"
        @change="
          () => {
            checked = !checked;
            debouncedCheckItem(listId, item.itemId, checked);
          }
        "
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
    <XButton @click="$emit('deleteItem', listId, item.itemId)" />
  </div>
</template>

<style scoped>
.xButton {
  opacity: 0;
  outline: 1px solid white;
  border-radius: 4px;
  transition:
    opacity linear 0.15s,
    outline linear 0.15s;
}

.itemName:focus + .xButton {
  opacity: 100%;
}

.individualItem:hover > .xButton {
  opacity: 100%;
}

.xButton:hover {
  outline: 1px solid grey;
  cursor: pointer;
}

.individualItem {
  display: flex;
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
  resize: none;
}
.itemName:focus {
  border: 1px solid black;
}
</style>
