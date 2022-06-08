<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList" type="primary" size="default">
                    查询结果
                </el-button>
                <el-button style="float: right;margin-right: 15px" @click="handleResetSearch()" size="default">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.s_name" placeholder="商品名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图书分类：">
                        <el-select v-model="listQuery.s_categoryIds" multiple placeholder="Select" style="width: 240px">
                            <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图书出版社：">
                        <el-input style="width: 203px" v-model="listQuery.s_pressName" placeholder="出版社名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上架状态：">
                        <el-select v-model="listQuery.s_status" placeholder="全部" clearable>
                            <el-option v-for="item in publishStatusOptions" :key="item.value" :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
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
                    <el-table-column property="id" label="编号" width="100" align="center" />
                    <el-table-column label="商品图片" align="center">
                        <template #default="scope">
                            <img style="height: 100px;width:auto;
                            display: inline-block;align-self: center;" :src="scope.row.pic">
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="图书名称" align="center" width="180" />
                    <el-table-column property="pressName" label="出版社" width="160" align="center" />
                    <el-table-column property="price" label="价格" width="110" align="center" />
                    <el-table-column label="上架" width="120" align="center">
                        <template #default="scope">
                            <el-switch @change="handleShowStatusChange(scope.$index, scope.row)" :active-value="1"
                                :inactive-value="0" v-model="scope.row.isShow">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column property="dealmount" label="销量" width="110" align="center" />
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
import { requestGetBookCategories, requestGetBookList } from '@/api/product';
const { t } = useI18n()
const operates: Operate[] = [
    {
        label: "上架图书",
        value: "showBook"
    },
    {
        label: "下架图书",
        value: "hideBook"
    },
    {
        label: "删除图书",
        value: "delBook"
    }
]
const operateType = ref("showBook")
const defaultListQuery = {
    s_name: "",
    limit: 5,
    page: 1,
    s_categoryIds: [] as any[],
    s_pressName: '',
    s_status: 0,
};
const listQuery = ref({
    s_name: "",
    limit: 5,
    page: 1,
    s_categoryIds: [] as any[],
    s_pressName: '',
    s_status: 0,
})
const categoryOptions = ref<any[]>([])
const publishStatusOptions = ref<any[]>([])
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

async function getBookList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetBookList(listQuery.value)
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

async function getCategories() {
    try {
        const { data } = await requestGetBookCategories()
        categoryOptions.value = data.record
        console.log("category", data);
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
    listQuery.value.s_categoryIds = []
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

function handleShowStatusChange(index: number, row: any) {
    let data = new URLSearchParams();
    ;
    data.append("ids", row.id);
    data.append("showStatus", row.showStatus);
    // updateShowStatus(data).then(response => {
    //     ElMessage({
    //         message: '修改成功',
    //         type: 'success',
    //         duration: 1000
    //     });
    // }).catch(error => {
    //     if (row.showStatus === 0) {
    //         row.showStatus = 1;
    //     } else {
    //         row.showStatus = 0;
    //     }
    // });
    // ElMessage({
    //     message: '修改成功',
    //     type: 'success',
    //     duration: 1000
    // });
}
function handleSizeChange(val: number) {
    listQuery.value.page = 1;
    listQuery.value.limit = val;
    getBookList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getBookList();
}
function searchBrandList() {
    listQuery.value.page = 1;
    getBookList();
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

if (route.query.s_pressName) {
    listQuery.value.s_pressName = String(route.query.s_pressName)
}
getBookList()
getCategories()


</script>
<style scoped>
</style>