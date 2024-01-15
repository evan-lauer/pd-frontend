<script setup>
import ListItem from 'src/components/list/ListItem.vue'
</script>

<template>
    <div class="header">Lists</div>
    <div class="lists">
        <ListItem />
    </div>

</template>

<style scoped>
.header {
    height: 10%;
    vertical-align: left;
    padding: 10px;
}

.lists {
    height: 90%;
    padding: 10px;
}
</style>