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

  reset: ()=> {
    eventData.numEventsArray = new Array(31).fill(0);
    console.log('reset called: ',eventData.numEventsArray);
  },

  // functions
  addEvent: (day) => {
    eventData.numEventsArray[day]++;
  },

  userEvents: async () => {
    await userStore.getEvents();    
    eventData.theEvents = userStore.events;
    console.log(eventData.theEvents);
    return eventData.theEvents
  },

  // getEventDate: (event) => {
  //   // not being passed an event where function is called
  //   const date = new Date(userStore.events[event]['endTime']); //currently causing an error
  //   console.log(date);

  //   // return date.getDate(); //returns day of the month
  // },

  creatingDaysEventArray: () => {
    eventData.reset();
    const month = selectedDate.dateTime.getMonth();
    const year = selectedDate.dateTime.getFullYear();
    // The excessive number of events occuring on one day is to
    // test the behavior of how the event symbols display when
    // they overflow the container.
    const testEvents = [
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

    for (const item of eventData.theEvents) {
      const date = new Date(item['endTime']); //currently causing an error
      // console.log(date);
      const eventMonth = date.getMonth();
      const eventYear = date.getFullYear();
      // console.log('Current Month: ',month,' Event Month: ',eventMonth,'\nCurrent Year: ',year,'Event Year: ', eventYear )
      
      if (month === eventMonth && year === eventYear) {
        const eventDay = date.getDate();
        eventData.numEventsArray[eventDay]++;
      }
  
    }
  }

});

