<script setup>
defineProps({
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
      selected
        ? disabled
          ? `button selected disabled`
          : `button selected`
        : disabled
        ? `button disabled`
        : `button`
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
  transition-property: background, color, border-color;
  transition-duration: 0.4s;
}
.button:hover {
  cursor: pointer;
}

.button {
  border-color: var(--primary-default);
}

.button.selected {
  background: var(--primary-default);
  color: white;
}

.button.selected.disabled {
  background: var(--primary-disabled);
}

.button:not(selected) {
  color: var(--primary-default);
}

.button:not(selected).disabled {
  color: var(--primary-disabled);
}

.button:not(.disabled):hover {
  border-color: var(--primary-hover);
  background: var(--primary-hover);
  color: white;
}

.button.disabled {
  border-color: var(--primary-disabled);
}

.buttonText {
  margin: 3px 5px;
  font-weight: 600;
}
</style>
