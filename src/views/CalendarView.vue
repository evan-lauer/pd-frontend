<script setup>
import { Calendar } from 'calendar-base'
import { ref } from 'vue'

const month = ref('')
const year = ref('')
const days = ref([])

const calendar = new Calendar()
const array = calendar.getCalendar(year.value, month.value)
console.log(array)

function monthChange(event) {
  month.value = event.target.value
  const calendar = new Calendar()
  days.value = calendar.getCalendar(year.value, month.value)
  console.log(days)
}

function yearChange(event) {
  year.value = event.target.value
  const calendar = new Calendar()
  console.log(year.value)
  console.log(month.value)
  days.value = calendar.getCalendar(Number(year.value), Number(month.value))
  console.log(days)
}
</script>

<template>
  <h1>Calendar</h1>
  <div class="form">
    <!-- v-model binds the value of a form element to a ref.
    So in this case, the value of our dropdown is now bound
    to the value of the "month" ref -->
    <select @change="monthChange">
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
    <input type="text" @change="yearChange" />
  </div>
  <h3>{{ month + ' ' + year }}</h3>
</template>

<style></style>
