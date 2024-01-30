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
  gap: 8px;
  overflow: hidden;
  border-bottom: 1px solid grey;
}

.lists {
  height: 95%;
  padding: 5px;
  overflow: hidden;
}
</style>
