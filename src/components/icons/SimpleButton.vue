<script setup>
defineProps({
  innerText: String,
  textColor: String,
  borderColor: String,
  backgroundColor: String
});
</script>

<template>
  <div
    style="border: 2px solid black"
    class="button"
  >
    <p class="buttonText">{{ innerText }}</p>
  </div>
</template>

<style scoped>
.button {
  height: fit-content;
  border: 2px solid black;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  cursor: pointer;
}

.buttonText {
  margin: 3px 5px;
  font-weight: 600;
}
</style>
