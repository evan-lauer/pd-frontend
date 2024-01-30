import { reactive } from 'vue';

export const selectedDate = reactive({
  dateTime: new Date(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  incrementMonth: () => {
    const date = selectedDate.dateTime.getDate();
    const newMonth = selectedDate.dateTime.getMonth() + 2;
    const daysInNewMonth = new Date(selectedDate.dateTime.getFullYear(), newMonth, 0).getDate();
    console.log(daysInNewMonth);
    console.log(newMonth);
    selectedDate.dateTime = new Date(
      selectedDate.dateTime.setMonth(
        selectedDate.dateTime.getMonth() + 1,
        Math.min(daysInNewMonth, date)
      )
    );
  },
  // TODO: Fix this method as well
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
