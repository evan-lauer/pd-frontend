import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

export const listsData = reactive({
  // tabs will be a 2d array
  // TODO: (1) alter the first, hardcoded tab
  
  tabIds: ['0'],

  tabDict: {
    0: {
      items: [
        {
          label: 'Your first item',
          id: '0',
          checked: false
        },
        {
          label: 'second',
          id: '1',
          checked: false
        },
      ],
      label: 'Tasks'
    }
  },
  addTab: (tabName) => {
    // add a new tab to the dict of tabs
    const suid = new ShortUniqueId({ length: 10 });
    const id = suid.rnd();
    listsData.tabIds.push(id);
    listsData.tabDict[id] = {
      items: [],
      label: tabName,
      checked: false
    };
  },
  addItem: (tabId, itemLabel) => {
    // add an item to the specified tab
    listsData.tabDict[tabId].items.push({
      label: itemLabel,
      id: new ShortUniqueId()
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
    listsData.tabDict[tabId].items.filter((item) => {
      return item.id !== itemId;
    });
  }
});

export const selectedTab = reactive({
  id: '0'
});
