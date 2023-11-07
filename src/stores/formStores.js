import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import { reactive } from 'vue';

const today = new Date();

const API_ENDPOINT = `https://47dfxcjp8i.execute-api.us-east-2.amazonaws.com`;
const TEST_USER_ID = `test-user`;

class CalendarDate {
  constructor(year = today.getFullYear(), month = today.getMonth(), day = today.getDate()) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
  // TODO: Add form validation (throw an error if an invalid year/month/day is given)
  setYear(year) {
    this.year = year;
  }
  setMonth(month) {
    this.month = month;
  }
  setDay(day) {
    this.day = day;
  }
}

export const dateSelectionForm = reactive({
  active: false,
  viewMode: 'month',
  date: new CalendarDate()
});

export const newEventForm = reactive({
  title: 'New Event',
  description: undefined,
  // This line means that a new event defaults to the selected day :)
  startDate: new CalendarDate(
    dateSelectionForm.date.year,
    dateSelectionForm.date.month,
    dateSelectionForm.date.day
  ),
  endDate: new CalendarDate(
    dateSelectionForm.date.year,
    dateSelectionForm.date.month,
    dateSelectionForm.date.day
  ),
  putEvent() {
    const uid = new ShortUniqueId({ length: 10 });
    const startDateString = new Date(
      `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`
    );
    const endDateString = new Date(
      `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`
    );
    const options = {
      method: 'PUT',
      url: `${API_ENDPOINT}/CalendarEvents`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        userId: TEST_USER_ID,
        eventId: uid.rnd(),
        startTime: startDateString,
        endTime: endDateString,
        title: this.title,
        description: this.description ? this.description : '' // Provide empty string if description is undefined
      }
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // This is for when the form is submitted or cancelled. Must call
  // it so that the state resets.
  reset() {
    this.title = 'New Event';
    this.description = undefined;
    this.startDate = new CalendarDate(
      dateSelectionForm.date.year,
      dateSelectionForm.date.month,
      dateSelectionForm.date.day
    );
    this.endDate = new CalendarDate(
      dateSelectionForm.date.year,
      dateSelectionForm.date.month,
      dateSelectionForm.date.day
    );
  }
});
