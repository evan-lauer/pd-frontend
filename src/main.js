/*
main.js

This file is the configuration of the project. It creates the vue app and configures
the router.

This is boilerplate code.
*/
import 'src/globals.css';

import App from 'src/App.vue';
import { createApp } from 'vue';
import { listsData_ } from './stores/listStores';
import router from 'src/router';


// Use plugin with optional defaults

const app = createApp(App);

app.use(router);

app.mount('#app');

listsData_.fetchTabs();
