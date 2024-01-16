import { reactive } from 'vue';

export const selectedDate = reactive({
  dateTime: new Date(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  getMonthName: () => {
    return selectedDate.dateTime.toLocaleString('default', { month: 'long' });
  }
});

export const viewMode = reactive({
  mode: 'month',
  setMode: (_mode) => {
    viewMode.mode = _mode;
  }
});
