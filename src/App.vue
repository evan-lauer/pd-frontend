<!-- 

App.vue

This file is the root of the project. This defines a component called App, which
is the parent of every other component in the project.

We only have one view at the moment - DashboardView - so this component is simple for now.
In the future we may add more views, in which case we would add routing in this file.
 -->
<script setup>
import DashboardView from 'src/views/DashboardView.vue';
</script>

<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
  </head>
  <div class="appBody">
    <DashboardView />
    <LoginView />
    <LogoutView />
  </div>
</template>

<style scoped>
@import 'src/globals.css';
.appBody {
  min-height: 100svh;
  min-width: 100svw;
}
</style>
