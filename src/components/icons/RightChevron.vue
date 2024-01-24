<script setup></script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    class="rightChevron"
  >
    <path
      d="M9.70501 6L8.29501 7.41L12.875 12L8.29501 16.59L9.70501 18L15.705 12L9.70501 6Z"
      fill="black"
    />
  </svg>
</template>

<style scoped>
.rightChevron {
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid white;
  transition: border-color 0.4s;
}

.rightChevron:hover {
  border: 1px solid black;
}

.rightChevron:active {
  border: 2px solid black;
}
</style>
