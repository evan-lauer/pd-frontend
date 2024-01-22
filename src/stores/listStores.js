import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

export const listsData = reactive({
  // tabs: [], // This will be a 2d array
  //I think this will work better using a dictionary so that the tab labels can act as the keys
  tabDict: {
    'Tasks': ['Your first task', 'your second task']
  },
  addTab: (tabLabel, item) => {
    // add a new tab
    tabDict[tabLabel] = [item]
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
