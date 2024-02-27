// import { putCalendarEvent } from '../backend';
import { putCalendarEvent } from 'src/backend';
import { reactive } from 'vue';

export const addEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  putEvent: async (eventId) => {
    await putCalendarEvent(
      eventId,
      addEventForm.startDateTime,
      addEventForm.endDateTime,
      addEventForm.title,
      addEventForm.description
    );
  }
});
