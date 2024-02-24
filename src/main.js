/*
main.js

This file is the configuration of the project. It creates the vue app and configures
the router.

This is boilerplate code.
*/
import 'src/globals.css';

import { createList, putListItem } from './backend';

import App from 'src/App.vue';
import ShortUniqueId from 'short-unique-id';
import { createApp } from 'vue';
import { listsData } from './stores/listStores';
import router from 'src/router';

// const uid = new ShortUniqueId({ length: 10 });

// var newListId = uid.rnd();

// createList(newListId, 'new list', Date.now());
// putListItem(newListId, 'new list', uid.rnd(), 'list item 1', Date.now());
// putListItem(newListId, 'new list', uid.rnd(), 'list item 2', Date.now());

// newListId = uid.rnd();
// createList(newListId, 'list 2', Date.now());
// putListItem(newListId, 'list 2', uid.rnd(), 'item 1', Date.now());
// putListItem(newListId, 'list 2', uid.rnd(), 'item 2', Date.now());

listsData.fetchTabs();

const app = createApp(App);

app.use(router);

app.mount('#app');
