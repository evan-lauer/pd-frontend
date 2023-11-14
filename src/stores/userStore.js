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
  getEvents() {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        this.events = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

export default userStore;
