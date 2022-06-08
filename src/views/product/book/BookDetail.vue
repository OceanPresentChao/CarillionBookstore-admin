<template>
    <div>
        <el-card class="form-container" shadow="never">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="填写图书信息"></el-step>
                <el-step title="填写图书促销"></el-step>
            </el-steps>
            <book-info-detail v-show="showStatus[0]" v-model="bookParam" :is-edit="isEdit" @nextStep="nextStep">
            </book-info-detail>
            <book-sale-detail v-show="showStatus[1]" v-model="bookParam" :is-edit="isEdit" @prevStep="prevStep"
                @finishCommit="finishCommit(isEdit)">
            </book-sale-detail>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})
const route = useRoute()
const router = useRouter()
const defaultBookParam = {
    id: -1,
    pic: '',
    pressId: 0,
    categoryId: 0,
    isShow: true,
    desc: '',
    name: '',
    pubDate: '',
    version: 0,
    author: '',
    price: 0,
    page: 0,
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [],
    //商品满减
    productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }],
    //商品阶梯价格
    productLadderList: [{ count: 0, discount: 0, price: 0 }],
    promotionType: 0
}
const active = ref(0)
const bookParam = ref(JSON.parse(JSON.stringify(defaultBookParam)))
const showStatus = ref([true, false])

function hideAll() {
    for (let i = 0; i < showStatus.value.length; i++) {
        showStatus.value[i] = false;
    }
}
function prevStep() {
    if (active.value > 0 && active.value < showStatus.value.length) {
        active.value--;
        hideAll();
        showStatus.value[active.value] = true;
    }
}
function nextStep() {
    if (active.value < showStatus.value.length - 1) {
        active.value++;
        hideAll();
        showStatus.value[active.value] = true;
    }
}

function finishCommit(isEdit: boolean) {
    ElMessageBox.confirm('是否要提交该产品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        if (isEdit) {
            // updateProduct(route.query.id, productParam).then(response => {
            //     ElMessage({
            //         type: 'success',
            //         message: '提交成功',
            //         duration: 1000
            //     });
            //     router.back();
            // });
            ElMessage({
                type: 'success',
                message: '提交成功',
                duration: 1000
            });
            router.back();
        } else {
            // createProduct(productParam).then(response => {
            //     ElMessage({
            //         type: 'success',
            //         message: '提交成功',
            //         duration: 1000
            //     });
            //     location.reload();
            // });
            ElMessage({
                type: 'success',
                message: '提交成功',
                duration: 1000
            });
            location.reload();
        }
    })
}
</script>

<style scoped>
</style>