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
  align-items: flex-end;
  background-color: rgb(255, 194, 194);
  border-bottom: 2px solid rgb(244, 192, 192);
}

.lists {
  padding: 10px;
  max-height: 85vh;
  overflow-y: auto;
  align-items: flex-end;
}
</style>