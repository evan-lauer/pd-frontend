import { reactive } from 'vue';

export const selectedDate = reactive({
  dateTime: new Date(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  incrementMonth: () => {
    selectedDate.dateTime = new Date(
      selectedDate.dateTime.setMonth(selectedDate.dateTime.getMonth() + 1)
    );
  },
  decrementMonth: () => {
    selectedDate.dateTime = new Date(
      selectedDate.dateTime.setMonth(selectedDate.dateTime.getMonth() - 1)
    );
  }
});

export const viewMode = reactive({
  mode: 'month',
  setMode: (_mode) => {
    viewMode.mode = _mode;
  }
});
