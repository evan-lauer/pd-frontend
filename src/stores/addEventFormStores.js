import { reactive } from 'vue';

export const addEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: Date,
  endDateTime: Date
});
