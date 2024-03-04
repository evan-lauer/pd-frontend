import axios from 'axios';
import { reactive } from 'vue';

const API_ENDPOINT = `https://47dfxcjp8i.execute-api.us-east-2.amazonaws.com`;
const TEST_USER_ID = `test-user`;

const options = {
  method: 'GET',
  url: `${API_ENDPOINT}/CalendarEvents/${TEST_USER_ID}`
};

const userStore = reactive({
  userId: TEST_USER_ID,
  events: [],
  lists: [],

  async getEvents() {
    // get all the events from the database for the given user
    const res = await axios.request(options);
    if (res.data) {
      const fetchedEvents = res.data.map((event) => {
        return {
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          description: event.description,
          eventId: event.eventId,
          title: event.title,
          userId: event.userId
        };
      });
      fetchedEvents.sort((event1, event2) => event1.startTime - event2.startTime);
      this.events = fetchedEvents;
      // console.log(res.data);
    } else {
      console.log(res);
    }
  },
  async getLists() {
    //Get all of the users lists from the database
  }
});

export default userStore;
