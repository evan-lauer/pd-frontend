<script setup></script>

<template>
  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    class="leftChevron"
  >
    <path
      d="M15.705 7.41L14.295 6L8.29498 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z"
      fill="black"
    />
  </svg> -->
  <span class="material-symbols-outlined arrow"> arrow_back </span>
</template>

<style scoped>
.material-symbols-outlined.arrow {
  margin-left: 5px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #344f49;
  transition: transform 0.3s ease;
}

.material-symbols-outlined.arrow:hover {
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 50px;
  background-color: rgba(167, 187, 183, 0.3);
}

/* .leftChevron:active {
  border: 2px solid #344f49;
} */
</style>
