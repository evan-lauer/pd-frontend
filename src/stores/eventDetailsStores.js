import { reactive } from 'vue';

export const eventDetails = reactive({
  isDetailsActive: false,
  title: '',
  description: '',
  startDateTime: Date,
  // startTime: '',
  endDateTime: Date,
  // endTime: '',
  eventId: ''
});
