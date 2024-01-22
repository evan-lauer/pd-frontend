<script setup>
import ListSpace from 'src/components/list/ListSpace.vue';
import TabBar from 'src/components/list/TabBar.vue';
//TODO: Needs to manage which ListSpace is displayed based on which tab is selected
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
.header {
  display: flex;
  flex-direction: row;
  height: 10%;
  vertical-align: left;
  padding: 10px;
  overflow: hidden;
  gap: 4px;
}

.lists {
  height: 90%;
  padding: 10px;
}
</style>
