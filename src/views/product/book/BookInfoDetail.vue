<template>
    <div style="margin-top: 50px">
        <el-form :model="modelValue" :rules="rules" ref="bookInfoForm" label-width="auto">
            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="modelValue.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类：" prop="productCategoryId">
                <el-select v-model="modelValue.categoryId" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="图书作者：">
                <el-input :autoSize="true" v-model="modelValue.desc" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="图书出版社：" prop="brandId">
                <el-select v-model="modelValue.brandId" placeholder="请选择品牌">
                    <el-option v-for="item in pressOptions" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书简介：">
                <el-input :autoSize="true" v-model="modelValue.description" type="textarea" placeholder="请输入内容">
                </el-input>
            </el-form-item>
            <el-form-item label="图书出版日期：">
                <el-date-picker v-model="modelValue.pubDate" type="date" placeholder="Pick a day" size="default" />
            </el-form-item>
            <el-form-item label="图书版本：">
                <el-input v-model="modelValue.price"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="modelValue.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存：">
                <el-input v-model="modelValue.stock"></el-input>
            </el-form-item>
            <el-form-item label="属性图片：">
                <el-card shadow="never" class="cardBg">
                    <single-upload v-model="modelValue.pic"
                        style="width: 300px;display: inline-block;margin-left: 10px">
                    </single-upload>
                </el-card>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" @click="handleNext()">下一步，填写商品促销</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { requestGetBookCategories } from '@/api/product'
import { ElMessage } from 'element-plus';

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

const emits = defineEmits(['nextStep'])

let hasEditCreated = false
//选中商品分类的值
const bookInfoForm = ref()
const categoryOptions = ref<any[]>([])
const pressOptions = ref<any[]>([])
const rules = {
    name: [
        { required: true, message: '请输入图书名称', trigger: 'blur' },
        { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
    ],
    productCategoryId: [{ required: true, message: '请选择图书分类', trigger: 'blur' }],
    brandId: [{ required: true, message: '请选择图书出版社', trigger: 'blur' }],
    description: [{ required: true, message: '请输入图书介绍', trigger: 'blur' }],
    requiredProp: [{ required: true, message: '该项为必填项', trigger: 'blur' }]
}



const productId = computed(() => props.modelValue.id)

watch(productId, (newValue, oldValue) => {
    if (!props.isEdit || hasEditCreated || newValue < 0) return;
    handleEditCreated();
})

//处理编辑逻辑
function handleEditCreated() {
    hasEditCreated = true;
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

async function getPressList() {
    try {
        const { data } = await requestGetBookCategories()
        pressOptions.value = data.record
        console.log("category", data);
    } catch (error) {
        ElMessage({
            type: "error",
            message: String(error)
        })
    }
}

function handleNext() {
    bookInfoForm.value.validate((valid: boolean) => {
        if (valid) {
            emits('nextStep')
        } else {
            ElMessage({
                message: '验证失败',
                type: 'error',
                duration: 1000
            });
            return false;
        }
    });
}


getCategories()
getPressList()
</script>

<style scoped>
</style>