<template>
    <el-container class="layout">
        <MenuBar></MenuBar>
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Tabs />
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
    
<script setup lang='ts'>
// console.log(import.meta.env.VITE_APP_API);
</script>
    
<style scoped>
.layout {
    position: relative;
    height: 100%;
    width: 100%;
}

.layout .aside {
    background-color: rgb(48, 65, 86);
}

.layout .header {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.layout .main {
    padding-top: 0px;
}
</style>