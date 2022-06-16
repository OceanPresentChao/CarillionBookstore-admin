<template>
    <div>
        This is Order
    </div>
</template>

<script setup lang="ts">
import { requestGetBookOrder, requestGetVipOrder } from '@/api/company';

const route = useRoute()

async function getOrder() {
    const { data } = await requestGetVipOrder({ order_id: 6 })
}

getOrder()
</script>

<style scoped>
</style>