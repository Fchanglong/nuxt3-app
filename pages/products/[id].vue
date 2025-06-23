<script setup>
import { useStore } from 'vuex'
import { toast } from 'vue-sonner'
import { getCommodityByIdApi, getCommoditySelectedSubApi } from "~/api/commodify-api";
const route = useRoute()
const router = useRouter()
const id = String(route.params.id).trim()
const count = ref(1)
// 使用購物車 store
const store = useStore()
const productData = ref({})
const selectedSub = ref({ sub: [], num: 0, sub_free: [], num_free: 0 })
const selectedItem = ref(null)
const selectedImage = ref('')
const activeTab = ref('商品描述')
const isVisible = ref(false)
const tabs = [
    { name: '商品描述', key: 'desImg' },
    { name: '了解更多', key: 'knowMore' },
    { name: '送貨及付款方式', key: 'deliverAndPay' },
]
//獲取選擇商品的子商品
const getcommoditySelectedSub = async (itemid) => {
    if (!itemid) return
    try {
        const res = await getCommoditySelectedSubApi(itemid)
        // 確保數據結構完整
        selectedSub.value = {
            sub: res.data?.sub || [],
            num: res.data?.num || 0,
            sub_free: res.data?.sub_free || [],
            num_free: res.data?.num_free || 0
        }
    } catch (error) {
        console.error('獲取子商品失敗:', error)
        // 設置默認值
        selectedSub.value = { sub: [], num: 0, sub_free: [], num_free: 0 }
    }
}

onMounted(async () => {
    const res = await getCommodityByIdApi(id)
    productData.value = res.data || {}

    // 確保 productData 有數據且 items 存在後再調用
    if (productData.value?.items?.length > 0) {
        selectedItem.value = productData.value.items[0]
        await getcommoditySelectedSub(selectedItem.value.itemid)
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
            selectedImage.value = newData.items[0].display_img_small
        }
    }
}, { immediate: true, deep: true })

// 处理规格选择
const handleItemChange = async (item) => {
    await getcommoditySelectedSub(item.itemid)
    selectedItem.value = item
    selectedImage.value = item.display_img_small
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
const addToCart = async (selectedItems = []) => {
    //判斷是否選擇了子商品
    const product = {
        action: 'UPDATE',
        id: selectedItem.value.itemid,
        quantity: count.value,
        param: selectedItems,
        type: 'NOR'
    }
    try {
        const result = await store.dispatch('cart/addToCart', product)
        // 添加成功后关闭模态框
        closeModal()
    } catch (error) {
        console.error('添加購物車失敗:', error)
    }
}
const handleCountChange = (action) => {
    if (action === 'add') {
        count.value += 1
        // selectedSub.value.num=selectedSub.value.num * count.value
    } else if (action === 'reduce' && count.value > 1) {
        count.value -= 1
    }
}
// YouTube URL 转换
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
// 千分號價格格式化
const formatPrice = (price) => {
    if (!price) return ''
    return Number(price).toLocaleString()
}
const closeModal = () => {
    isVisible.value = false
}
const openModal = () => {
    isVisible.value = true
}
// 共用的加入購物車邏輯
const processAddToCart = async (options = { redirectToCart: false, showToast: false }) => {
    // 如果子商品數量大於1，顯示選擇模態框
    if (selectedSub.value.sub.length > 1) {
        isVisible.value = true
        return
    }
    const selectedItems = [
        ...selectedSub.value.sub.map(item => ({
            item: item.isubid,
            num: selectedSub.value.num
        })),
        ...selectedSub.value.sub_free.map(item => ({
            item: item.isubid,
            num: selectedSub.value.num_free
        }))
    ]

    await addToCart(selectedItems)

    if (options.showToast) {
        toast.success('添加成功')
    }

    if (options.redirectToCart) {
        router.push('/cart')
    }
}

// 點擊加入購物車
const handleAddToCart = () => {
    processAddToCart({ showToast: true })
}

// 點擊立即購買
const handleToCart = () => {
    processAddToCart({ redirectToCart: true })
}

</script>
<template>
    <div class="p-10 w-full flex flex-col items-center">
        <div class="w-full md:w-[1100px] md:flex-row flex flex-col gap-3 ">
            <div class="flex gap-4">
                <!-- 缩略图列表 -->
                <div class="hidden md:flex w-[120px] flex-col gap-2">
                    <img class="w-full object-cover cursor-pointer rounded-md border-2 transition-all duration-200 hover:scale-105"
                        :class="{
                            'border-[#ac886b] shadow-md': item.display_img_small === selectedImage,
                            'border-gray-300 hover:border-[#ac886b]': item.display_img_small !== selectedImage
                        }" v-for="item in productData.items" :key="item.name" :src="item.display_img_small"
                        @click="handleItemChange(item)" alt="产品缩略图">
                </div>
                <!-- 放大镜组件 -->
                <ImageZoom :image-src="selectedImage" container-width="100%" container-height="425px" zoom-scale="150"
                    :transition-duration="200" :show-indicator="true" :indicator-size="100" />
            </div>
            <!-- 右邊部分 -->
            <div class="text-white flex flex-col md:w-[400px] ml-5 gap-4">
                <span class="text-xl md:text-3xl font-bold">
                    {{ productData?.group_name || productData?.name }}
                </span>
                <span class="text-sm">
                    {{ productData?.content }}
                </span>
                <hr>

                <div>
                    <span class="text-2xl font-bold text-[#ac886b] mr-3">
                        HK${{ formatPrice(selectedItem?.price) }}
                    </span>
                    <span class="text-gray-600 line-through">
                        HK${{ formatPrice(selectedItem?.price_original) }}
                    </span>
                </div>
                <!-- 規格選擇 -->
                <div>
                    <span class="text-gray-500 text-sm font-semibold">
                        规格: {{ selectedItem?.name }}
                    </span>
                    <div class="flex gap-3 w-10">
                        <img class="border-[2px]  rounded-md cursor-pointer "
                            :class="{ 'border-[#ac886b]': selectedItem.itemid === item.itemid }"
                            v-for="item in productData?.items" :key="item.itemid" :src="item.display_img_small"
                            @click="handleItemChange(item)" alt="">
                    </div>
                </div>
                <!-- 子商品 -->
                <div class="h-[75px]">
                    <span class="text-gray-500 text-sm font-semibold">
                        子商品:
                    </span>
                    <div v-if="selectedSub.sub.length > 0" class="flex gap-3 cursor-pointer mt-2" @click="openModal">
                        <div v-for="sub in selectedSub.sub" :key="sub.isubid" class="border p-2 rounded">
                            <span>{{ sub.form_name }}</span>
                        </div>
                    </div>
                    <div v-else class="text-gray-400 text-sm mt-2">
                        此規格無子商品
                    </div>
                    <CommoditySubModal :isVisible :commoditySubs="selectedSub.sub"
                        :commodityFreeSubs="selectedSub.sub_free" :subsNum="selectedSub?.num || 0" :selectNum="count"
                        :freeSubsNum="selectedSub?.num_free || 0" :title="selectedItem?.name" @close="closeModal"
                        @confirm="addToCart" />
                </div>
                <div class="text-3xl flex justify-center items-center gap-8 ">
                    <button @click="handleCountChange('reduce')" class="cursor-pointer">-</button>
                    <span class="text-xl">{{ count }}</span>
                    <button @click="handleCountChange('add')" class="cursor-pointer">+</button>
                </div>

                <!-- 購買按鈕 -->
                <div class="text-white font-medium md:text-xl flex justify-center gap-5">
                    <button @click="handleAddToCart" class="px-3 md:px-10 py-2.5 bg-[#ac886b]">加入購物車</button>
                    <button @click="handleToCart" class="px-3 md:px-10 py-2.5 bg-[#FD7812]">立即購買</button>
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