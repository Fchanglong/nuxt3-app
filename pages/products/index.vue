<script setup>
const products = ref([
    {
        id: 1,
        name: '替換布套  (Joy Pro 智慧按摩椅墊 適用)',
        ogPrice: 29900,
        currentPrice: 19900,
        imageUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67ebaf31425acc000b9ea2e6/375x.webp?source_format=jpg'
    },
    {
        id: 2,
        name: 'JOY PRO 智慧按摩椅墊',
        ogPrice: 29900,
        currentPrice: 19900,
        imageUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65ba17658a9cfc0023808085/375x.webp?source_format=jpg'
    },
    {
        id: 3,
        name: 'Joy 智慧按摩椅墊',
        ogPrice: 29900,
        currentPrice: 19900,
        imageUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6323096f9514ce4eec4c1308/375x.webp?source_format=jpg'
    },
    {
        id: 4,
        name: 'Joy / Joy Pro 全布套更換(含服務)',
        ogPrice: 29900,
        currentPrice: 19900,
        imageUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/623d50d02e35be002dccff6b/375x.webp?source_format=jpg'
    },

])

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
                <span class="font-bold text-2xl">精選商品</span>
                <Select :selects="sortSeleteds" @update:selected="handleSort" />
            </div>
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <li v-for="product in products" :key="product.id"
                    class="bg-[#1d1a1a] cursor-pointer rounded-lg overflow-hidden ">
                    <NuxtLink :to="`/products/${product.id}`">
                        <div class="aspect-w-1 aspect-h-1">
                            <img :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4 text-center">
                            <h3 class="text-lg text-white font-bold mb-2">{{ product.name }}</h3>
                            <p class="text-[#ac886b] font-bold mb-1">HK ${{ product.currentPrice }}</p>
                            <p class="text-gray-500 line-through">HK ${{ product.ogPrice }}</p>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.aspect-w-1 {
    position: relative;
    padding-bottom: 100%;
}

.aspect-h-1 img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>