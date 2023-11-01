<script setup>
defineProps({
  mode: String,
  day: Number,
  setDay: Function,
  month: Number,
  setMonth: Function,
  year: Number,
  setYear: Function
});
</script>

<template>
  <div>
    <select @change="(e) => setMonth(parseInt(e.target.value))">
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
    <input
      type="text"
      :value="day"
      @change="(e) => setDay(parseInt(e.target.value))"
    />
    <input
      type="text"
      :value="year"
      @change="(e) => setYear(parseInt(e.target.value))"
    />
  </div>
</template>
