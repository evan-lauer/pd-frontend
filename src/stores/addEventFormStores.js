// import { putCalendarEvent } from '../backend';
import ShortUniqueId from 'short-unique-id';
import { putCalendarEvent } from 'src/backend';
import { reactive } from 'vue';

const uid = new ShortUniqueId({ length: 10 });

export const addEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  putEvent: async () => {
    await putCalendarEvent(
      uid.rnd(),
      addEventForm.startDateTime,
      addEventForm.endDateTime,
      addEventForm.title,
      addEventForm.description
    );
  }
});
