<script setup>
import { selectedDate } from 'src/stores/calendarStores';
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
          <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="days">
          <div v-for="row in calendar" :key="row" >
            <div 
              v-for="day in row"
              :key="day.date"
              :class="{ 'today': isToday(day.date), 'selected': isSelected(day.date) }"
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
  import { ref, computed } from 'vue';
  
  export default {
    name: 'DatePicker',
    setup() {
      const currentDate = ref(new Date());
  
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
        // You would need to implement a selectedDate data property and update it when a date is clicked
        return date === selectedDate.dateTime;
      };
  
      const selectDate = (date) => {
        selectedDate.dateTime.setToDate(date);
      };
  
      const previousMonth = () => {
        currentDate.value.setMonth(currentDate.value.getMonth() - 1);
      };
  
      const nextMonth = () => {
        currentDate.value.setMonth(currentDate.value.getMonth() + 1);
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
  
      return {
        currentMonth,
        daysOfWeek,
        calendar,
        previousMonth,
        nextMonth,
        isToday,
        isSelected,
        selectDate,
      };
    },
  };
  </script>
  <style>
  .date-picker{
    height:50%;
  }
  .calendar-header{
    height:85%;
  }
  .calendar{
  display: flex;
  
  flex-direction: column;
  }
  .weekdays{
    display: flex;
  flex-direction: row;
  }
  .days{
    display:flex;
    flex-direction:column;
  }
  .week{
  display: flex;
  flex-direction: row;
  }
  
</style>
