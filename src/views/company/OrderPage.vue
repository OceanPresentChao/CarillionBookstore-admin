<template>
    <div>
        <div v-if="typeId === 1" class="mt-5">
            <el-descriptions title="Vip充值订单" :column="2" border>
                <template #extra>
                    <el-button type="primary" @click="router.back()">返回</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            Vip名称
                        </div>
                    </template>
                    {{ order.vip_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单状态
                        </div>
                    </template>
                    <el-tag size="small"> {{ order.status }}</el-tag>

                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单总金额
                        </div>
                    </template>
                    {{ order.total_price }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单实付金额
                        </div>
                    </template>
                    {{ order.pay_price }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单日期
                        </div>
                    </template>
                    {{ order.date }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div v-if="typeId === 2">
            <el-descriptions title="图书订单" :column="2" border>
                <template #extra>
                    <el-button type="success" @click="router.back()">返回</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            Vip名称
                        </div>
                    </template>
                    {{ order.vip_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单状态
                        </div>
                    </template>
                    <el-tag size="small"> {{ order.status }}</el-tag>
                </el-descriptions-item>
                <template v-for="item in order.order_items">
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                图书名称
                            </div>
                        </template>
                        {{ item.book_name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                图书数量
                            </div>
                        </template>
                        {{ item.amount }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                总金额
                            </div>
                        </template>
                        {{ item.total_price }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                实付金额
                            </div>
                        </template>
                        {{ item.pay_price }}
                    </el-descriptions-item>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单总金额
                        </div>
                    </template>
                    {{ order.total_price }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单实付金额
                        </div>
                    </template>
                    {{ order.pay_price }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单备注
                        </div>
                    </template>
                    {{ order.memo }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单日期
                        </div>
                    </template>
                    {{ order.date }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div v-if="typeId === 3">
            <el-descriptions title="食品订单" :column="2" border>
                <template #extra>
                    <el-button type="danger" @click="router.back()">返回</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            Vip名称
                        </div>
                    </template>
                    {{ order.vip_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单状态
                        </div>
                    </template>
                    <el-tag size="small"> {{ order.status }}</el-tag>
                </el-descriptions-item>
                <template v-for="item in order.order_items">
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                小吃名称
                            </div>
                        </template>
                        {{ item.food_name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                小吃数量
                            </div>
                        </template>
                        {{ item.amount }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                总金额
                            </div>
                        </template>
                        {{ item.total_price }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                实付金额
                            </div>
                        </template>
                        {{ item.pay_price }}
                    </el-descriptions-item>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单总金额
                        </div>
                    </template>
                    {{ order.total_price }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单实付金额
                        </div>
                    </template>
                    {{ order.pay_price }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单备注
                        </div>
                    </template>
                    {{ order.memo }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单日期
                        </div>
                    </template>
                    {{ order.date }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div v-if="typeId === 4">
            <el-descriptions title="薪水订单" :column="2" border>
                <template #extra>
                    <el-button type="warning" @click="router.back()">返回</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            员工名称
                        </div>
                    </template>
                    {{ order.staff_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            订单状态
                        </div>
                    </template>
                    <el-tag size="small"> {{ order.status }}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            发放金额
                        </div>
                    </template>
                    {{ order.amount }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>
                        <div class="cell-item">
                            订单日期
                        </div>
                    </template>
                    {{ order.date }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup lang="ts">
import { requestGetBookOrder, requestGetVipOrder, requestGetSalaryOrder, requestGetFoodOrder } from '@/api/company';
import { ElMessage } from 'element-plus';
const router = useRouter()
const route = useRoute()
const orderId = Number(route.query.orderId) || 0
const typeId = Number(route.query.typeId) || 0
const order = ref<Record<string, any>>({})
async function getOrder() {
    if (!typeId) return
    const helper = (type: number, order: number) => {
        if (type === 1) {
            return requestGetVipOrder({ order_id: order })
        } else if (type === 2) {
            return requestGetBookOrder({ order_id: order })
        } else if (type === 3) {
            return requestGetFoodOrder({ order_id: order })
        } else if (type === 4) {
            return requestGetSalaryOrder({ order_id: order })
        }
    }
    const { data } = await helper(typeId, orderId)!
    if (data.code >= 200 && data.code < 300) {
        order.value = data.order
    } else {
        ElMessage({
            type: 'error',
            message: data.message,
        })
    }
}

getOrder()
</script>

<style scoped>
</style>