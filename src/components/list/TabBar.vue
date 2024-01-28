<script setup>
import { listsData } from 'src/stores/listStores';
import { selectedTab } from 'src/stores/listStores';

const handleEnterTab = (ref) => {
  listsData.addTab(ref);
}
// have to change this function to reference whatever text was typed into the input

</script>

<template>
  <div
    :class="selectedTab.id === tabId ? `tabButton selected` : `tabButton`"
    v-for="tabId in listsData.tabIds"
    :key="tabId"
    @click="
      () => {
        // console.log(`tab ` + tabId + ` clicked!`);
        selectedTab.id = tabId;
      }
    "
  >
    {{ listsData.tabDict[tabId].label }}
  </div>

  <div v-if="listsData.tabIds.length < 10">
    <input
      class="tabNameInput"
      v-model="tabName"
      ref="tabNameInput"
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
  padding: 0px 10px;
}
.tabButton:hover {
  cursor: pointer;
}
.tabButton.selected {
  font-weight: bold;
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
