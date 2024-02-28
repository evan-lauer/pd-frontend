<script setup>
defineProps({ checked: Boolean });
</script>

<template>
  <div class="iconContainer">
    <svg
      v-if="checked === false"
      class="uncheckedIcon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="RadioButtonUncheckedOutlinedIcon"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"
      ></path>
    </svg>
    <svg
      v-else
      class="checkedIcon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="CheckCircleIcon"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.uncheckedIcon,
.checkedIcon {
  height: 20px;
  width: 20px;
  fill: #dd825f;
}
</style>
