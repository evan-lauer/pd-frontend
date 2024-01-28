// import ShortUniqueId from "short-unique-id";
import { reactive } from 'vue';
import  userStore  from 'src/stores/userStore.js';
// Temp store for maintaining events, in order to display on
// calendar
export const eventData = reactive({
  eventIds: [],
  theEvents: [],
  numEventsArray: new Array(31).fill(0),

  // functions
  addEvent: (day) => {
    eventData.numEventsArray[day]++;
  },

  userEvents: () => {
    userStore.getEvents();
    console.log(userStore.events);
    eventData.theEvents = userStore.events;
    return eventData.theEvents
  },

  getEventDate: (event) => {
    console.log(eventData.theEvents);
    // const date = new Date(eventData.theEvents[event]['endTime']); //currently causing an error
    // console.log(date);

    // return date.getDate(); //returns day of the month
  }

});
export const eventExists = reactive({

  isEventByTruth: (day) => {
    // console.log(eventExists.eventDict[day]);
    // console.log(day)
    // if (eventExists.eventDict[day]['hasEvent']) {
    //     console.log("It's a true event ")
    // }
    // return eventExists.eventDict[day];

    // console.log(day, eventExists.eventArray[day - 1])
    // return eventExists.eventArray[day - 1];

    console.log(eventExists.numEventsArray[3]);
    // eventExists.eventArray[3] = true;
    // console.log(eventExists.eventArray[3]);

  }

});
