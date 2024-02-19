import { reactive } from 'vue';

export const addEventForm = reactive({
  isFormActive: true,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date()
});
