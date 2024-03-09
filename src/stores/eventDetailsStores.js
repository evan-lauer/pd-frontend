import { reactive } from 'vue';

export const eventDetails = reactive({
  isDetailsActive: false,
  title: '',
  description: '',
  startDateTime: Date,
  endDateTime: Date,
  eventId: ''
});

export const eventDeleteConfirm = reactive ({
  isConfirmDeleteActive: false,
  eventId: ''

});