<script setup>
import ListSpace from 'src/components/list/ListSpace.vue';
import TabBar from 'src/components/list/TabBar.vue';
</script>

<template>
  <div class="header">
    <TabBar />
  </div>
  <div class="lists">
    <ListSpace />
  </div>
</template>

<style scoped>
/* should we align left or center? */
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  vertical-align: left;
  padding: 10px;
  overflow: hidden;
  border-bottom: 1px solid green;
  align-items: flex-end;
}

.lists {
  padding: 5px;
  max-height: 85vh;
  overflow-y: auto;
  align-items: flex-end;
}
</style>