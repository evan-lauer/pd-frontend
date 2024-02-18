import { reactive } from 'vue';

export const addEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date()
});
