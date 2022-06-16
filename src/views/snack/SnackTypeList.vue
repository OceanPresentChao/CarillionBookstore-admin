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
                    <el-table-column property="id" label="编号" width="110" align="center" />
                    <el-table-column property="title" label="名称" align="center" />
                    <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
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
import { useOptionStore } from "@/store/option"
import { ElMessage, ElMessageBox } from 'element-plus';
import { requestDeleteFoodCategory, requestCreateFoodCategory } from "@/api/food"
const optionStore = useOptionStore()
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
    return optionStore.foodCategoryOptions.slice(
        list.value.limit * (list.value.page - 1),
        list.value.limit * list.value.page)
})
let multipleSelection: any[] = []
const router = useRouter()


function handleSelectionChange(val: any[]) {
    multipleSelection = val;
}

function getList() {
    optionStore.getFoodCategoryOptions()
    list.value.total = optionStore.foodCategoryOptions.length
}

function handleCreate() {
    ElMessageBox.prompt('请填写小吃类型名称', '创建小吃类型', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            /[\w\u4e00-\u9fa5]+/,
        inputErrorMessage: '不合法名称',
    })
        .then(async ({ value }) => {
            const { data } = await requestCreateFoodCategory({ title: String(value) })
            if (data.code >= 200 && data.code < 300) {
                ElMessage({
                    type: 'success',
                    message: `创建成功！类型为：${value}`,
                })
                getList()
            } else {
                ElMessage({
                    type: 'error',
                    message: data.messgae,
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '创建取消',
            })
        })
}

async function handleDelete(index: number, row: any) {
    const { data } = await requestDeleteFoodCategory({ id: row.id })
    if (data.code >= 200 && data.code < 300) {
        ElMessage({
            message: data.message,
            type: 'success',
            duration: 1000
        });
        getList()
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

getList()


</script>
<style scoped>
</style>