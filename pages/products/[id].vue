<script setup>
import { useAsyncData } from 'nuxt/app';
import { useStore } from 'vuex'
import { getCommodityByIdApi } from "~/api/commodify-api";
const route = useRoute()
const id = route.params.id
const count = ref(1)
// 使用購物車 store
const store = useStore()
// const { data:productInfo } = useAsyncData(async () => {
//     const { res } = await getCommodityByIdApi(id)
//     return res.addToCart
// })
// 在 handleCountChange 方法後面添加
const addToCart = () => {
    const product = {
        id: productInfo.value.id,
        name: productInfo.value.name,
        price: productInfo.value.currentPrice,
        image: productInfo.value.selectedImage,
        selectedColor: productInfo.value.selectedColor,
        quantity: count.value
    }

    store.dispatch('cart/addToCart', product)
}
const productInfo = ref({
    id: 1,
    name: '替換布套 (Joy Pro 智慧按摩椅墊 適用)',
    desText: `※本商品僅適用Joy Pro機型，Joy機型不適用。
※布套部分僅有上半頭枕區域及網布區域，並非整個全布套，如需全布套替換服務，請與客服Line@聯繫。
※本商品不適用30天體驗鑑賞活動，拆封後無法退換。`,
    id: 1,
    name: '替換布套 (Joy Pro 智慧按摩椅墊 適用)',
    desText: `※本商品僅適用Joy Pro機型，Joy機型不適用。
※布套部分僅有上半頭枕區域及網布區域，並非整個全布套，如需全布套替換服務，請與客服Line@聯繫。
※本商品不適用30天體驗鑑賞活動，拆封後無法退換。`,
    desImg: [
        'https://img.shoplineapp.com/media/image_clips/67ebab40e24d79000abb01f2/original.png?1743498047',
        'https://img.shoplineapp.com/media/image_clips/67eccd002c4d470011d834a3/original.gif?1743572222'
    ],
    ogPrice: 283.11,
    currentPrice: 230.69,
    knowMore: '',
    comments: [],
    deliverAndPay: {
        deliver: `順豐快遞(台灣出貨澳門)
黑貓快遞到府
順豐快遞(台灣出貨香港)`,
        pay: `信用卡分期付款
信用卡一次付款
銀行轉帳`
    },
    images: {
        colors: [
            {
                color: '銀河灰',
                url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/800x.webp?source_format=png'
            },
            {
                color: '海軍藍',
                url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbc6271e8e000d310c39/800x.webp?source_format=png'
            },
            {
                color: '褐木棕',
                url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbcd0046c6000ba998a6/800x.webp?source_format=png'
            },
            {
                color: '鋼鐵灰',
                url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67ed2efb9d46c3000a5d8b67/800x.webp?source_format=png'
            }
        ],
        thumbnails: [
            'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/800x.webp?source_format=png',
            'https://shoplineimg.com/62146b2be0f4410023ad65f9/67ebaf31425acc000b9ea2e6/800x.webp?source_format=jpg'
        ]
    },
    selectedColor: '銀河灰',
    selectedImage: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/800x.webp?source_format=png',
    aboutProducts: [
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
        }
    ]
})
let selectedColor = ref(
    {
        color: '銀河灰',
        url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/800x.webp?source_format=png'
    }
)
const handleColorChange = (color) => {
    selectedColor.value = productInfo.value.images.colors.find(item => item.color === color)
    if (selectedColor.value) {
        productInfo.value.selectedColor = selectedColor.value.color
        productInfo.value.selectedImage = selectedColor.value.url
    }
}

const handleImageChange = (image) => {
    productInfo.value.selectedImage = image
}

const activeTab = ref('商品描述')
const tabs = [
    { name: '商品描述', key: 'desImg' },
    { name: '了解更多', key: 'knowMore' },
    { name: '送貨及付款方式', key: 'deliverAndPay' },
    { name: '顧客評價', key: 'comments' }
]
const handleCountChange = (action) => {
    if (action === 'add') {
        count.value += 1

    } else if (action === 'reduce' && count.value > 1) {
        count.value -= 1
    }
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
                            'border-[#ac886b] shadow-md': image === productInfo.selectedImage,
                            'border-gray-300 hover:border-[#ac886b]': image !== productInfo.selectedImage
                        }" v-for="image in productInfo.images.thumbnails" :key="image" :src="image"
                        @click="handleImageChange(image)" alt="产品缩略图">
                </div>
                <!-- 放大镜组件 -->
                <ImageZoom :image-src="productInfo.selectedImage" :image-alt="productInfo.name" container-width="100%"
                    container-height="425px" zoom-scale="150" :transition-duration="200" :show-indicator="true"
                    :indicator-size="100" class="w-full md:w-[425px] md:h-[425px]" />
            </div>
            <!-- 右邊部分 -->
            <div class="text-white flex flex-col md:w-[400px] ml-5 gap-4">
                <span class="text-3xl font-bold">
                    {{ productInfo.name }}
                </span>
                <span class="text-sm">
                    {{ productInfo.desText }}
                </span>
                <hr>

                <div>
                    <span class="text-2xl font-bold text-[#ac886b] mr-3">
                        HK${{ productInfo.currentPrice }}
                    </span>
                    <span class="text-gray-600 line-through">
                        HK${{ productInfo.ogPrice }}
                    </span>
                </div>

                <div>
                    <span class="text-gray-500 text-sm font-semibold">
                        顔色: {{ productInfo.selectedColor }}
                    </span>
                    <div class="flex gap-3 w-10">
                        <img class="border-[2px]  rounded-md cursor-pointer "
                            :class="{ 'border-[#ac886b]': selectedColor.color === color.color }"
                            v-for="color in productInfo.images.colors" :key="color.color" :src="color.url"
                            @click="handleColorChange(color.color)" alt="">
                    </div>
                </div>

                <div class="text-3xl flex justify-center items-center gap-8 ">
                    <button @click="handleCountChange('reduce')" class="cursor-pointer">-</button>
                    <span class="text-xl">{{ count }}</span>
                    <button @click="handleCountChange('add')" class="cursor-pointer">+</button>
                </div>
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
                <div v-if="activeTab === '商品描述'">
                    <div class="flex flex-col  mx-auto my-0 gap-4 w-full md:w-[800px]">
                        <img v-for="img in productInfo.desImg" :key="img" :src="img" alt="商品描述圖片"
                            class="w-full h-auto object-cover rounded-md">
                    </div>
                </div>
                <div v-if="activeTab === '了解更多'">
                    <p class="text-white text-lg leading-relaxed">{{ productInfo.knowMore }}</p>
                </div>
                <div v-if="activeTab === '送貨及付款方式'">
                    <div class="text-white flex justify-between px-10">
                        <span>
                            <h3 class="text-xl font-bold mb-4">送貨方式</h3>
                            <p class="mb-4">{{ productInfo.deliverAndPay.deliver }}</p>
                        </span>
                        <span>
                            <h3 class="text-xl font-bold mb-4">付款方式</h3>
                            <p>{{ productInfo.deliverAndPay.pay }}</p>
                        </span>
                    </div>
                </div>
                <div v-if="activeTab === '顧客評價'">
                    <p v-if="productInfo.comments.length === 0" class="text-gray-400">暫無顧客評價</p>
                    <ul v-else class="text-white">
                        <li v-for="(comment, index) in productInfo.comments" :key="index">
                            {{ comment }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 相關商品 -->
        <div class="w-full mt-14 text-center">
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
        </div>
    </div>
</template>