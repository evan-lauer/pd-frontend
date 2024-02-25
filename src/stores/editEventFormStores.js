import { putCalendarEvent } from 'src/backend';
import { reactive } from 'vue';

export const editEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  putEvent: async (uid, startTime, endTime, description, title) => {
    console.log("saving event")
    await putCalendarEvent(
      uid,
      startTime,
      endTime,
      title,
      description
    );
  }
});
