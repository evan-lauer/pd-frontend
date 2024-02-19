import {
  createList,
  deleteList,
  deleteListItem,
  getListItemsByUserId,
  putListItem,
  updateListsEntry
} from 'src/backend';

import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

const uid = new ShortUniqueId({ length: 10 });

/*
<tabs> looks like this: 
const tabs = {
    "abcdefg": {
        listTitle: "school list",
        items: [
            {
                itemId: "asdofij",
                itemContent: "do homework"
            },
            {
                itemId: "asdofi",
                itemContent: "do laundry"
            }
        ]
        }
    },
    "123abce": {
        listTitle: "work list",
        items: []
    }
  };

console.log(tabs["abcdefg"].items[0].itemContent);
This will print "do homework"
*/

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
          itemContent: item.itemContent,
          timestamp: item.timestamp
        });
      } else {
        // Create new list
        newTabs[item.listId] = {
          listTitle: item.listTitle,
          timestamp: item.timestamp,
          items: []
        };
        if (item.itemId !== '-1') {
          newTabs[item.listId].items.push({
            itemId: item.itemId,
            itemContent: item.itemContent,
            timestamp: item.timestamp
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
    const timestamp = Date.now();
    listsData_.tabs[listId] = {
      listTitle: listTitle,
      items: [],
      timestamp: timestamp
    };
    return await createList(listId, listTitle, timestamp);
  },

  // Add a new list item to the store, and push it to the database
  createListItem: async (listId, listTitle, itemContent) => {
    const itemId = uid.rnd();
    const timestamp = Date.now();
    listsData_.tabs[listId].items.push({
      itemId: itemId,
      itemContent: itemContent,
      timestamp: timestamp
    });
    return await putListItem(listId, listTitle, itemId, itemContent, timestamp);
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

  updateListTitle: async (listId, newTitle) => {
    const timestamp = listsData_.tabs[listId].timestamp;
    listsData_.tabs[listId].listTitle = newTitle;
    return await updateListsEntry(listId, newTitle, '-1', '', timestamp);
  },
  updateListItemContent: async (listId, itemId, newItemContent) => {
    const listTitle = listsData_.tabs[listId].listTitle;
    for (let i = 0; i < listsData_.tabs[listId].items.length; i++) {
      if (listsData_.tabs[listId].items[i].itemId === itemId) {
        const timestamp = listsData_.tabs[listId].items[i].timestamp;
        listsData_.tabs[listId].items[i].itemContent = newItemContent;
        return await updateListsEntry(listId, listTitle, itemId, newItemContent, timestamp);
      }
    }
    throw new Error('itemId not found');
  }
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
