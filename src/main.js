/*
main.js

This file is the configuration of the project. It creates the vue app and configures
the router.

This is boilerplate code.
*/
import 'src/globals.css';

import App from 'src/App.vue';
import { createApp } from 'vue';
import router from 'src/router';

const app = createApp(App);

app.use(router);

app.mount('#app');
