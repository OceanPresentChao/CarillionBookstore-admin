<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <Icon icon="bi:card-list" class="titleIcon"></Icon>
            <span>数据列表</span>
            <el-button class="btn-add" @click="handleCreate" size="default">
                添加
            </el-button>
        </el-card>
        <div class="table-container">
            <suspense>
                <el-table ref="brandTable" :data="displayList" style="width: 100%"
                    @selection-change="handleSelectionChange" v-loading="list.listLoading" border>
                    <el-table-column type="selection" width="60" align="center" />
                    <el-table-column property="food_id" label="编号" width="110" align="center" />
                    <el-table-column label="商品图片" align="center">
                        <template #default="scope">
                            <img style="height: 100px;width:auto;
                            display: inline-block;align-self: center;" :src="IMG_PREFIX + scope.row.food_avatar">
                        </template>
                    </el-table-column>
                    <el-table-column property="food_name" label="名称" align="center" />
                    <el-table-column property="food_type" label="类型" width="120" align="center" />
                    <el-table-column property="food_price" label="价格" width="170" align="center" />
                    <el-table-column property="food_dealamount" label="交易量" width="170" align="center" />
                    <el-table-column property="food_memo" label="备注" width="120" align="center" />
                    <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                            <el-button size="default" @click="handleUpdate(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-popconfirm title="Are you sure to delete this?"
                                @confirm="handleDelete(scope.$index, scope.row)">
                                <template #reference>
                                    <el-button size="default" type="danger">删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </suspense>
        </div>
        <div class="batch-operate-container">
            <el-select size="default" v-model="operateType" placeholder="批量操作">
                <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
                size="default">
                确定
            </el-button>
        </div>
        <div class="pagination-container">
            <el-pagination background layout="total, sizes,prev, pager, next,jumper" v-model:page-size="list.limit"
                :page-sizes="[5, 10, 15]" v-model:current-page="list.page" :total="list.total">
            </el-pagination>
        </div>
    </div>
</template>
<script lang="ts" setup >
import { requestDeleteFood, requestGetFoodList } from '@/api/food';
import { ElMessage } from 'element-plus';
import { IMG_PREFIX } from "@/utils/constant"
const { t } = useI18n()
const operates: Operate[] = [
    {
        label: "删除食品",
        value: "delFood"
    }
]
const operateType = ref("delFood")

const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    limit: 10,
    page: 1
})
const displayList = computed(() => {
    return list.value.data.slice(
        list.value.limit * (list.value.page - 1),
        list.value.limit * list.value.page)
})
let multipleSelection: any[] = []
const router = useRouter()


async function getFoodList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetFoodList()
        list.value.listLoading = false
        list.value.data = data.list
        list.value.total = data.list.length
        list.value.totalPage = Math.floor(list.value.total / list.value.limit) + 1
    } catch (error) {
        ElMessage({
            type: "error",
            message: String(error)
        })
    }
}
function handleSelectionChange(val: any[]) {
    multipleSelection = val;
}

function handleCreate() {
    router.push({ path: '/food/createFood' })
}

function handleUpdate(index: number, row: any) {
    router.push({ path: '/food/updateFood', query: { id: row.food_id } })
}

async function handleDelete(index: number, row: any) {
    const { data } = await requestDeleteFood({ id: row.food_id })
    if (data.code >= 200 && data.code < 300) {
        ElMessage({
            message: data.message,
            type: 'success',
            duration: 1000
        });
        getFoodList()
    } else {
        ElMessage({
            message: data.message,
            type: 'error',
            duration: 1000
        });
    }
}

function handleBatchOperate() {
    if (multipleSelection.length < 1) {
        ElMessage({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
        });
        return;
    }
    if (operateType.value === 'delFood') {
        for (let i = 0; i < multipleSelection.length; i++) {
            handleDelete(0, { id: multipleSelection[i].food_id });
        }
    } else {
        ElMessage({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
        });
        return;
    }
}

getFoodList()


</script>
<style scoped>
</style>