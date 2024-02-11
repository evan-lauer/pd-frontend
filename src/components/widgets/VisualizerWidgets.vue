<!-- TODO: Have a bar that represents a day (24 hours) and fill up the corresponding portions with the tasks scheduled.
TODO: have a circle that represents a certain tab in list and show the percentage of tasks completed-->

<script setups>
</script>

<template>
    <div class="widgetContainer">
        <div class="messageContainer">some motivational something lol</div>
        <div class="taskContainer">
            <div class="taskCircle"></div>
        </div>
        <div class="barContainer">
            <div class="dayVisualizer"></div>
        </div>
    </div>
    <!-- call a function that gets the events for the given day. Probably won't have enough space to display
    all tasks so we can count the number of tasks in each tag. Maybe also mention what the upcoming task for today is?-->
</template>

<style scoped>
.widgetContainer {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 4px 4px;
    grid-auto-flow: row;
}

.messageContainer {
    grid-row: 1; /* Each section will take equal space */
    grid-column: 1;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.taskContainer {
    grid-row: 1; /* Each section will take equal space */
    grid-column: 2;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.barContainer {
    grid-row: 2;
    grid-column: span 2;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 0px;
}

.taskCircle {
    height: 50px;
    width: 50px;
    background-color: #bbb;
    border-radius: 50%;
    margin: 5px;
}

.dayVisualizer {
    height: 20px;
    width: 90%;
    border: 1px solid black;
    border-radius: 10px;
}
</style>