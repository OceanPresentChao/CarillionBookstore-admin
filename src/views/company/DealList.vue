<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <Icon icon="carbon:search" class="titleIcon"></Icon>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList" type="primary" size="default">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="订单种类：">
                        <el-select v-model="listQuery.s_typeId" placeholder="Select" style="width: 240px">
                            <el-option :key="2" label="图书订单" :value="2"></el-option>
                            <el-option :key="3" label="食品订单" :value="3"></el-option>
                            <el-option :key="1" label="充值订单" :value="1"></el-option>
                            <el-option :key="4" label="薪水订单" :value="4"></el-option>
                            <el-option :key="-1" label="ALL" :value="-1"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <Icon icon="bi:card-list" class="titleIcon"></Icon>
            <span>数据列表</span>
        </el-card>
        <div class="table-container">
            <suspense>
                <el-table ref="brandTable" :data="list.data" style="width: 100%" v-loading="list.listLoading" border>
                    <el-table-column type="selection" width="60" align="center" />
                    <el-table-column property="id" label="编号" width="160" align="center" />
                    <el-table-column property="typeId" width="220" label="账单类型" align="center"
                        :formatter="(row: any, column: any, cellValue: number, index: number) => { return ORDER_TYPE_MAP[cellValue] }" />
                    <el-table-column property="orderId" width="200" label="订单id" align="center">
                        <template #default="scope">
                            <el-button type="primary" size="default" text
                                @click="router.push({ path: '/company/order', query: { orderId: scope.row.orderId, typeId: scope.row.typeId } })">
                                {{ scope.row.orderId }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column property="amount" width="220" label="账单消费" align="center" />
                    <el-table-column property="date" label="账单日期" align="center" />
                </el-table>
            </suspense>
        </div>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.limit" :page-sizes="[5, 10, 15]"
                :current-page.sync="listQuery.page" :total="list.total">
            </el-pagination>
        </div>

    </div>
</template>
<script lang="ts" setup >
import { ElMessage } from 'element-plus';
import { requestGetDealList } from '@/api/company';
import { ORDER_TYPE_MAP } from "@/utils/constant"
const { t } = useI18n()
const router = useRouter()

const listQuery = ref({
    limit: 10,
    page: 1,
    s_orderId: -1,
    s_typeId: -1,
})

const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    pageSize: 0,
})

async function getDealList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetDealList(listQuery.value)
        list.value.listLoading = false
        list.value.data = data.record
        list.value.total = data.total
        list.value.totalPage = Math.floor(data.total / listQuery.value.limit) + 1
        list.value.pageSize = listQuery.value.limit
    } catch (error) {
        ElMessage({
            type: "error",
            message: String(error)
        })
    }

}

function handleSizeChange(val: number) {
    listQuery.value.page = 1;
    listQuery.value.limit = val;
    getDealList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getDealList();
}
function searchBrandList() {
    listQuery.value.page = 1;
    getDealList();
}


getDealList()
</script>
<style scoped>
</style>