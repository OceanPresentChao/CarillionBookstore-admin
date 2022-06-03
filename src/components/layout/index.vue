<template>
    <el-container class="layout">
        <el-aside width="auto" class="aside">
            <MenuBar></MenuBar>
        </el-aside>
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Tabs />
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
    
<script setup lang='ts'>
</script>
    
<style scoped>
.layout {
    height: 100%;
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