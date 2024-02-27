/*
main.js

This file is the configuration of the project. It creates the vue app and configures
the router.

This is boilerplate code.
*/
import 'src/globals.css';

import App from 'src/App.vue';
import { createApp } from 'vue';
import { eventData } from 'src/stores/eventStores';
import { listsData } from 'src/stores/listStores';
import router from 'src/router';

// This function allows us to make async calls in parallel,
// and await both of them at the same time
async function makeNetworkCalls() {
  const tabs = listsData.fetchTabs();
  const events = eventData.userEvents();

  return {
    tabsResult: await tabs,
    eventsResult: await events
  };
}

await makeNetworkCalls();

const app = createApp(App);

app.use(router);

app.mount('#app');
