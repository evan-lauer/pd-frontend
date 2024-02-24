import { addEventForm } from 'src/stores/addEventFormStores';
import { deleteCalendarEvent } from 'src/backend';
import { editEventForm } from 'src/stores/editEventFormStores';
import { eventDetails } from 'src/stores/eventDetailsStores';
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
  dailyEvents: [],

  reset: () => {
    eventData.monthlyEvents = Array.from(new Array(31), function () {
      return [];
    });

    eventData.weeklyEvents = {};
    eventData.dailyEvents = [];
  },

  userEvents: async () => {
    await userStore.getEvents();
    eventData.theEvents = userStore.events;
    // console.log(eventData.theEvents);
    return eventData.theEvents;
  },

  deleteEventFromStore: (eventToBeDeletedId) => {
    const newEventArray = eventData.theEvents.filter(
      (anEvent) => anEvent.eventId != eventToBeDeletedId
    );
    eventData.theEvents = newEventArray;
    console.log('Event deleted from store.');
  },

  deleteEventFromBoth: (eventToBeDeletedId) => {
    eventData.deleteEventFromStore(eventToBeDeletedId);
    deleteCalendarEvent(eventToBeDeletedId);
    console.log('Event deleted from backend.');
  },

  displayEditEvent: (eventToBeEditedId) => {
    eventDetails.isDetailsActive = false;
    editEventForm.isFormActive = true;

    const eventToBeEditedArray = eventData.theEvents.filter(
      (anEvent) => anEvent.eventId === eventToBeEditedId
    );
    const theEventToBeEditedObject = eventToBeEditedArray[0];
    console.log('Event to be edited array: ', eventToBeEditedArray);
    console.log('The event to be edited: ', theEventToBeEditedObject);

    editEventForm.title = theEventToBeEditedObject['title'];
    editEventForm.description = theEventToBeEditedObject['description'];
    editEventForm.startDateTime = new Date(theEventToBeEditedObject['startTime']);
    editEventForm.endDateTime = new Date(theEventToBeEditedObject['endTime']);
  },

  getWeekOutOfYear: (date, year) => {
    const startDate = new Date(year, 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);

    return weekNumber;
  },

  creatingMonthsEventArray: () => {
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
    const day = selectedDate.dateTime.getDate();

    const endDate = selectedDate.dateTime;
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    for (const item of theEvents) {
      const date = new Date(item['startTime']);
      const eventMonth = date.getMonth();
      const eventYear = date.getFullYear();
      const eventDate = date.getDate();

      if (startDate <= date && date <= endDate) {
        const eventDay = date.getDay();
        if (!(eventDate in eventData.weeklyEvents)) {
          eventData.weeklyEvents[eventDate] = [];
        }
        eventData.weeklyEvents[eventDate].push(item);
      }
    }
    console.log('Weeks Events Array: ', eventData.weeklyEvents);
  },

  creatingDaysEventArray: () => {
    eventData.reset();
    const day = selectedDate.dateTime.getDate();
    const month = selectedDate.dateTime.getMonth();
    const year = selectedDate.dateTime.getFullYear();

    for (const item of eventData.theEvents) {
      const date = new Date(item['startTime']);
      const eventDay = date.getDate();
      const eventMonth = date.getMonth();
      const eventYear = date.getFullYear();

      if (day === eventDay && month === eventMonth && year === eventYear) {
        console.log('Day events array; event: ', item);
        if (item.startTime != item.endTime) {
          console.log('End and start are not equal');
        }
        eventData.dailyEvents.push(item);
      }
    }
  }
});
