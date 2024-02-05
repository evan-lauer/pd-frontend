<script setup>
import { listsData } from 'src/stores/listStores';
import { selectedTab } from 'src/stores/listStores';

// TODO: implement some if-statement so if there are 10 tabs, we prevent this function to be executed
// TODO: make the unselected tabs a bit shorter
// TODO: make the tab name editable only when double clicked

const handleEnterTab = (tabName) => {
  //Have to disable this once we reach 10 tabs
  listsData.addTab(tabName);
  tabName = '';
}

const changeSelectedTab = (tabId) => {
  selectedTab.id = tabId;
}

const makeEditable = (tabId) => {
  const tabName = document.getElementById(`tabName-${tabId}`)
  if (tabName) {
    tabName.readOnly = false;
    tabName.style.borderColor = "blue";
    tabName.style.cursor = "text";
  }
}

const makeReadOnly = (tabId) => {
  const tabName = document.getElementById(`tabName-${tabId}`)
  if (tabName) {
    tabName.readOnly = true;
    tabName.style.borderColor = "transparent";
    tabName.style.cursor = "pointer";
  }
}
</script>

<template>
  <div
    :class="selectedTab.id === tabId ? `tabContainer selected` : `tabContainer`"
    v-for="tabId in listsData.tabIds" :key="tabId">
    <input
    :id="'tabName-'+tabId"
    :class="selectedTab.id === tabId ? `tabName selected` : `tabName`"
    v-model="listsData.tabDict[tabId].label"
    @keyup.enter="handleEnterTab(tabName)"
    @click="changeSelectedTab(tabId)"
    @dblclick="makeEditable(tabId)"
    @focusout="makeReadOnly(tabId)"
    readonly>
    <button :class="selectedTab.id === tabId ? `deleteButton focus` : `deleteButton`"
    @click="listsData.deleteTab(selectedTab.id)">×</button>
  </div>

  <div v-if="listsData.tabIds.length < 10">
    <button
      class="tabAddButton"
      @click="
        () => {
          listsData.addTab(tabName);
          tabName = '';
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
  border: 1px solid black;
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
  padding: 2px 10px;
  text-align: center;
  overflow: auto;
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
  background-color: white;
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

<!-- <script setup>
    import AddButton from 'src/components/list/AddButton.vue'
    import CreateEventButton from 'src/components/calendar/CreateEventButton.vue'
    import { ref } from 'vue'

    const currentTab = ref('Home')
    const tabs = {
        "AddButton":
        "CreateEventButton",
    }
</script>

<template>
    <div class="tabBar">
         <div class="tabButton">
            <p>tab1</p>
        </div>
        <div class="tabButton">
            <p>tab2</p>
        </div>
        <div class="tabButton">
            <p>tab3</p>
        </div> -->

<!-- <button
            v-for="(_, tab) in tabs"
            :key="tab"
            :class="['tab-button', { active: currentTab === tab}]"
            @click="currentTab = tab"
        >
            {{ tab }}
        </button>
        <div class="addButton">
            <AddButton />
        </div>
    </div>
</template> -->
