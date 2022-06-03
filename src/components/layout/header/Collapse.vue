<template>
    <span @click="changeIcon" class="icons">
        <Icon icon="ep:expand" v-show="status"></Icon>
        <Icon icon="ep:expand" :rotate="2" v-show="!status"></Icon>
    </span>
</template>
<script setup lang='ts'>
import { computed } from 'vue'
import { useCollapseStore } from '@/store/collapse'
const collapseStore = useCollapseStore()
const status = computed(() => {
    return collapseStore.getCollapse
})
const changeIcon = () => {
    collapseStore.setCollapse(!status.value)
}
</script>
<style scoped>
.icons {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #303133;
    cursor: pointer;
    margin-right: 15px;
}
</style>