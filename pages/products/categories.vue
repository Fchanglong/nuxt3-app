<script setup>
import { onMounted, watch } from 'vue'
import { getCateCommoditiesMenuApi, getCommoditiesByIdApi } from '~/api/commodify-api'
const currentCategoryId = ref(null)
const menu = ref([])
const products = ref([])
const pending = ref(true)
import { useStore } from 'vuex'
const store = useStore()
// 切换分类函数
const getCateCommodities = (cateId) => {
    currentCategoryId.value = cateId
}
const sortSeleteds = ref([
    { id: 1, name: '商品排序', value: '' },
    { id: 2, name: '上架時間: 由新到舊', value: 'new' },
    { id: 3, name: '上架時間: 由舊到新', value: 'old' },
    { id: 4, name: '價格:由低到高', value: 'lowToHigh' },
    { id: 5, name: '價格:由高到低', value: 'highToLow' }
])


const handleSort = (value) => {
    switch (value.value) {
        case 'new':
            products.value.sort((a, b) => b.oig_id - a.oig_id)
            break
        case 'old':
            products.value.sort((a, b) => a.oig_id - b.oig_id)
            break
        case 'lowToHigh':
            products.value.sort((a, b) => parseFloat(a.price_min) - parseFloat(b.price_min))
            break
        case 'highToLow':
            products.value.sort((a, b) => parseFloat(b.price_min) - parseFloat(a.price_min))
            break
        default:
            products.value.sort((a, b) => a.oig_id - b.oig_id)
    }
}

const initData = async () => {
    const { data } = await getCateCommoditiesMenuApi()
    menu.value = data.CATE || []
    if (menu.value.length > 0) {
        currentCategoryId.value = menu.value[0].cid
        const res = await getCommoditiesByIdApi(currentCategoryId.value)
        products.value = res.data || []
    }
    pending.value = false
}
watch(currentCategoryId, async (newVal) => {
    if (newVal) {
        pending.value = true
        const res = await getCommoditiesByIdApi(newVal)
        products.value = res.data || []
        pending.value = false
    }
},)
onMounted(() => {
    initData()
})
</script>

<template>
    <div class="min-h-screen bg-[#1d1a1a]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between mb-10 text-white ">
                <div class="w-80 flex items-center gap-4">
                    <NuxtLink to="/products" class="font-bold text-sm md:text-2xl text-gray-500 ">全部商品</NuxtLink>
                    <span>></span>
                    <span v-for="item in menu" class="font-bold text-sm md:text-2xl cursor-pointer"
                        :class="item.cid === currentCategoryId ? 'text-[#ac886b]' : 'text-gray-500'" :key="item.cid"
                        @mouseover="getCateCommodities(item.cid)" @click="getCateCommodities(item.cid)">
                        {{ item.cate_name }}
                    </span>
                </div>
            </div>
            <div class="text-white w-[20%] mb-4">
                <Select :selects="sortSeleteds" @update:selected="handleSort" />
            </div>
            <!-- 添加商品加载状态 -->
            <div v-if="pending" class="text-white text-center py-8">
                正在加载商品...
            </div>
            <ul class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <li v-for="product in products" :key="product.oig_id"
                    class="bg-[#1d1a1a] cursor-pointer rounded-lg overflow-hidden ">
                    <NuxtLink :to="`/products/${product.oig_id}`">
                        <div class="aspect-square md:min-w-[294px]">
                            <img :src="product.images" :alt="product.group_name" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4 text-center">
                            <h3 class="text-lg text-white font-bold mb-2 truncate">{{ product.group_name }}</h3>
                            <p class="text-[#ac886b] font-bold mb-1">HK ${{ product.price_min }}</p>
                            <p class="text-gray-500 line-through">HK ${{ product.price_original_max }}</p>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>