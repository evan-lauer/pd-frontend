import { reactive } from 'vue';

const today = new Date();

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
