<script setup>
import { getCateCommoditiesApi, getCommodityByIdApi } from '~/api/commodify-api'
const currentCategoryId = ref(null) // 添加当前选中的分类ID
//獲取菜單
const { data: menu } =await useAsyncData('cateCommodities', async () => {
    const res = await getCateCommoditiesApi()
    return res.data.CATE || []
})
//在获取到 menu 后再设置默认值
if (menu.value && menu.value.length > 0) {
    currentCategoryId.value = menu.value[0].cid
}

// 使用 useAsyncData 获取商品，响应 currentCategoryId 变化
const { data: products, pending: productsLoading } = await useAsyncData(
    () => `category-products-${currentCategoryId.value}`, // 动态 key
    async () => {
        if (!currentCategoryId.value) return []
        const res = await getCommodityByIdApi(currentCategoryId.value)
        return res.data || []
    },
    {
        watch: [currentCategoryId], // 监听 currentCategoryId 变化
        default: () => []
    }
)

// 简化的切换分类函数
const getCateCommodities = (cateId) => {
    currentCategoryId.value = cateId
    // useAsyncData 会自动重新获取数据
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
            products.value.sort((a, b) => b.id - a.id)
            break
        case 'old':
            products.value.sort((a, b) => a.id - b.id)
            break
        case 'lowToHigh':
            products.value.sort((a, b) => a.currentPrice - b.currentPrice)
            break
        case 'highToLow':
            products.value.sort((a, b) => b.currentPrice - a.currentPrice)
            break
        default:
            // 默認排序，恢復原始順序
            products.value.sort((a, b) => a.id - b.id)
    }
}
</script>

<template>
    <div class="min-h-screen bg-[#1d1a1a]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between mb-10 text-white ">
                <div class="w-80 flex items-center gap-4">
                    <NuxtLink to="/products" class="font-bold text-2xl text-gray-500 ">全部商品</NuxtLink>
                    <span>></span>
                    <span v-for="item in menu" class="font-bold text-2xl cursor-pointer"
                        :class="item.cid === currentCategoryId ? 'text-[#ac886b]' : 'text-gray-500'"
                        :key="item.cid" @mouseover="getCateCommodities(item.cid)" @click="getCateCommodities(item.cid)">
                        {{ item.cate_name }}
                    </span>
                </div>
                <Select :selects="sortSeleteds" @update:selected="handleSort" />
            </div>
               <!-- 添加商品加载状态 -->
            <div v-if="productsLoading" class="text-white text-center py-8">
                正在加载商品...
            </div>
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <li v-for="product in products" :key="product.oig_id"
                    class="bg-[#1d1a1a] cursor-pointer rounded-lg overflow-hidden ">
                    <NuxtLink :to="`/products/${product.oig_id}`">
                        <div class="aspect-w-1 aspect-h-1">
                            <img :src="product.images" :alt="product.group_name" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4 text-center">
                            <h3 class="text-lg text-white font-bold mb-2">{{ product.group_name }}</h3>
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