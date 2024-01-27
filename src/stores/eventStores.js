// import ShortUniqueId from "short-unique-id";
import { reactive } from 'vue';
import  userStore  from 'src/stores/userStore.js';
// Temp store for maintaining events, in order to display on
// calendar
export const eventData = reactive({
  eventIds: [],
  theEvents: [],

  eventDict: {
    0: {
      // month
      1: {
        // day
        event_ctr: 0
      }
    }
  },
  // functions
  addEvent: (month, day) => {
    eventData.eventDict[month][day].event_ctr++;
  },

  userEvents: () => {
    userStore.getEvents();
    console.log(userStore.events)
    eventData.theEvents = userStore.events;
    return eventData.theEvents
  },

  getEventDate: () => {
    console.log(eventData.theEvents)
    // const date = new Date(eventData.theEvents[1]['endTime']);
    // console.log(date)
  }

});
export const eventExists = reactive({

  eventDict: {
    1: {
      hasEvent: true
    },
    2: {
      hasEvent: true
    },
    3: {
      hasEvent: true
    },
    4: {
      hasEvent: false
    },
    5: {
      hasEvent: true
    }
  },

  eventArray: [true, false, true, true, true, false],

  isEventByTruth: (day) => {
    // console.log(eventExists.eventDict[day]);
    // if (eventExists.eventDict[day]) {
    //     console.log("It's a true event ")
    // }
    // return eventExists.eventDict[day];
    return eventExists.eventArray[day - 1];
  },

  isEventOnDay: (day) => {
    if (day < 15) {
      return true;
    } else {
      return false;
    }
  }
});
