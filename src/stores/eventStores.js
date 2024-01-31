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
    // const testEvents = [
    //   {
    //     description: "hi",
    //     endTime: "2024-01-22T06:00:00.000Z",
    //     eventId: "5TZIPTLMGs",
    //     startTime: "2024-01-22T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user"
    //   },
    //   {
    //     description: "bai",
    //     endTime: "2024-01-23T06:00:00.000Z",
    //     eventId: "7qvWWpcvci",
    //     startTime: "2024-01-23T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "",
    //     endTime: null,
    //     eventId: "FIpjf9vWeZ",
    //     startTime: null,
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "r",
    //     endTime: "2024-01-23T06:00:00.000Z",
    //     eventId: "HCnl1yCtLO",
    //     startTime: "2024-01-23T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "test",
    //     endTime: "2023-11-07T06:00:00.000Z",
    //     eventId: "J2RkBKMz3K",
    //     startTime: "2023-11-07T06:00:00.000Z",
    //     title: "test",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "ASD",
    //     endTime: "2023-10-07T05:00:00.000Z",
    //     eventId: "HvsVV7PIpQ",
    //     startTime: "2023-10-07T05:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "asdf",
    //     endTime: "2023-11-07T06:00:00.000Z",
    //     eventId: "NOM2dIlOSw",
    //     startTime: "2023-11-07T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "ww",
    //     endTime: "2024-02-02T06:00:00.000Z",
    //     startTime: "2024-01-02T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "",
    //     endTime: null,
    //     eventId: "Q92gAlRNXx",
    //     startTime: null,
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "Description",
    //     endTime: "2023-11-07T06:00:00.000Z",
    //     eventId: "ZSxQnr4p7p",
    //     startTime: "2023-11-07T06:00:00.000Z",
    //     title: "Comps Meeting",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "hi",
    //     endTime: "2024-01-22T06:00:00.000Z",
    //     eventId: "bhD2CoM2s0",
    //     startTime: "2024-01-22T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "",
    //     endTime: null,
    //     eventId: "d8bvWmzIW5",
    //     startTime: null,
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "hi",
    //     endTime: null,
    //     eventId: "eDaIScKvwF",
    //     startTime: null,
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "asdfasdf",
    //     endTime: "2023-11-07T06:00:00.000Z",
    //     eventId: "eV1BauzYwU",
    //     startTime: "2023-11-07T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "description",
    //     endTime: "2023-11-07T06:00:00.000Z",
    //     eventId: "mi3EWP31mj",
    //     startTime: "2023-11-07T06:00:00.000Z",
    //     title: "event title",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "",
    //     endTime: "2024-01-23T06:00:00.000Z",
    //     eventId: "nhvWylIjV0",
    //     startTime: "2024-01-23T06:00:00.000Z",
    //     title: "New Event",
    //     userId: "test-user",
    //   },
    //   {
    //     description: "for a day in time",
    //     endTime: "2024-01-31T06:00:00.000Z",
    //     eventId: "uiaXiv2LGH",
    //     startTime: "2024-01-31T06:00:00.000Z",
    //     title: "This is an event",
    //     userId: "test-user",
    //   }
    // ]

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

