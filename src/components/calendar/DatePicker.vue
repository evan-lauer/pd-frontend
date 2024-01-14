<!-- 
  DatePicker.vue

  This component creates a multi-select dropdown for the month, and
  text inputs for the day and year.

  As the user selects day, month, and year, this component updates the
  dateSelectionForm to reflect the change.
 -->

<script setup>
import { dateSelectionForm } from 'src/stores/formStores';
</script>

<template>
  <div>
    <select @change="(e) => dateSelectionForm.date.setMonth(parseInt(e.target.value))">
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
      :value="dateSelectionForm.date.day"
      @change="(e) => dateSelectionForm.date.setDay(parseInt(e.target.value))"
    />
    <input
      type="text"
      :value="dateSelectionForm.date.year"
      @change="(e) => dateSelectionForm.date.setYear(parseInt(e.target.value))"
    />
  </div>
</template>
