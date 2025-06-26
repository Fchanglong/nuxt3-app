<script setup>
import { useStore } from 'vuex'
import { getOrderDetailApi, getOrderNumByPhoneApi } from '~/api/order-api'
import { toast } from 'vue-sonner'
const store = useStore()
const router = useRouter()
const orderNumText = ref('')
const phone = ref('')
const getOrderDetail = async () => {
    if (!orderNumText.value) {
        toast.error('請輸入訂單號')
        return
    }
    try {
        const { data } = await getOrderDetailApi(orderNumText.value)
        router.push(`/order/${data[0].order.order_num}`)
    } catch (error) {
        toast.error(`訂單查詢失敗：沒有找到訂單號 ${orderNumText.value}`)
    }
}
const getOrderNumByPhone = async () => {
    if (!phone.value) {
        toast.error('請輸入手機號')
        return
    }
    try {
        const { data } = await getOrderNumByPhoneApi(phone.value)
        router.push(`/order/${data[0].order.order_num}`)
    } catch (error) {
        toast.error(`查詢失敗：沒有找到手機號 ${phone.value} 的訂單`)
    }

}
const { data: seoData } = await useAsyncData('check_order-seo', async () => {
  return store.getters['website/getWebsiteSeo']
})

useHead({
  title: seoData.value.check_title,
  meta: [
    {
      name: 'description',
      content: seoData.value.check_description
    }
  ],
})
</script>
<template>
    <div class="w-full bg-white flex flex-col items-center p-20 gap-10">
        <!-- 訂單查詢 -->
        <div class="w-full border rounded-sm">
            <h1 class="bg-[#ac886b] text-white text-center text-xl p-4">訂單詳情</h1>
            <div class="p-10 flex gap-6 items-start justify-center">
                <input type="text" v-model="orderNumText" placeholder="請輸入訂單號"
                    class="flex-1 border-2 p-2 w-full mb-4 h-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                <button @click="getOrderDetail" class="bg-[#ac886b] text-white py-2 px-4 h-full rounded-sm">查詢</button>
            </div>
        </div>
        <!-- 電話號查詢 -->
        <div class="w-full border rounded-sm">
            <h1 class="bg-[#ac886b] text-white text-center text-xl p-4">手機號查詢訂單號</h1>
            <div class="p-10 flex gap-6 items-start justify-center">
                <input type="text" v-model="phone" placeholder="請輸入電話號"
                    class="flex-1 border-2 p-2 w-full mb-4 h-full focus:outline-none focus:border-gray-900 transition-colors duration-200 ease-in" />
                <button @click="getOrderNumByPhone"
                    class="bg-[#ac886b] text-white py-2 px-4 h-full rounded-sm">查詢</button>
            </div>
        </div>
    </div>
</template>