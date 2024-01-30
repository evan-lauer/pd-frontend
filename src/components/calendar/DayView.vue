<script setup>
import { computed } from 'vue';
import { Calendar } from 'calendar-base';
import { selectedDate } from 'src/stores/calendarStores';
import userStore from 'src/stores/userStore';

const calendar = new Calendar({ siblingMonths: true, weekNumbers: true });

const displayDays = computed(() => {
  return calendar.getCalendar(selectedDate.date.getYear(), selectedDate.date.getMonth());
});

// 1 indexed
function getDayByIndex(week, day) {
  const index = (week - 1) * 7 + (day - 1);
  if (displayDays.value[index]) {
    return displayDays.value[index];
  } else {
    return false;
  }
}
var thisTime;
function currentTime(){
  let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";
  
      
    if(hh > 12){
        session = "PM";
        hh = hh - 12;
     }
    
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
      
     let time = hh + ":" + mm  + " " + session;
    
    thisTime = time; 
    var pos = (date.getHours() - 1)*20;
    document.getElementById("redBar").style.top = pos + '%';
    setInterval(function(){
      currentTime();
      document.getElementById("clockTimer").innerText = time;
      pos = document.getElementById("redBar").style.top;
      document.getElementById("redBar").style.top = pos + 1.66 + '%';
    }, 6000);
}
currentTime();
userStore.getEvents();
</script>
<template>
  <div class="dayHeader">
    <div
      v-for="day in 1"
      :key="day"
      :class="day === 1 ? `dayHeader first` : `dayHeader`"
    >
    <div id = "clockTimer">{{ thisTime }}</div>
    </div>
  </div>
  <div class="contentDiv">
    <div class="redBar">
       _____________________________________________________________
      </div>
    <div
      class="dayContainer"
      v-for="day in 1"
      :key="day"
      :class="day === 1 ? `dayContainer first` : `dayContainer`"
    >

      <div
        class="hourContainer"
        v-for="hour in 24"
        :key="hour"
        :id="hour-1"
        :class="hour === 1 ? `hourContainer first` : `hourContainer`"
      >
        {{ hour - 1}}:00
      </div>

    </div>
  </div>
  <div class= "datePickerDiv">
    <input
          class="datePicker"
          id = "dayDatePicker"
          name = "newDate"
          type="date"
          onclick = "function setDate(){
            selectedDate.dateTime = newDate;
            console.log(selectedDate.dateTime);
        }"
        >

  </div>

</template>
<script>
</script>
<style scoped>
.dayHeader {
  text-align: center;
  width: 100%;
  gap: 5px;
  border-bottom: var(--calendar-border-grey) 1px solid;
}
.dayContainer {
  flex-direction: row;
  padding-right: 0.53%;
  height: 95.5%;
}
.hourContainer {
  height: 20%;
  border-bottom: var(--calendar-border-grey) 1px solid;
}

.hourContainer.first {
  border-top: var(--calendar-border-grey) 1px solid;
}
.contentDiv {
  overflow-y: scroll;
  height: 95.5%;
  width: 70%;
  float:left;
  z-index: 0;
}
.datePickerDiv{
  float:right;
  padding: 0 40px;
}
.redBar{
  z-index: 1;
  height:0px;
  top: auto;
  position:relative;
  color: red;
  font-weight: black;

}
</style>

