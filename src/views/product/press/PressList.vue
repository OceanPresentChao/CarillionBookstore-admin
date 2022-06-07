<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList" type="primary" size="default">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="出版社名称/关键字"
                            @keydown.enter="searchBrandList"></el-input>
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

                    <el-table-column property="name" label="出版社名称" align="center" />

                    <el-table-column property="firstLetter" label="出版社首字母" width="100" align="center" />

                    <el-table-column label="是否显示" width="100" align="center">
                        <template #default="scope">
                            <el-switch @change="handleShowStatusChange(scope.$index, scope.row)" :active-value="1"
                                :inactive-value="0" v-model="scope.row.show">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="相关" width="220" align="center">
                        <template #default="scope">
                            <span>商品：</span>
                            <el-button type="primary" size="default" text @click="">
                                {{ scope.row.bookNum }}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
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
        <el-dialog :title="dialogProps.title" v-model="dialogProps.visible" :before-close="dialogProps.handleClose"
            width="30%" append-to-body>
            <el-form ref="pressFormRef" :model="dialogProps.pressProps" :rules="dialogProps.rules" label-width="120px">
                <el-form-item label="出版社名称" prop="name">
                    <el-input v-model="dialogProps.pressProps.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogProps.visible = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup >
import { ElMessage } from 'element-plus';
import { requestGetPressList } from '@/api/product';
const { t } = useI18n()
const operates: Operate[] = [
    {
        label: "显示品牌",
        value: "showBrand"
    },
    {
        label: "隐藏品牌",
        value: "hideBrand"
    }
]
const operateType = ref("showBrand")
const listQuery = ref({
    keyword: "",
    limit: 10,
    page: 1
})
const list = ref({
    listLoading: false,
    data: [],
    total: 0,
    totalPage: 0,
    pageSize: 0,
})
let multipleSelection: any[] = []
const pressFormRef = ref()
const dialogProps = ref({
    title: '',
    visible: false,
    rules: {
        name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
        ]
    },
    pressProps: {
        name: '',
        id: -1
    },
    handleClose(done: () => void) {
        if (!dialogProps.value.visible && pressFormRef.value) {
            pressFormRef.value.clearValidate()
        }
        done()
    },
    handleConfirm() {
        pressFormRef.value.validate((valid: boolean) => {
            if (valid) {
                let data = new URLSearchParams();
                data.append("name", dialogProps.value.pressProps.name);
                if (dialogProps.value.title === "添加类型") {
                    // createProductAttrCate(data).then(response => {
                    //     ElMessage({
                    //         message: '添加成功',
                    //         type: 'success',
                    //         duration: 1000
                    //     });
                    //     dialogProps.value.visible = false;
                    //     getList();
                    // });
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                        duration: 1000
                    });
                    dialogProps.value.visible = false;
                } else {
                    // updateProductAttrCate(dialogProps.value.pressProps.id, data).then(response => {
                    //     ElMessage({
                    //         message: '修改成功',
                    //         type: 'success',
                    //         duration: 1000
                    //     });
                    //     dialogProps.value.visible = false;
                    //     getList();
                    // });
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    });
                    dialogProps.value.visible = false;
                }
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
})
getList()


async function getList() {
    try {
        list.value.listLoading = true;
        const { data } = await requestGetPressList(listQuery.value)
        console.log(data);
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

function handleUpdate(index: number, row: any) {
    dialogProps.value.visible = true;
    dialogProps.value.title = "编辑类型";
    dialogProps.value.pressProps.name = row.name;
    dialogProps.value.pressProps.id = row.id;
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
    getList();
}
function handleCurrentChange(val: number) {
    listQuery.value.page = val;
    getList();
}
function searchBrandList() {
    listQuery.value.page = 1;
    getList();
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

</script>
<style scoped>
</style>