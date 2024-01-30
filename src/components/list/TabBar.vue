<script setup>
import { listsData } from 'src/stores/listStores';
import { selectedTab } from 'src/stores/listStores';

const handleEnterTab = (tabName) => {
  listsData.addTab(tabName);
  tabName = '';
}
// add some way to delete a specific tab, use deleteTab function from listStores
// figure out how to edit the name of a tab after its been created
// TODO: automatically switch the text cursor to the newly created tab
</script>

<!-- tried to add a deletebutton, isn't showing up -->
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
    <button class="deleteButton" @click="listsData.deleteTab(selectedTab)">×</button>
  </div>

  <div v-if="listsData.tabIds.length < 10">
    <button
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
  /* border: 1px purple solid; */
  width: 40%;
}
.tabNameInput {
  width: 60px;
}
.tabButton {
  display: flex;
  width: 100px;
  height: auto;
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
}
.tabButton:hover {
  cursor: pointer;
}

.deleteButton {
  display: flex;
  align-items: right;
  margin: 4px;
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
