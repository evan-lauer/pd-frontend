import axios from 'axios';

const API_ENDPOINT = `https://47dfxcjp8i.execute-api.us-east-2.amazonaws.com`;
const TEST_USER_ID = `test-user`;

// Calendar backend functions:

export const putCalendarEvent = async (
  eventId,
  startTime,
  endTime,
  eventTitle,
  eventDescription
) => {
  const options = {
    method: 'PUT',
    url: `${API_ENDPOINT}/CalendarEvents`,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      userId: TEST_USER_ID,
      eventId: eventId,
      startTime: startTime,
      endTime: endTime,
      title: eventTitle,
      description: eventDescription
    }
  };
  const res = await axios.request(options);
  if (res.data) {
    // console.log(res.data);
  } else {
    console.log(res);
  }
  return eventId;
};

// TODO: Test all of these functions

// Get all events associated with the user id
export const getCalendarEventsByUserId = async () => {
  const options = {
    method: 'GET',
    url: `${API_ENDPOINT}/CalendarEvents/${TEST_USER_ID}`
  };
  const res = await axios.request(options);
  if (res.data) {
    console.log(res.data);
    return res.data;
  } else {
    console.log(res);
    return [];
  }
};

// Delete the event specified by eventId
export const deleteCalendarEvent = async (eventId) => {
  console.log('deleting: ', eventId);
  const options = {
    method: 'DELETE',
    url: `${API_ENDPOINT}/CalendarEvents/${TEST_USER_ID}/${eventId}`
  };
  const res = await axios.request(options);
  if (res.data) {
    // TODO: Figure out error handling for each different api.
    // For example, I'm not sure if this method returns a .data field on success.
    console.log(res.data);
  } else {
    console.log(res);
  }
};

// Create a new list with the given title
//
export const createList = async (listId, listTitle, itemId, timestamp) => {
  const options = {
    method: 'PUT',
    url: `${API_ENDPOINT}/ListItems`,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      userId: TEST_USER_ID,
      listId: listId,
      listTitle: listTitle,
      itemId: itemId,
      timestamp: timestamp
    }
  };
  const res = await axios.request(options);
  if (res.data) {
    console.log(res.data);
  } else {
    console.log(res);
  }
  return itemId;
};

// Add a new item with the given content to the given list
//
// Return the ID of the created item
// (timestamp should be in milliseconds since 1970, which you get by typing Date.now())
export const putListItem = async (listId, listTitle, itemId, itemContent, timestamp) => {
  const options = {
    method: 'PUT',
    url: `${API_ENDPOINT}/ListItems`,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      userId: TEST_USER_ID,
      listId: listId,
      listTitle: listTitle,
      itemId: itemId,
      timestamp: timestamp
    }
  };
  if (typeof itemContent !== 'undefined') {
    console.log('adding content to entry');
    options.data.itemContent = itemContent;
  }
  const res = await axios.request(options);
  if (res.data) {
    console.log(res.data);
  } else {
    console.log(res);
  }
  return itemId;
};

// Updates any existing entry in the table.
// This is just an alias for putListItem
export const updateListsEntry = putListItem;

// Get all list items associated with the userId
export const getListItemsByUserId = async () => {
  const options = {
    method: 'GET',
    url: `${API_ENDPOINT}/ListItems/${TEST_USER_ID}`
  };
  const res = await axios.request(options);
  if (res.data) {
    // console.log(res.data);
    return res.data;
  } else {
    console.log(res);
    return [];
  }
};

// Delete the specified item from the specified list
export const deleteListItem = async (listId, itemId) => {
  const options = {
    method: 'DELETE',
    url: `${API_ENDPOINT}/ListItems/${TEST_USER_ID}/${itemId}`
  };
  const res = await axios.request(options);
  if (res.data) {
    // console.log(res.data);
  } else {
    console.log(res);
  }
  return res;
};
