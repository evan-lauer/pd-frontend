<script setups>
</script>

<template>
    <div>Today's tasks:</div>
    <!-- call a function that gets the events for the given day. Probably won't have enough space to display
    all tasks so we can count the number of tasks in each tag. Maybe also mention what the upcoming task for today is?-->
    <div class="circles">
        <div class="AMCircle"></div>
        <div class="PMCircle"></div>
    </div>
    <div class="barContainer">
        <div class="bar"></div>
    </div>
</template>

<style scoped>
.circles{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}
.AMCircle,
.PMCircle {
    height: 50px;
    width: 50px;
    background-color: #bbb;
    border-radius: 50%;
    margin: 5px;
}

.barContainer {
    height: auto;
    width: 100%;
    display: flex;
    align-items: flex-end;
}
.bar {
    width: 90%;
    height: 30px;
    border: 1px solid black;
    border-radius: 10px;
}
</style>