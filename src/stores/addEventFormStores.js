import { reactive } from 'vue';

export const addEventForm = reactive({
  isFormActive: false,
  isPrefilled: false,
  title: '',
  description: '',
  startDateTime: Date,
  endDateTime: Date
});
