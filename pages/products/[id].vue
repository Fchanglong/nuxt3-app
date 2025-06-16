<script setup>
import { useStore } from 'vuex'
import { getCommodityByIdApi, getCommoditySelectInfoApi } from "~/api/commodify-api";
const route = useRoute()
const id = String(route.params.id).trim()
const count = ref(1)
// 使用購物車 store
const store = useStore()
const productData = ref({})
const selectedItemInfo = ref({})
const selectedItem = ref(null)
const selectedImage = ref('')
const activeTab = ref('商品描述')
const tabs = [
    { name: '商品描述', key: 'desImg' },
    { name: '了解更多', key: 'knowMore' },
    { name: '送貨及付款方式', key: 'deliverAndPay' },
]
const getcommoditySelectInfo = async (itemid) => {
    if (!itemid) return // 添加安全檢查
    const res = await getCommoditySelectInfoApi(itemid)
    selectedItemInfo.value = res.data || {}
}

onMounted(async () => {
    const res = await getCommodityByIdApi(id)
    productData.value = res.data || {}
    
    // 確保 productData 有數據且 items 存在後再調用
    if (productData.value?.items?.length > 0) {
        selectedItem.value = productData.value.items[0]
        await getcommoditySelectInfo(selectedItem.value.itemid)
    }
})
watch(productData, (newData) => {
    if (newData && newData.items && newData.items.length > 0) {
        // 只在 selectedItem 还没有值时设置默认值
        if (!selectedItem.value) {
            selectedItem.value = newData.items[0]
        }
        // 只在 selectedImage 还没有值时设置默认值
        if (!selectedImage.value && newData.images) {
            selectedImage.value = newData.images
        }
    }
}, { immediate: true, deep: true })

// 处理规格选择
const handleItemChange = (item) => {
    selectedItem.value = item
    selectedImage.value = item.display_img_small
}

const handleImageChange = (image) => {
    selectedImage.value = image
}
// 获取所有描述图片/視頻
const getDescImgAndVideo = computed(() => {
    if (!productData.value?.info?.desc) return []
    return productData.value.info.desc

})

//獲取商品了結更多
const getNoticeInfo = computed(() => {
    if (!productData.value?.notice) return []
    return productData.value.notice
})

//獲取商品配送方式
const getDeliverAndPayInfo = computed(() => {
    if (!productData.value?.info) return []
    return productData.value.info.delivery
})
// 添加到購物車的函數
const addToCart = async () => {
 const subArr = selectedItemInfo.value.sub?.map(subItem => ({
        item: subItem.isubid,
        num: count.value * (parseInt(selectedItemInfo.value.num) || 0)
    })) || []
    
    const subFreeArr = selectedItemInfo.value.sub_free?.map(subItem => ({
        item: subItem.isubid,
        num: count.value * (parseInt(selectedItemInfo.value.num_free) || 0)
    })) || []
    
    subArr.push(...subFreeArr)
    const product = {
        action: 'UPDATE',
        id: selectedItem.value.itemid,
        quantity: count.value,
        param: subArr,
        type: 'NOR'
    }
    try {
        const result = await store.dispatch('cart/addToCart', product)
        alert(result.message)
    } catch (error) {
        console.error('添加購物車失敗:', error)
    }
}
const handleCountChange = (action) => {
    if (action === 'add') {
        count.value += 1

    } else if (action === 'reduce' && count.value > 1) {
        count.value -= 1
    }
}
// 添加 YouTube URL 转换函数
const convertToEmbedUrl = (desc) => {
    if (!desc || desc.content_type !== 'YOUTUBE') return desc

    // 检查是否为 YouTube 链接
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = desc.content.match(youtubeRegex)

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
    }
    return desc.content
}

</script>
<template>
    <div class="p-10 w-full flex flex-col items-center">
        <div class=" w-full md:w-[1100px] md:flex ">
            <div class="flex gap-4">
                <!-- 缩略图列表 -->
                <div class="w-[120px] flex flex-col gap-2">
                    <img class="w-full object-cover cursor-pointer rounded-md border-2 transition-all duration-200 hover:scale-105"
                        :class="{
                            'border-[#ac886b] shadow-md': image === selectedImage,
                            'border-gray-300 hover:border-[#ac886b]': image !== selectedImage
                        }" v-for="image in productData.items" :key="image" :src="image.display_img_small"
                        @click="handleImageChange(image)" alt="产品缩略图">
                </div>
                <!-- 放大镜组件 -->
                <ImageZoom :image-src="selectedImage" container-width="100%" container-height="425px" zoom-scale="150"
                    :transition-duration="200" :show-indicator="true" :indicator-size="100" />
            </div>
            <!-- 右邊部分 -->
            <div class="text-white flex flex-col md:w-[400px] ml-5 gap-4">
                <span class="text-3xl font-bold">
                    {{ productData?.group_name || productData?.name }}
                </span>
                <span class="text-sm">
                    {{ productData?.content }}
                </span>
                <hr>

                <div>
                    <span class="text-2xl font-bold text-[#ac886b] mr-3">
                        HK${{ selectedItem?.price }}
                    </span>
                    <span class="text-gray-600 line-through">
                        HK${{ selectedItem?.price_original }}
                    </span>
                </div>
                <!-- 規格選擇 -->
                <div>
                    <span class="text-gray-500 text-sm font-semibold">
                        规格: {{ selectedItem?.name }}
                    </span>
                    <div class="flex gap-3 w-10">
                        <img class="border-[2px]  rounded-md cursor-pointer "
                            :class="{ 'border-[#ac886b]': selectedImage === item.display_img_small }"
                            v-for="item in productData?.items" :key="item.itemid" :src="item.display_img_small"
                            @click="handleItemChange(item)" alt="">
                    </div>
                </div>

                <div class="text-3xl flex justify-center items-center gap-8 ">
                    <button @click="handleCountChange('reduce')" class="cursor-pointer">-</button>
                    <span class="text-xl">{{ count }}</span>
                    <button @click="handleCountChange('add')" class="cursor-pointer">+</button>
                </div>

                <!-- 購買按鈕 -->
                <div class="text-white font-medium text-xl flex gap-5">
                    <button @click="addToCart" class="px-10 py-2.5 bg-[#ac886b]">加入購物車</button>
                    <NuxtLink to="/cart" class="px-10 py-2.5 bg-[#FD7812]">立即購買</NuxtLink>
                </div>
            </div>
        </div>

        <!-- 下面商品其他描述部分 -->
        <div class="w-full mt-14">
            <div class="md:text-xl font-bold text-gray-400 flex justify-between md:px-32">
                <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.name"
                    :class="{ 'text-[#ac886b]': activeTab === tab.name }">
                    {{ tab.name }}
                </button>
            </div>
            <div class="mt-8">
                <div v-if="activeTab === '商品描述'" class="flex flex-col items-center gap-4">
                    <div v-for="item in getDescImgAndVideo"
                        class="flex flex-col items-center mx-auto my-0  w-full md:w-[800px]">
                        <img v-if="item.content_type === 'IMAGE'" :key="item" :src="item.content" alt="商品描述圖片"
                            class="w-full h-auto object-cover rounded-md">
                        <iframe v-else-if="item.content_type === 'YOUTUBE'"
                            class="w-full md:w-[1100px] h-auto  md:h-[562px]" :src="convertToEmbedUrl(item)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                        <p v-else class="text-white  text-2xl">{{ item.content }}</p>
                    </div>
                </div>
                <div v-if="activeTab === '了解更多'">
                    <p v-for="item in getNoticeInfo" class="text-white text-lg leading-relaxed">
                        {{ item.content }}
                    </p>
                </div>
                <div v-if="activeTab === '送貨及付款方式'">
                    <div class="text-white flex justify-center px-10">
                        <p v-for="item in getDeliverAndPayInfo" class="mb-4">{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 相關商品 -->
        <!-- <div class="w-full mt-14 text-center">
            <h2 class="text-white text-3xl mb-8">相關商品</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <li v-for="product in productInfo.aboutProducts" :key="product.id"
                    class="bg-[#1d1a1a] cursor-pointer rounded-lg overflow-hidden  ">
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
        </div> -->
    </div>
</template>