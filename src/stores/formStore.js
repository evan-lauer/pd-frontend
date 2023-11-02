import { reactive } from 'vue';

export const formStore = reactive({
  year: 2000,
  month: 1,
  day: 1,
  viewMode: 'month',
  setYear(year) {
    this.year = year;
  },
  setMonth(month) {
    this.month = month;
  },
  setDay(day) {
    this.day = day;
  },
  setMode(mode) {
    this.viewMode = mode;
  }
});
