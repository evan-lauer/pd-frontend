<!-- ChatGPT written component, with modifications -->

<script setup>
import { ref, computed } from 'vue';
import { selectedDate } from 'src/stores/calendarStores';

const currentDate = ref(new Date());
const newDate = ref(null);

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
});

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const startOfMonth = () => {
  const date = new Date(currentDate.value);
  date.setDate(1);
  return date.getDay();
};

const daysInMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
};

const isToday = (date) => {
  const today = new Date();
  return date === today.toISOString().split('T')[0];
};

const isSelected = (date) => {
  return date === newDate.value;
};

const selectDate = (date) => {
  newDate.value = date;
  selectedDate.setToDate(newDate.value); //sets to one day behind the actual selected date
  selectedDate.incrementDay(); //stupid problems require stupid solutions
};

const previousMonth = () => {
      currentDate.value = new Date(
        currentDate.value.setMonth(currentDate.value.getMonth() - 1)
    );
    };

    const nextMonth = () => {
      const date = currentDate.value.getDate();
      const newMonth = currentDate.value.getMonth() + 2;
      const daysInNewMonth = new Date(currentDate.value.getFullYear(), newMonth, 0).getDate();

      currentDate.value= new Date(
        currentDate.value.setMonth(
          currentDate.value.getMonth() + 1,
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
        const date = new Date(currentDate.value);
        date.setDate(day);
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
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}</h2>
      <button @click="nextMonth">&gt;</button>
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

<style>
.date-picker {
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 5px;
  font-weight: bold;
}

.days {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: right;
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
