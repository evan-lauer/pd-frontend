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
    :class="selectedTab.id === tabId ? `tabButton selected` : `tabButton`"
    v-for="tabId in listsData.tabIds" :key="tabId"
    @click="
      () => {
        selectedTab.id = tabId;
      }
    "
  >
  <button class="deleteButton" @click="listsData.deleteTab(selectedTab.id)">xxxx</button>
    {{ listsData.tabDict[tabId].label }}
  </div>

  <div v-if="listsData.tabIds.length < 10">
    <input
      class="tabNameInput"
      v-model="tabName"
      @keyup.enter="handleEnterTab(tabName)"
    />
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
.tabNameInput {
  width: 60px;
}
.tabButton {
  border: 1px black solid;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 2px 20px;
}
.tabButton:hover {
  cursor: pointer;
}
.tabButton.selected {
  font-weight: bold;
}

.deleteButton {
  display: none;
}

.deleteButton:hover {
  display: flex;
  background: grey;
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
