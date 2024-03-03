<!-- ChatGPT written component, with modifications -->

<script setup>
import { ref, computed } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';
import LeftChevron from 'src/components/icons/LeftChevron.vue';
import RightChevron from 'src/components/icons/RightChevron.vue';

const newDate = ref(null);
const currentMonth = computed(() => {
  return selectedDate.dateTime.toLocaleString('default', { month: 'long', year: 'numeric' });
});

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const startOfMonth = () => {
  const date = new Date(selectedDate.dateTime);
  date.setDate(1);
  return date.getDay();
};

const daysInMonth = () => {
  const date = new Date(selectedDate.dateTime);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
};

const isToday = (date) => {
  const today = new Date();
  return date === today.toISOString().split('T')[0];
};

//Returns true if date is the date that has been selected. This does not have anything to do with selectedDate.
const isSelected = (date) => {
  return date === newDate.value;
};

const selectDate = (date) => {
  if (date == '') {
    //user is clicking empty div, do nothing
  } else {
    newDate.value = date;
    selectedDate.setToDate(newDate.value);
    selectedDate.setHours();
  }
};

const previousMonth = () => {
  selectedDate.dateTime = new Date(
    selectedDate.dateTime.setMonth(selectedDate.dateTime.getMonth() - 1)
  );
};

const nextMonth = () => {
  const date = selectedDate.dateTime.getDate();
  const newMonth = selectedDate.dateTime.getMonth() + 2;
  const daysInNewMonth = new Date(selectedDate.dateTime.getFullYear(), newMonth, 0).getDate();

  selectedDate.dateTime = new Date(
    selectedDate.dateTime.setMonth(
      selectedDate.dateTime.getMonth() + 1,
      Math.min(daysInNewMonth, date)
    )
  );
};

const calendar = computed(() => {
  const days = [];
  const daysInCurrentMonth = daysInMonth();
  const startDay = startOfMonth();

  let day = 1;
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || day > daysInCurrentMonth) {
        row.push({ number: '', date: '' });
      } else {
        const date = new Date(selectedDate.dateTime);
        date.setDate(day);
        // Fix this line because toISOString will ignore the time zone. Right?
        // or am i trippin?
        row.push({ number: day, date: date.toISOString().split('T')[0] });
        day++;
      }
    }
    days.push(row);
  }
  return days;
});

</script>

<template>
  <div class="date-picker">
    <div class="calendar-header">
      <LeftChevron @click="previousMonth" />
      <h2>{{ currentMonth }}</h2>
      <RightChevron @click="nextMonth" />
    </div>
    <div class="calendar">
      <div class="weekdays">
        <div
          v-for="day in daysOfWeek"
          :key="day"
        >
          {{ day }}
        </div>
      </div>
      <div class="days">
        <div
          v-for="row in calendar"
          :key="row[0].date"
          class="week"
        >
          <div
            v-for="day in row"
            :key="day.date"
            class="dayMiniPicker"
            :class="{ today: isToday(day.date), selected: isSelected(day.date) }"
            @click="selectDate(day.date)"
          >
            {{ day.number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style>
.date-picker {
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.calendar-header button {
  background: none;
  border: none;
  cursor: pointer;
}

.calendar {
  margin-top: 10px;
}

.weekdays {
  display: flex;
}

.weekdays div {
  width: calc(100% / 7);
  text-align: center;
  font-weight: bold;
}

.days {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: right;
}
.dayMiniPicker:empty {
  pointer-events: none;
}
.dayMiniPicker:hover{
  background-color: var(--primary-hover);
}
.days .week {
  display: flex;
  flex-direction: row;
}

.dayMiniPicker {
  width: calc(100% / 7);
  text-align: center;
  padding: 10px 5px;
  cursor: pointer;
}

.days .today {
  background-color: lightgray;
}

.days .selected {
  background-color: #58837a;
  color: white;
}
</style>
