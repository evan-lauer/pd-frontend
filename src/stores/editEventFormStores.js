// import { putCalendarEvent } from '../backend';
import ShortUniqueId from 'short-unique-id';
import { putCalendarEvent } from 'src/backend';
import { reactive } from 'vue';

const uid = new ShortUniqueId({ length: 10 });

export const editEventForm = reactive({
  isFormActive: false,
  title: '',
  description: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  putEvent: async () => {
    await putCalendarEvent(
      uid.rnd(),
      editEventForm.startDateTime,
      editEventForm.endDateTime,
      editEventForm.title,
      editEventForm.description
    );
  }
});
