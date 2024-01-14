<!-- 
  DashboardView.vue

  This defines divs for each panel of the app. In this file
  we use a CSS property called display: grid, which allows you to 
  have boxes that are proportional to each other.
 -->

<script setup>
import CalendarRoot from 'src/components/calendar/CalendarRoot.vue';
</script>

<template>
  <div class="gridContainer">
    <div class="calendarContainer">
      <CalendarRoot />
    </div>
    <div class="listsContainer"></div>
    <div class="dynamicContainer"></div>
  </div>
</template>

<style scoped>
.gridContainer {
  background: var(--google-docs-grey);
  min-height: 100svh;
  min-width: 100svw;
  display: grid;
  grid-template-columns: 0fr 13fr 7fr 0fr;
  grid-template-rows: 0fr 13fr 7fr 0fr;
  gap: 14px 14px; /** Define gap between containers */
  grid-auto-flow: row;
  grid-template-areas: /** The extra spots create gap around the containers */
    '. . . .'
    '. calendarContainer listsContainer .'
    '. dynamicContainer listsContainer .'
    '. . . .';
}

.calendarContainer {
  grid-area: calendarContainer;
}
.listsContainer {
  grid-area: listsContainer;
}
.dynamicContainer {
  grid-area: dynamicContainer;
}

.calendarContainer,
.listsContainer,
.dynamicContainer {
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
}
</style>
