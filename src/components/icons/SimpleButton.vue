<script setup>
const props = defineProps({
  innerText: {
    type: String,
    default: ''
  },

  // These variants offer preset color options according to
  // our color scheme
  variant: {
    type: String,
    default: 'primary' // currently only accepts "primary", other color schemes to be added later
  },
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    :class="
      `button ` + selected
        ? disabled
          ? `selected disabled`
          : `selected`
        : disabled
        ? `disabled`
        : ``
    "
  >
    <p class="buttonText">
      {{ innerText }}
    </p>
  </div>
</template>

<style scoped>
.button {
  height: fit-content;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
}
.button:hover {
  cursor: pointer;
}

.button {
  border-color: var(--primary-default);
}

.button:not(.disabled):hover {
  border-color: var(--primary-hover);
}

.button.disabled {
  border-color: var(--primary-disabled);
}

.buttonText {
  margin: 3px 5px;
  font-weight: 600;
}
</style>
