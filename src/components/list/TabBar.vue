<script>
import { ref } from 'vue';
import { listsData } from 'src/stores/listStores';

export default {
  setup() {
    const tabs = ref([{ id: 1, title: 'Tasks', desc: 'Things to do' }]);

    return { tabs, listsData };
  }
};
</script>

<template>
  <div
    @click="
      () => {
        console.log('tab clicked!');
      }
    "
    class="tabs"
    v-for="tabId in listsData.tabIds"
    :key="tabId"
  >
    {{ listsData.tabDict[tabId].label }}
  </div>

  <div v-if="listsData.tabIds.length < 10">
    <button
      @click="
        () => {
          listsData.addTab('New Tab');
        }
      "
    >
      +
    </button>
  </div>
</template>

<style></style>

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
