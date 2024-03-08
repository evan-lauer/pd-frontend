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
    tabName.style.borderBottomColor = '#dd825f';
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
    <span
      :class="
        selectedTab.id === tabId
          ? `material-symbols-outlined delete focus`
          : `material-symbols-outlined close`
      "
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
          } else {
            selectedTab.id = undefined;
          }
          listsData.deleteList(tabToDelete);
        }
      "
    >
      close
    </span>
    <!-- <button
      :class="
        selectedTab.id === tabId
          ? `material-symbols-outlined close focus`
          : `material-symbols-outlined close`
      "
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
          } else {
            selectedTab.id = undefined;
          }
          listsData.deleteList(tabToDelete);
        }
      "
    >
      ×
    </button> -->
  </div>

  <div v-if="listsData.tabIdArray.length < 10">
    <span
      class="material-symbols-outlined add"
      @click="
        () => {
          listsData.createList('');
        }
      "
    >
      add
    </span>
  </div>
</template>

<style scoped>
/* tabContainer doesn't change height... why? Wanna make it shorter  */
.tabContainer {
  display: flex;
  border-radius: 15px 15px 0px 0px;
  border-bottom: transparent;
  border-top: 2px solid lightgray;
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  height: auto;
  width: 20%;
  padding: 2px;
  margin-bottom: 5px;
  align-items: center;
  padding-left: 2px;
}
.tabContainer.selected {
  height: 100%;
  width: 140px;
  border-bottom: transparent;
  border-top: 2px solid #dd825f;
  border-left: 2px solid #dd825f;
  border-right: 2px solid #dd825f;
}

.tabName {
  display: flex;
  height: 20px;
  border: 1px solid transparent;
  border-radius: 15px 15px 0 0;
  align-items: center;
  text-align: center;
  padding: 2px 10px;
  overflow: auto;
  font-size: medium;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tabName.selected {
  font-weight: bold;
  font-size: medium;
  height: 85%;
  width: auto;
  outline: none;
}
.tabName:hover {
  cursor: pointer;
}

.material-symbols-outlined.close {
  display: none;
}

.material-symbols-outlined.delete.focus {
  color: #344f49;
  transition: transform 0.3s ease;
  /* display: flex;
  align-items: right;
  border-radius: 20px;
  border: 1px solid transparent;
  font-size: small;
  margin: 4px; */
}

.material-symbols-outlined.delete.focus:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}

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

/* .tabAddButton {
  display: flex;
  vertical-align: right;
  border-radius: 20px;
  background-color: transparent;
  border: 0px;
  font-size: large;
  margin: 6px;
  color: #344f49;
  transition: transform 0.3s ease;
}
.tabAddButton:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
} */
</style>
