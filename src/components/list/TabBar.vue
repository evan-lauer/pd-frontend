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
    :class="selectedTab.id === tabId ? `tabContainer selected` : `tabContainer`"
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

.tabButton {
  display: flex;
  width: 70px;
  height: 20px;
  border-radius: 10px 10px 0px 0px;
  border: 1px solid transparent;
  align-items: center;
  padding: 2px 10px;
  text-align: center;
  overflow: auto;

}
.tabButton.selected {
  font-weight: bold;
  height: 85%;
  display: flex;
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
  font-size: medium;
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
