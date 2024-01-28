// import ShortUniqueId from "short-unique-id";
import { reactive } from 'vue';
import  userStore  from 'src/stores/userStore.js';
import { selectedDate } from 'src/stores/calendarStores';

// Temp store for maintaining events, in order to display on
// calendar
export const eventData = reactive({
  eventIds: [],
  theEvents: [
    
  ],
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
  },

  creatingDaysEventArray: () => {
    let month = selectedDate.dateTime.getMonth();
    let year = selectedDate.dateTime.getFullYear();
    // The excessive number of events occuring on one day is to
    // test the behavior of how the event symbols display when
    // they overflow the container.
    let testEvents = [
      {
        endTime: "2024-01-08T05:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      },
      {
        endTime: "2024-01-22T06:00:00.000Z"
      }

    ]

    for (let item of testEvents) {
      let date = new Date(item['endTime']); //currently causing an error
      let eventMonth = date.getMonth();
      let eventYear = date.getFullYear();
      console.log(date, date.getDate())

      if (month === eventMonth && year === eventYear) {
        let eventDay = date.getDate();
        eventData.numEventsArray[eventDay]++;
      }
  
    }
    console.log(eventData.numEventsArray);
  }

});

