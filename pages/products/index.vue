<script setup>
import { getAllCommoditiesApi } from '~/api/commodify-api'
import { useStore } from 'vuex'
const store = useStore()
const products = ref([])
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
onMounted(async () => {
    const res = await getAllCommoditiesApi()
    products.value = res.data || []
})
const { data: seoData } = await useAsyncData('commodity-seo', async () => {
  return store.getters['website/getWebsiteSeo']
})

useHead({
  title: seoData.value.commodity_title,
  meta: [
    {
      name: 'description',
      content: seoData.value.commodity_description
    }
  ],
})
</script>

<template>
    <div class="min-h-screen bg-[#1d1a1a]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex justify-between mb-10 text-white ">
                <span class="font-bold text-2xl">全部商品</span>
            </div>
             <div class="text-white w-[20%] mb-4" > 
                <Select :selects="sortSeleteds" @update:selected="handleSort" />
            </div>
            <ul class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <li v-for="product in products" :key="product.oig_id"
                    class="bg-[#1d1a1a] cursor-pointer rounded-lg overflow-hidden ">
                    <NuxtLink :to="`/products/${product.oig_id}`">
                        <div class="md:min-w-[300px] md:min-h-[300px] ">
                            <img :src="product.images" :alt="product.group_name" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4 text-center">
                            <h3 class="text-lg text-white font-bold mb-2 truncate">{{ product.group_name }}</h3>
                            <p class="text-[#ac886b] font-bold mb-1">${{ Number(product.price_min).toLocaleString() }}</p>
                            <p class="text-gray-500 line-through">${{ Number(product.price_original_max).toLocaleString() }}</p>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
