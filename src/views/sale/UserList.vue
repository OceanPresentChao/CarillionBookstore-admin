<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <Icon icon="carbon:search" class="titleIcon"></Icon>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchDepartments" type="primary" size="default">
                    查询结果
                </el-button>
                <el-button style="float: right;margin-right: 15px" @click="handleResetSearch()" size="default">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.s_name" placeholder="用户名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="用户会员等级：">
                        <el-select v-model="listQuery.s_level" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in VIPOptions" :key="item.level" :label="item.name"
                                :value="item.level" />
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <Icon icon="bi:card-list" class="titleIcon"></Icon>
            <span>数据列表</span>
            <el-button class="btn-add" @click="" size="default">
                添加
            </el-button>
        </el-card>
        <div class="table-container">
            <suspense>
                <el-table ref="brandTable" :data="list.data" style="width: 100%"
                    @selection-change="handleSelectionChange" v-loading="list.listLoading" border>
                    <el-table-column type="selection" width="60" align="center" />
                    <el-table-column property="id" label="编号" width="110" align="center" />
                    <el-table-column property="name" label="用户名" align="center" />
                    <el-table-column property="level" label="VIP等级" width="120" align="center" />
                    <el-table-column property="exp" label="经验值" width="170" align="center" />
                    <el-table-column property="money" label="金额" width="170" align="center" />
                    <el-table-column property="expireDate" label="VIP过期日期" width="170" align="center"
                        :formatter="transformDate" />
                    <el-table-column property="createDate" label="创建日期" width="170" align="center"
                        :formatter="transformDate" />
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
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.limit" :page-sizes="[5, 10, 15]"
                :current-page.sync="listQuery.page" :total="list.total">
            </el-pagination>
        </div>
    </div>
</template>
<script lang="ts" setup >
import { ElMessage, ExpandTrigger } from 'element-plus';
import { requestGetUserList } from '@/api/user';
import _ from "lodash"
const { t } = useI18n()
const operates: Operate[] = [
    {
        label: "用户员工",
        value: "delUser"
    }
]
const operateType = ref("delUser")
const defaultListQuery: {
    limit: number,
    page: number,
    s_name?: string,
    s_level?: number
} = {
    limit: 5,
    page: 1,
    s_name: "",
    s_level: -1
}
const listQuery = ref<typeof defaultListQuery>(JSON.parse(JSON.stringify(defaultListQuery)))
const VIPOptions = [{ level: -1, name: 'ALL' }, { level: 0, name: 'VIP 0' }, { level: 1, name: 'VIP 1' }, { level: 2, name: 'VIP 2' }, { level: 3, name: 'VIP 3' }, { level: 4, name: 'VIP 4' }, { level: 5, name: 'VIP 5' }, { level: 6, name: 'VIP 6' }, { level: 7, name: 'VIP 7' }]

const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    pageSize: 0,
})
let multipleSelection: any[] = []
const router = useRouter()
const route = useRoute()

async function getUserList() {
    try {
        list.value.listLoading = true;
        // if (listQuery.value.s_level === -1) {
        //     listQuery.value = _.omit(listQuery.value, 's_level')
        // }
        const { data } = await requestGetUserList(listQuery.value)
        console.log("booklist", data);
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

function handleSelectionChange(val: any[]) {
    multipleSelection = val;
}

function handleResetSearch() {
    listQuery.value = defaultListQuery
}

function handleUpdate(index: number, row: any) {
    router.push({ path: "/product/updateBook", query: { id: row.id } })
}

function handleDelete(index: number, row: any) {
    // deleteBrand(row.id).then(response => {
    //     ElMessage({
    //         message: '删除成功',
    //         type: 'success',
    //         duration: 1000
    //     });
    //     getList();
    // });
    ElMessage({
        message: '删除成功',
        type: 'success',
        duration: 1000
    });
}

function handleSizeChange(val: number) {
    listQuery.value.page = 1;
    listQuery.value.limit = val;
    getUserList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getUserList();
}
function searchDepartments() {
    listQuery.value.page = 1;
    getUserList();
}
function handleBatchOperate() {
    console.log(multipleSelection);
    if (multipleSelection.length < 1) {
        ElMessage({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
        });
        return;
    }
    let showStatus = 0;
    if (operateType.value === 'showBrand') {
        showStatus = 1;
    } else if (operateType.value === 'hideBrand') {
        showStatus = 0;
    } else {
        ElMessage({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
        });
        return;
    }
    let ids = [];
    for (let i = 0; i < multipleSelection.length; i++) {
        ids.push(multipleSelection[i].id);
    }
    let data = new URLSearchParams();
    // data.append("ids", ids);
    // data.append("showStatus", showStatus);
    // updateShowStatus(data).then(response => {
    //     getList();
    //     ElMessage({
    //         message: '修改成功',
    //         type: 'success',
    //         duration: 1000
    //     });
    // });
}
function transformDate(row: any, column: any, cellValue: string, index: number) {
    return new Date(Number(cellValue) * 1000).toDateString()
}

getUserList()


</script>
<style scoped>
</style>