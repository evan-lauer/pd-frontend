import {
  createList,
  deleteList,
  deleteListItem,
  getListItemsByUserId,
  putListItem
} from 'src/backend';

import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

const uid = new ShortUniqueId({ length: 10 });

export const listsData_ = reactive({
  tabs: {},

  // This gets all the lists and items from the database
  // and formats the data for using as a dictionary
  fetchTabs: async () => {
    const newTabs = {};
    const dataArray = await getListItemsByUserId();

    // Sort list entries by created timestamp
    dataArray.sort((item1, item2) => {
      return item1.timestamp - item2.timestamp;
    });

    // For each element, add it to the appropriate list (or
    // create it if it doesn't exist yet)
    dataArray.forEach((item) => {
      if (item.listId in newTabs && item.itemId !== '-1') {
        // Add item to existing list
        newTabs[item.listId].items.push({
          itemId: item.itemId,
          itemContent: item.itemContent
        });
      } else {
        // Create new list
        newTabs[item.listId] = {
          listTitle: item.listTitle,
          items: []
        };
        if (item.itemId !== '-1') {
          newTabs[item.listId].items.push({
            itemId: item.itemId,
            itemContent: item.itemContent
          });
        }
      }
    });
    console.log(newTabs);
    listsData_.tabs = newTabs;
  },

  // Add a new list to the store, and push it to the database
  createList: async (listTitle) => {
    const listId = uid.rnd();
    listsData_.tabs[listId] = {
      listTitle: listTitle,
      items: []
    };
    return await createList(listId, listTitle);
  },

  // Add a new list item to the store, and push it to the database
  createListItem: async (listId, listTitle, itemContent) => {
    const itemId = uid.rnd();
    listsData_.tabs[listId].items.push({
      itemId: itemId,
      itemContent: itemContent
    });
    return await putListItem(listId, listTitle, itemId, itemContent);
  },

  // Delete a list from the store, and delete it from the database
  deleteList: async (listId) => {
    delete listsData_.tabs[listId];
    return await deleteList(listId);
  },

  // Delete a list item from the store, and delete it from the database
  deleteListItem: async (listId, itemId) => {
    // Create a new copy of the list with only the OTHER items
    listsData_.tabs[listId].items = listsData_.tabs[listId].items.filter(
      (item) => item.itemId !== itemId
    );
    return await deleteListItem(listId, itemId);
  },

  updateListTitle: () => {},
  updateListItemContent: () => {}
});

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
        }
      ]
    }
  },
  addTab: (tabName) => {
    // add a new tab to the dict of tabs
    const suid = new ShortUniqueId({ length: 10 });
    const tabId = suid.rnd();
    listsData.tabIds.push(tabId);
    listsData.tabDict[tabId] = {
      items: [],
      label: tabName
    };
  },
  addItem: (tabId, itemLabel, indexOfPrevItem) => {
    // add an item to the specified tab
    const suid = new ShortUniqueId({ length: 10 });
    const itemId = suid.rnd();
    const newItem = {
      label: itemLabel,
      id: itemId,
      checked: false
    };
    listsData.tabDict[tabId].items.splice(indexOfPrevItem + 1, 0, newItem);
    // listsData.tabDict[tabId].items.push({
    //   label:itemLabel,
    //   id: itemId,
    //   checked: false,
    // });
    return itemId;
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
