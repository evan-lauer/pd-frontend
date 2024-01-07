<!-- 

App.vue

This file is the root of the project. This defines a component called App, which
is the parent of every other component in the project.


 -->
<script setup>
import DashboardView from 'src/views/DashboardView.vue';
</script>

<template>
  <div class="appBody">
    <DashboardView />
  </div>
</template>

<style scoped>
@import 'src/globals.css';
.appBody {
  min-height: 100svh;
  min-width: 100svw;
}
</style>
