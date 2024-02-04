import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

export const listsData = reactive({
  // tabs will be a 2d array
  // TODO: (1) alter the first, hardcoded tab
  
  tabIds: ['0'],

  tabDict: {
    0: {
      label: 'Tasks',
      items: [
        {
          label: 'first',
          id: '1',
          checked: false
        },
      ],
    },
  },
  addTab: (tabName) => {
    // add a new tab to the dict of tabs
    const suid = new ShortUniqueId({ length: 10 });
    const tabId = suid.rnd();
    listsData.tabIds.push(tabId);
    listsData.tabDict[tabId] = {
      items: [],
      label: tabName,
    };
  },
  addItem: (tabId, itemLabel) => {
    // add an item to the specified tab
    const suid = new ShortUniqueId({ length: 10 });
    const itemId = suid.rnd();
    listsData.tabDict[tabId].items.push({
      label: itemLabel,
      id: itemId,
      checked: false,
    });
  },
  deleteTab: (tabId) => {
    // delete the specified tab
    delete listsData.tabDict.tabId;
    listsData.tabIds = listsData.tabIds.filter((item) => {
      return item !== tabId;
    });
  },
  deleteItem: (tabId, itemId) => {
    // delete the specified item from the tab
    listsData.tabDict[tabId].items = listsData.tabDict[tabId].items.filter((item) => {
      return item.id !== itemId;
    });
  }
});

export const selectedTab = reactive({
  id: '0'
});
