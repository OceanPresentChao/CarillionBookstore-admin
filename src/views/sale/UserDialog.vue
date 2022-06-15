<template>
    <div>
        <el-dialog v-model="isShow" title="编辑用户" destroy-on-close :show-close="false" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form :model="modelValue" label-width="120px" :rules="formRules" ref="formRef" append-to-body>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="modelValue.name" placeholder="请输入用户名" :suffix-icon="renderIcon('carbon:user')"
                        :disabled="isEdit" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="modelValue.password" type="password" placeholder="请输入密码" show-password
                        :suffix-icon="renderIcon('carbon:password')" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="modelValue.email" placeholder="请输入邮箱" :suffix-icon="renderIcon('ci:mail')" />
                </el-form-item>
                <el-form-item label="生日" prop="birthday" v-if="isEdit">
                    <el-date-picker v-model="modelValue.birthday" type="date" placeholder="请选择生日" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" :suffix-icon="renderIcon('cil:birthday-cake')" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="$emit('cancel')">取消</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { renderIcon } from "@/utils/tool"
const formRules = {
    name: {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    },
    email: {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
    }
}
const props = defineProps({
    isEdit: {
        type: Boolean,
        required: true
    },
    isShow: {
        type: Boolean,
        required: true
    },
    modelValue: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['cancel', 'submit'])

const formRef = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            emits('submit')
        } else {

        }
    })
}

</script>

<style scoped>
</style>