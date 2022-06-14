<template>
    <div class="my-10">
        <div class="flex">
            <div ref="chartRef" style="flex:none;width:50rem;height:40rem;"></div>
            <div class="flex-1 my-auto">
                <h1 class="text-left text-2xl my-5 text-yellow-500 antialiased">|| 经验值获取说明</h1>
                <el-table :data="tableData" style="width: 100%" border stripe size="large"
                    :header-row-style="{ color: '#e61', fontSize: '1.25rem' }">
                    <el-table-column prop="name" label="卡种" />
                    <el-table-column prop="price" label="价格" width="180" />
                    <el-table-column prop="exp" label="获得经验值" width="200" />
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { echarts } from "@/plugin/echart"
const chartRef = ref<HTMLDivElement | null>(null)
const tableData = [
    {
        name: '连续包年',
        price: '148元/年',
        exp: '148经验'
    },
    {
        name: '连续包季节',
        price: '45元/年',
        exp: '45经验'
    },
    {
        name: '连续包月',
        price: '15元/年',
        exp: '15经验'
    },
    {
        name: '年度大会员',
        price: '168元/年',
        exp: '168经验'
    },
    {
        name: '月度大会员',
        price: '25元/年',
        exp: '25经验'
    },
]



onMounted(() => {
    if (chartRef.value) {
        const myChart = echarts.init(chartRef.value)
        myChart.setOption({
            dataset: [
                {
                    dimensions: ['level', 'exp'],
                    source: [
                        ['Vip 1', 0],
                        ['Vip 2', 45],
                        ['Vip 3', 260],
                        ['Vip 4', 730],
                        ['Vip 5', 990],
                        ['Vip 6', 1890],
                        ['Vip 7', 4320],
                    ]
                },
                {
                    transform: {
                        type: 'sort',
                        config: { dimension: 'exp', order: 'asc' }
                    }
                }
            ],
            xAxis: {
                name: 'VIP 等级',
                type: 'category',
                axisLabel: { interval: 0, rotate: 30 }
            },
            yAxis: {
                name: '经验值'
            },
            series: {
                type: 'bar',
                encode: { x: 'name', y: 'score' },
                datasetIndex: 1
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            label: {
                show: true
            },
            title: {
                text: 'VIP 等级说明'
            },
            tooltip: {
                trigger: 'axis'
            },

        })
    }
})
</script>

<style scoped>
</style>