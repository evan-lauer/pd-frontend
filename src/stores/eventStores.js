import { addEventForm } from './addEventFormStores';
import { eventDetails } from './eventDetailsStores';
// import ShortUniqueId from "short-unique-id";
import { reactive } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore.js';

// Store for maintaining events, in order to display on
// calendar
export const eventMethods = reactive({
  displayEvent: (event) => {
    addEventForm.isFormActive = false;
    eventDetails.isDetailsActive = true;

    eventDetails.eventId = event.eventId;
    eventDetails.title = event.title;
    eventDetails.description = event.description;
    eventDetails.startDateTime = new Date(event.startTime);
    eventDetails.endDateTime = new Date(event.endTime);
  }
});

export const eventData = reactive({
  eventIds: [],
  theEvents: [],
  monthlyEvents: Array.from(new Array(31), function () {
    return [];
  }),
  weeklyEvents: {},

  reset: () => {
    eventData.monthlyEvents = Array.from(new Array(31), function () {
      return [];
    });
    // eventData.weeklyEvents = Array.from(new Array(7), function () {
    //   return [];
    // });
    eventData.weeklyEvents = {};
  },

  // functions
  addEvent: (day) => {
    eventData.monthlyEvents[day]++;
  },

  userEvents: async () => {
    await userStore.getEvents();
    eventData.theEvents = userStore.events;
    console.log(eventData.theEvents);
    return eventData.theEvents;
  },

  getWeekOutOfYear: (date, year) => {
    const startDate = new Date(year, 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);

    return weekNumber;
  },

  creatingDaysEventArray: () => {
    eventData.reset();
    const month = selectedDate.dateTime.getMonth();
    const year = selectedDate.dateTime.getFullYear();

    for (const item of eventData.theEvents) {
      const date = new Date(item['startTime']);
      const eventMonth = date.getMonth();
      const eventYear = date.getFullYear();

      if (month === eventMonth && year === eventYear) {
        const eventDay = date.getDate();
        if (!eventData.monthlyEvents[eventDay]) {
          eventData.monthlyEvents[eventDay] = [];
        }
        eventData.monthlyEvents[eventDay].push(item);
      }
    }
  },
  creatingWeeksEventArray: () => {
    eventData.reset();
    // const month = selectedDate.dateTime.getMonth();
    // const year = selectedDate.dateTime.getFullYear();
    const day = selectedDate.dateTime.getDate();

    // const weekNumber = eventData.getWeekOutOfYear(selectedDate.dateTime, year);
    // selectedDate is currently the saturday (last day) of the week
    // code written with assumption that this will be changed to be the first day of the week
    // once it's changed, the below code should be:
    // const endDate = selectedDate.dateTime + 6
    const endDate = selectedDate.dateTime
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 7)
    const testEvents = [
      {
        description: 'hi',
        endTime: '2024-01-21T06:00:00.000Z',
        eventId: '5TZIPTLMGs',
        startTime: '2024-01-21T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      // this event has different start and end time, for testing purposes
      {
        description: 'hi',
        endTime: '2024-01-29T11:00:00.000Z',
        eventId: '5TZIPTLMGs',
        startTime: '2024-01-29T09:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'hi',
        endTime: '2024-01-30T06:00:00.000Z',
        eventId: '5TZIPTLMGs',
        startTime: '2024-01-30T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-23T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-23T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-24T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-24T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-25T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-25T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-26T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-26T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-27T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-27T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'bai',
        endTime: '2024-01-21T06:00:00.000Z',
        eventId: '7qvWWpcvci',
        startTime: '2024-01-21T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: '',
        endTime: null,
        eventId: 'FIpjf9vWeZ',
        startTime: null,
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'r',
        endTime: '2024-01-23T06:00:00.000Z',
        eventId: 'HCnl1yCtLO',
        startTime: '2024-01-23T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'test',
        endTime: '2023-11-07T06:00:00.000Z',
        eventId: 'J2RkBKMz3K',
        startTime: '2023-11-07T06:00:00.000Z',
        title: 'test',
        userId: 'test-user'
      },
      {
        description: 'ASD',
        endTime: '2023-10-07T05:00:00.000Z',
        eventId: 'HvsVV7PIpQ',
        startTime: '2023-10-07T05:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'asdf',
        endTime: '2023-11-07T06:00:00.000Z',
        eventId: 'NOM2dIlOSw',
        startTime: '2023-11-07T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'ww',
        endTime: '2024-02-02T06:00:00.000Z',
        startTime: '2024-01-02T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: '',
        endTime: null,
        eventId: 'Q92gAlRNXx',
        startTime: null,
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'Description',
        endTime: '2023-11-07T06:00:00.000Z',
        eventId: 'ZSxQnr4p7p',
        startTime: '2023-11-07T06:00:00.000Z',
        title: 'Comps Meeting',
        userId: 'test-user'
      },
      {
        description: 'hi',
        endTime: '2024-01-22T06:00:00.000Z',
        eventId: 'bhD2CoM2s0',
        startTime: '2024-01-22T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: '',
        endTime: null,
        eventId: 'd8bvWmzIW5',
        startTime: null,
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'hi',
        endTime: null,
        eventId: 'eDaIScKvwF',
        startTime: null,
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'asdfasdf',
        endTime: '2023-11-07T06:00:00.000Z',
        eventId: 'eV1BauzYwU',
        startTime: '2023-11-07T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'description',
        endTime: '2023-11-07T06:00:00.000Z',
        eventId: 'mi3EWP31mj',
        startTime: '2023-11-07T06:00:00.000Z',
        title: 'event title',
        userId: 'test-user'
      },
      {
        description: '',
        endTime: '2024-01-23T06:00:00.000Z',
        eventId: 'nhvWylIjV0',
        startTime: '2024-01-23T06:00:00.000Z',
        title: 'New Event',
        userId: 'test-user'
      },
      {
        description: 'for a day in time',
        endTime: '2024-01-31T06:00:00.000Z',
        eventId: 'uiaXiv2LGH',
        startTime: '2024-01-31T06:00:00.000Z',
        title: 'This is an event',
        userId: 'test-user'
      }
    ];

    for (const item of testEvents) {
      const date = new Date(item['startTime']);
      const eventMonth = date.getMonth();
      const eventYear = date.getFullYear();
      const eventDate = date.getDate();

      // const eventWeekNumber = eventData.getWeekOutOfYear(date, year);
      console.log("start", startDate, "event", date, "end", endDate)
      if (startDate <= date && date <= endDate) {
        const eventDay = date.getDay();
        if (!(eventDate in eventData.weeklyEvents)) {
          eventData.weeklyEvents[eventDate] = [];
        }
        eventData.weeklyEvents[eventDate].push(item);
      }
    }
    console.log('Weeks Events Array: ', eventData.weeklyEvents);
  }
});
