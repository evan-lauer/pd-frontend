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
  async getEvents() {
    // get all the events from the database for the given user
    const res = await axios.request(options);
    if (res.data) {
      this.events = res.data;
      console.log(res.data);
    } else {
      console.log(res);
    }
  }
});

export default userStore;
