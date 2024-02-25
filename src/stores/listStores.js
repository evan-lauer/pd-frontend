import {
  createList,
  deleteListItem,
  getListItemsByUserId,
  putListItem,
  updateListsEntry
} from 'src/backend';

import ShortUniqueId from 'short-unique-id';
import { reactive } from 'vue';

const uid = new ShortUniqueId({ length: 10 });

export const listsData = reactive({
  tabs: {},
  tabIdArray: [],
  // This gets all the lists and items from the database
  // and formats the data for using as a dictionary
  fetchTabs: async () => {
    let newTabIdArray = [];
    const newTabs = {};
    const dataArray = await getListItemsByUserId();

    // Sort list entries by created timestamp
    dataArray.sort((item1, item2) => {
      return item1.timestamp - item2.timestamp;
    });

    // For each element, add it to the appropriate list (or
    // create it if it doesn't exist yet)
    dataArray.forEach((item) => {
      if (item.listId in newTabs && item.itemContent !== undefined) {
        // Add item to existing list
        newTabs[item.listId].items.push({
          itemId: item.itemId,
          itemContent: item.itemContent,
          timestamp: item.timestamp,
          checked: item.checked ? true : false
        });
      } else {
        newTabIdArray.push(item.listId);
        // Create new list
        newTabs[item.listId] = {
          listTitle: item.listTitle,
          extraItemId: item.itemId, // This is a dumb bandaid... Ugh...
          timestamp: item.timestamp,
          items: []
        };
        if (item.itemContent !== undefined) {
          // This really should not happen. If it does we have a potential problem
          throw new Error('Error, why was the item created before the list?');
          // newTabs[item.listId].items.push({
          //   itemId: item.itemId,
          //   itemContent: item.itemContent,
          //   timestamp: item.timestamp
          // });
        }
      }
    });
    console.log('Hi team :) I added test tabs to the database');
    console.log('This is what the tabs look like when they get put into the listStore: ', newTabs);
    listsData.tabs = newTabs;
    listsData.tabIdArray = newTabIdArray;
  },

  // Add a new list to the store, and push it to the database
  createList: async (listTitle) => {
    const listId = uid.rnd();
    const extraItemId = uid.rnd();
    const timestamp = Date.now();
    listsData.tabs[listId] = {
      listTitle: listTitle,
      extraItemId: extraItemId,
      items: [],
      timestamp: timestamp
    };
    listsData.tabIdArray.push(listId);
    return await createList(listId, listTitle, extraItemId, timestamp);
  },

  // Add a new list item to the store, and push it to the database
  createListItem: async (listId, listTitle, itemContent) => {
    const itemId = uid.rnd();
    const timestamp = Date.now();
    listsData.tabs[listId].items.push({
      itemId: itemId,
      itemContent: itemContent,
      timestamp: timestamp
    });
    return await putListItem(listId, listTitle, itemId, itemContent, timestamp, false);
  },

  // Delete a list from the store, and delete it from the database
  deleteList: async (listId) => {
    const extraItemId = listsData.tabs[listId].extraItemId;
    const itemIdArray =
      listsData.tabs[listId].items.forEach((item) => {
        return item.itemId;
      }) || [];
    listsData.tabIdArray = listsData.tabIdArray.filter((id) => id !== listId);
    delete listsData.tabs[listId];
    // We need to delete every entry associated with the list,
    // which includes the list entry itself, and then every item
    // associated with that list.
    const results = new Array();
    results.push(deleteListItem(listId, extraItemId));
    console.log('ids to delete: ', itemIdArray);
    itemIdArray.forEach((id) => {
      results.push(deleteListItem(listId, id));
    });
    return results;
  },

  // Delete a list item from the store, and delete it from the database
  deleteListItem: async (listId, itemId) => {
    // Create a new copy of the list with only the OTHER items
    listsData.tabs[listId].items = listsData.tabs[listId].items.filter(
      (item) => item.itemId !== itemId
    );
    return await deleteListItem(listId, itemId);
  },

  updateListTitle: async (listId, newTitle) => {
    console.log('calling update');
    const timestamp = listsData.tabs[listId].timestamp;
    const extraItemId = listsData.tabs[listId].extraItemId;
    listsData.tabs[listId].listTitle = newTitle;
    return await updateListsEntry(listId, newTitle, extraItemId, undefined, timestamp, false);
  },
  updateListItemContent: async (listId, itemId, newItemContent) => {
    const listTitle = listsData.tabs[listId].listTitle;
    for (let i = 0; i < listsData.tabs[listId].items.length; i++) {
      if (listsData.tabs[listId].items[i].itemId === itemId) {
        const timestamp = listsData.tabs[listId].items[i].timestamp;
        const checked = listsData.tabs[listId].items[i].checked;
        listsData.tabs[listId].items[i].itemContent = newItemContent;
        return await updateListsEntry(
          listId,
          listTitle,
          itemId,
          newItemContent,
          timestamp,
          checked
        );
      }
    }
    throw new Error('itemId not found');
  },
  checkListItem: async (listId, itemId, checked) => {
    const listTitle = listsData.tabs[listId].listTitle;
    for (let i = 0; i < listsData.tabs[listId].items.length; i++) {
      if (listsData.tabs[listId].items[i].itemId === itemId) {
        listsData.tabs[listId].items[i].checked = checked;
        const timestamp = listsData.tabs[listId].items[i].timestamp;
        const itemContent = listsData.tabs[listId].items[i].itemContent;
        return await updateListsEntry(listId, listTitle, itemId, itemContent, timestamp, checked);
      }
    }
    throw new Error('itemId not found');
  }
});

export const selectedTab = reactive({
  id: undefined
});
