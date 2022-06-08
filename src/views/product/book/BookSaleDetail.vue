<template>
    <div style="margin-top: 50px">
        <el-form :model="modelValue" ref="productSaleForm" label-width="120px">
            <el-form-item label="商品上架：">
                <el-switch v-model="modelValue.publishStatus" :active-value="1" :inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="选择优惠方式：">
                <el-radio-group v-model="modelValue.promotionType">
                    <el-radio-button :label="0">无优惠</el-radio-button>
                    <el-radio-button :label="1">会员价格</el-radio-button>
                    <el-radio-button :label="2">阶梯价格</el-radio-button>
                    <el-radio-button :label="3">满减价格</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="modelValue.promotionType === 1">
                <div v-for="(item, index) in modelValue.memberPriceList" :class="{ littleMargin: index !== 0 }">
                    {{ item.memberLevelName }}：
                    <el-input v-model="item.memberPrice" style="width: 200px"></el-input>
                </div>
            </el-form-item>
            <el-form-item v-show="modelValue.promotionType === 2">
                <el-table :data="modelValue.productLadderList" style="width: 80%" border>
                    <el-table-column label="数量" align="center" width="120">
                        <template #default="scope">
                            <el-input v-model="scope.row.count"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="折扣" align="center" width="120">
                        <template #default="scope">
                            <el-input v-model="scope.row.discount"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template #default="scope">
                            <el-button type="text" @click="handleRemoveProductLadder(scope.$index, scope.row)">删除
                            </el-button>
                            <el-button type="text" @click="handleAddProductLadder(scope.$index, scope.row)">添加
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item v-show="modelValue.promotionType === 3">
                <el-table :data="modelValue.productFullReductionList" style="width: 80%" border>
                    <el-table-column label="满" align="center" width="120">
                        <template #default="scope">
                            <el-input v-model="scope.row.fullPrice"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="立减" align="center" width="120">
                        <template #default="scope">
                            <el-input v-model="scope.row.reducePrice"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template #default="scope">
                            <el-button type="text" @click="handleRemoveFullReduction(scope.$index, scope.row)">删除
                            </el-button>
                            <el-button type="text" @click="handleAddFullReduction(scope.$index, scope.row)">添加
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button @click="handlePrev">上一步，填写商品信息</el-button>
                <el-button type="primary" @click="handleFinishCommit">完成，提交商品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>import { ElMessage } from 'element-plus';

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['prevStep', 'finishCommit'])

function handleRemoveProductLadder(index: number, row: any) {
    let productLadderList = props.modelValue.productLadderList;
    if (productLadderList.length === 1) {
        productLadderList.pop();
        productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
        })
    } else {
        productLadderList.splice(index, 1);
    }
}
function handleAddProductLadder(index: number, row: any) {
    let productLadderList = props.modelValue.productLadderList;
    if (productLadderList.length < 3) {
        productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
        })
    } else {
        ElMessage({
            message: '最多只能添加三条',
            type: 'warning'
        });
    }
}
function handleRemoveFullReduction(index: number, row: any) {
    let fullReductionList = props.modelValue.productFullReductionList;
    if (fullReductionList.length === 1) {
        fullReductionList.pop();
        fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
        });
    } else {
        fullReductionList.splice(index, 1);
    }
}
function handleAddFullReduction(index: number, row: any) {
    let fullReductionList = props.modelValue.productFullReductionList;
    if (fullReductionList.length < 3) {
        fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
        });
    } else {
        ElMessage({
            message: '最多只能添加三条',
            type: 'warning'
        });
    }
}
function handlePrev() {
    emits('prevStep')
}
function handleFinishCommit() {
    emits('finishCommit', props.isEdit);
}

if (props.isEdit) {
    // handleEditCreated();
} else {
    // fetchMemberLevelList({ defaultStatus: 0 }).then(response => {
    //     let memberPriceList = [];
    //     for (let i = 0; i < response.data.length; i++) {
    //         let item = response.data[i];
    //         memberPriceList.push({ memberLevelId: item.id, memberLevelName: item.name })
    //     }
    //     props.modelValue.memberPriceList = memberPriceList;
    // });
}

</script>

<style scoped>
.littleMargin {
    margin-top: 10px;
}
</style>