<script setup>
import { listsData } from 'src/stores/listStores';
import { selectedTab } from 'src/stores/listStores';

// TODO: implement some if-statement so if there are 10 tabs, we prevent this function to be executed
const handleEnterTab = (tabName) => {
  listsData.addTab(tabName);
  tabName = '';
}
</script>

<template>
  <div
    class="tabContainer"
    v-for="tabId in listsData.tabIds" :key="tabId">
    <input :class="selectedTab.id === tabId ? `tabButton selected` : `tabButton`"
    v-model="listsData.tabDict[tabId].label"
    @keyup.enter="handleEnterTab(tabName)"
    @click="
    () => {
      selectedTab.id = tabId;
    }
    ">
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

.tabContainer {
  display: flex;
  min-height: 30px;
  width: auto;
}

.tabButton {
  display: flex;
  width: 70px;
  height: 100%;
  border: 1px black solid;
  border-radius: 4px;
  align-items: center;
  padding: 2px 10px;
  text-align: center;
  overflow: auto;
}
.tabButton.selected {
  font-weight: bold;
  display: flex;
  border: 1px black solid;
  border-radius: 4px;
  align-items: center;
  padding: 2px 10px;
  outline: none;
}
.tabButton:hover {
  cursor: pointer;
}

.deleteButton {
  display: none;
}
.deleteButton:hover {
  cursor: pointer;
}

.deleteButton.focus {
  display: flex;
  align-items: right;
  border-radius: 20px;
  border-style: solid;
  font-size: small;
  margin: 4px;
}

.tabAddButton {
  display: flex;
  vertical-align: right;
  border-radius: 20px;
  border-style: solid;
  font-size: medium;

}
.tabAddButton:hover {
  cursor: pointer;
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
</template>

<style scoped>
.tabBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: black 1px solid;
    overflow: hidden;
    flex-wrap: wrap;
    height: 90%;
}

.tabButton {
    border: black 1px solid;
    margin: 2px;
    height: 50%;
}

.addButton {
    border: black 1px solid;
    margin: 2px;
    height: 50%;
}
</style> -->
