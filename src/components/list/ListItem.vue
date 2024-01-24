<script setup>
import CheckBox from 'src/components/list/CheckBox.vue';
import { ref } from 'vue';
//TODO: ?
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  }
});

// defineProps({
//     done: Boolean,
//     task: String
// })
const isSelected = ref(false);
</script>
<template>
  <div class="item">
    <CheckBox
      :label="`I am checked: ${isSelected}`"
      v-model="isSelected"
    />
    <!-- <div id="checkbox"></div> -->
    <!-- <div> id="itemName"-->
  </div>
</template>

<style scoped>
/* for css */
.item {
  border: black 1px solid;
  /* padding: 10px; */
  max-width: 100%;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
