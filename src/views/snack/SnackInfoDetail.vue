<template>
    <div style="margin-top: 50px">
        <el-form :model="foodParam" ref="foodInfoForm" label-width="auto" status-icon>
            <el-form-item label="小吃名称：" prop="requiredProp">
                <el-input v-model="foodParam.name">
                </el-input>
            </el-form-item>
            <el-form-item label="小吃分类：">
                <el-select v-model="foodParam.type" placeholder="请选择小吃分类">
                    <el-option v-for="item in optionStore.foodCategoryOptions" :key="item.id" :label="item.title"
                        :value="item.title">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小吃价格：">
                <el-input-number :step="1" :min="1" v-model="foodParam.price" placeholder="请输入价格"></el-input-number>
            </el-form-item>

            <el-form-item label="小吃简介：">
                <el-input :autoSize="true" v-model="foodParam.memo" type="textarea" placeholder="请输入内容">
                </el-input>
            </el-form-item>

            <el-form-item label="属性图片：" class="pb-4" v-if="isEdit">
                <single-upload style="display: inline-block;margin-left: 10px" :actionURL="ACTION_URL" :actionData="{}">
                </single-upload>
            </el-form-item>
            <div class="text-center">
                <el-button type="primary" @click="handleCommit(isEdit)">完成，提交小吃</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { requestCreateFood, requestGetFoodList, requestUpdateFood } from '@/api/food';
import { useOptionStore } from '@/store/option';
import { ElMessage, ElMessageBox } from 'element-plus';
import _ from 'lodash';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})
const optionStore = useOptionStore()
const route = useRoute()
const router = useRouter()
const ACTION_URL = 'http://dev.api.yurzi.top:11451/v1/book/avatar/'
const defaultFoodParam = {
    id: -1,
    type: '',
    memo: '',
    name: '',
    price: 0,
    dealamount: 0,
}
const foodParam = ref<typeof defaultFoodParam>(JSON.parse(JSON.stringify(defaultFoodParam)))

//选中商品分类的值
const foodInfoForm = ref()

function handleCommit(isEdit: boolean) {
    ElMessageBox.confirm('是否要提交该小吃', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        let code = 0
        let message = ''
        if (isEdit) {
            const { data } = await requestUpdateFood(foodParam.value)
            code = data.code
            message = data.message
        } else {
            const { data } = await requestCreateFood(foodParam.value)
            code = data.code
            message = data.message
        }
        if (code >= 200 && code < 300) {
            ElMessage({
                type: 'success',
                message: message,
                duration: 1000
            });
            location.reload();
        } else {
            ElMessage({
                type: 'error',
                message: message,
                duration: 1000
            });
        }
        router.back()
    })
}

async function initFoodInfo() {
    if (props.isEdit) {
        const foodId = Number(route.query.id)
        if (foodId) {
            const { data } = await requestGetFoodList()
            const bookData = data.list as Array<any>
            bookData.forEach((v) => {
                if (v.food_id === foodId) {
                    foodParam.value.id = v.food_id
                    foodParam.value.dealamount = v.food_dealamount
                    foodParam.value.memo = v.food_memo
                    foodParam.value.name = v.food_name
                    foodParam.value.price = v.food_price
                    foodParam.value.type = v.food_type
                }
            })
        }
    }
}

optionStore.getFoodCategoryOptions()
initFoodInfo()


</script>

<style scoped>
</style>