<script setup>
import { listsData, selectedTab } from 'src/stores/listStores';
import debounce from 'src/util/debounce';

// TODO: implement some if-statement so if there are 10 tabs, we prevent this function to be executed
// TODO: make the unselected tabs a bit shorter

const handleEnterTab = (tabId) => {
  // This function defocuses the tab name input field
  const tabInput = document.getElementById(`tabName-${tabId}`);
  tabInput.blur();
};

const changeSelectedTab = (tabId) => {
  // break this for the moment
  selectedTab.id = tabId;
};

const makeEditable = (tabId) => {
  const tabName = document.getElementById(`tabName-${tabId}`);
  if (tabName) {
    tabName.readOnly = false;
    tabName.style.borderColor = 'green';
    tabName.style.cursor = 'text';
  }
};

const makeReadOnly = (tabId) => {
  const tabName = document.getElementById(`tabName-${tabId}`);
  if (tabName) {
    tabName.readOnly = true;
    tabName.style.borderColor = 'transparent';
    tabName.style.cursor = 'pointer';
  }
};

const debouncedUpdateTitle = debounce(listsData.updateListTitle, 1000);
</script>

<template>
  <div
    :class="selectedTab.id === tabId ? `tabContainer selected` : `tabContainer`"
    v-for="tabId in listsData.tabIdArray"
    :key="tabId"
  >
    <input
      :id="'tabName-' + tabId"
      :class="selectedTab.id === tabId ? `tabName selected` : `tabName`"
      :value="listsData.tabs[tabId].listTitle"
      @input="
        (event) => {
          debouncedUpdateTitle(tabId, event.target.value);
        }
      "
      @keyup.enter="handleEnterTab(tabId)"
      @click="changeSelectedTab(tabId)"
      @dblclick="makeEditable(tabId)"
      @focusout="makeReadOnly(tabId)"
      readonly
    />
    <button
      :class="selectedTab.id === tabId ? `deleteButton focus` : `deleteButton`"
      @click="
        () => {
          const tabToDelete = selectedTab.id;
          if (listsData.tabIdArray.length > 1) {
            const selectedTabIndex = listsData.tabIdArray.findIndex((id) => id === tabToDelete);
            if (selectedTabIndex === listsData.tabIdArray.length - 1) {
              // If last tab, switch to previous tab
              selectedTab.id = listsData.tabIdArray[selectedTabIndex - 1];
            } else {
              // Otherwise, switch to next tab
              selectedTab.id = listsData.tabIdArray[selectedTabIndex + 1];
            }
            console.log(selectedTabIndex);
            console.log('new selected tab: ', selectedTab.id);
          } else {
            selectedTab.id = undefined;
          }
          listsData.deleteList(tabToDelete);
        }
      "
    >
      ×
    </button>
  </div>

  <div v-if="listsData.tabIdArray.length < 10">
    <button
      class="tabAddButton"
      @click="
        () => {
          listsData.createList('');
        }
      "
    >
      +
    </button>
  </div>
</template>

<style scoped>
/* tabContainer doesn't change height... why? Wanna make it shorter  */
.tabContainer {
  display: flex;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid #dd825f;
  border-bottom: transparent;
  height: auto;
  width: 15%;
  padding: 2px;
  margin-bottom: 5px;
  align-items: center;
}
.tabContainer.selected {
  border-bottom: transparent;
  height: 100%;
  width: auto;
}

.tabName {
  display: flex;
  width: 70px;
  height: 20px;
  border: 1px solid transparent;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  padding: 2px 10px;
  overflow: auto;
  font-size: large;
}
.tabName.selected {
  font-weight: bold;
  height: 85%;
  outline: none;
}
.tabName:hover {
  cursor: pointer;
}

.deleteButton {
  display: none;
}

.deleteButton.focus {
  display: flex;
  align-items: right;
  border-radius: 20px;
  border: 1px solid transparent;
  font-size: small;
  margin: 4px;
}

.deleteButton.focus:hover {
  border-radius: 20px;
  background-color: rgb(221, 221, 221);
  cursor: pointer;
}

.tabAddButton {
  display: flex;
  vertical-align: right;
  border-radius: 20px;
  background-color: transparent;
  border: 0px;
  font-size: large;
  margin: 6px;
}
.tabAddButton:hover {
  cursor: pointer;
  background-color: rgb(221, 221, 221);
}
</style>
