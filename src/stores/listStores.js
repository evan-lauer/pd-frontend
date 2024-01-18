import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

export const listsData = reactive({
  tabs: [], // This will be a 2d array
  addTab: () => {
    // add a new tab
  },
  addItem: (tab) => {
    // add an item to the specified tab
  },
  deleteTab: (tab) => {
    // delete the specified tab
  },
  deleteItem: (tab, item) => {
    // delete the specified item from the tab
  }
});

// tabs: Tab[]

// Tab: {
//   data: [],
//   id: Number
// }
