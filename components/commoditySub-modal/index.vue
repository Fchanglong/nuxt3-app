<script setup>
const props = defineProps({
    commoditySubs: {
        type: Array,
        default: () => []
    },
    commodityFreeSubs: {
        type: Array,
        default: () => []
    },
    subsNum: {
        type: Number,
        default: 0
    },
    freeSubsNum: {
        type: Number,
        default: 0
    },
    selectNum: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: '標題'
    },
    isVisible: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['close', 'confirm'])
// 为子商品和赠品分别创建数量管理
const subCounts = ref({})
//子商品總數
const subTotal = computed(() => props.subsNum * props.selectNum)
// 赠品總數
const freeSubsTotal = computed(() => props.freeSubsNum * props.selectNum)
// 监听子商品变化，初始化数量
watch(() => props.commoditySubs, (newSubs) => {
    if (newSubs.length > 0) {
        const newCounts = {}
        newSubs.forEach(item => {
            // 如果只有一個子商品，自動設置為總數量
            newCounts[item.isubid] = newSubs.length === 1 ? subTotal.value : 0
        })
        subCounts.value = newCounts
    }
}, { immediate: true })


// 计算子商品已选择的总数量
const subTotalSelected = computed(() => {
    return Object.values(subCounts.value).reduce((sum, count) => sum + count, 0)
})


// 处理子商品数量变化
const handleSubCountChange = (itemId, action) => {
    const currentCount = subCounts.value[itemId] || 0

    if (action === 'add') {
        if (subTotalSelected.value < subTotal.value) {
            subCounts.value[itemId] = currentCount + 1
        }
    } else if (action === 'reduce' && currentCount > 0) {
        subCounts.value[itemId] = currentCount - 1
    }
}


// 检查子商品是否可以继续添加
const canAddSub = (itemId) => {
    return subTotalSelected.value < subTotal.value
}

// 检查子商品是否可以减少
const canReduceSub = (itemId) => {
    return (subCounts.value[itemId] || 0) > 0 && props.commoditySubs.length !== 1
}

// 确认选择时，发送选择的商品和数量
const handleConfirm = () => {
    const selectedItems = []

    // 收集子商品
    Object.entries(subCounts.value).forEach(([itemId, count]) => {
        if (count > 0) {
            selectedItems.push({
                item: parseInt(itemId),
                num: count
            })
        }
    })

    // 收集赠品 - 每个赠品的数量都是 freeSubsTotal
    props.commodityFreeSubs.forEach(item => {
        if (props.freeSubsNum > 0) {
            selectedItems.push({
                item: parseInt(item.isubid),
                num: freeSubsTotal.value
            })
        }
    })
    emit('confirm', selectedItems)
}

// 檢查是否可以確認（子商品就行）
const canConfirm = computed(() => {
    return subTotalSelected.value === subTotal.value
})


// 監聽 isVisible 變化，控制滾動
watch(() => props.isVisible, (isVisible) => {
    if (isVisible) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
})

// 點擊遮罩關閉
const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        emit('close')
    }
}

// 組件卸載時確保恢復滾动
onBeforeUnmount(() => {
    if (props.isVisible) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
})
</script>

<template>
    <div class="fixed inset-0 bg-black/50  z-[1000] flex items-center justify-center " v-if="isVisible"></div>
    <Transition name="subModal">
        <div class="fixed  inset-0 text-black z-[1000] flex items-center justify-center" v-if="isVisible"
            @click="handleOverlayClick">
            <div class="border md:min-w-[500px] md:min-h-96 bg-white p-4 rounded-lg  mb-44">
                <div class="flex flex-col gap-4 min-h-96">
                    <h1 class="text-lg font-bold">{{ title }}</h1>
                    <hr>
                    <!-- 子商品区域 -->
                    <div v-if="commoditySubs.length > 0">
                        <h2 class="text-xl mb-2">請選擇 {{ subTotal }} 件子商品 (已選: {{ subTotalSelected }})</h2>
                        <div class="space-y-3 max-h-48 overflow-y-auto pb-2">
                            <div v-for="item in commoditySubs" :key="'sub-' + item.isubid"
                                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-md 
                                bg-white hover:shadow-lg transition-all duration-200 hover:border-gray-300">
                                <span class="flex-1">{{ item.form_name }}</span>
                                <div class="flex items-center gap-2">
                                    <button @click="handleSubCountChange(item.isubid, 'reduce')"
                                        :disabled="!canReduceSub(item.isubid)" :class="[
                                            'w-8 h-8 rounded-sm border',
                                            canReduceSub(item.isubid)
                                                ? 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                                                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        ]">
                                        -
                                    </button>
                                    <span class="w-8 text-center">{{ subCounts[item.isubid] || 0 }}</span>
                                    <button @click="handleSubCountChange(item.isubid, 'add')"
                                        :disabled="!canAddSub(item.isubid)" :class="[
                                            'w-8 h-8 rounded-sm border',
                                            canAddSub(item.isubid)
                                                ? 'bg-[#e0c3ab] hover:bg-[#d4a884] cursor-pointer'
                                                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        ]">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 赠品区域 -->
                    <div v-if="commodityFreeSubs.length > 0">
                        <h2 class="text-xl mb-2 text-green-600">赠品</h2>
                        <div class="space-y-3 max-h-48 overflow-y-auto">
                            <div v-for="item in commodityFreeSubs" :key="'free-' + item.isubid"
                                class="flex items-center justify-between p-4 border border-green-200 rounded-lg shadow-md bg-green-50 hover:shadow-lg transition-all duration-200 hover:border-green-300">
                                <span class="flex-1 text-green-800">🎁 {{ item.form_name }}</span>
                                <span>x{{ freeSubsTotal }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 操作按鈕 -->
                    <div class="flex gap-2 mt-auto text-sm md:text-base ">
                        <button @click="$emit('close')" class=" transition-all duration-200 flex-1 px-2 py-1 md:px-4 md:py-2 bg-gray-300 rounded hover:bg-gray-400">
                            取消
                        </button>
                        <button @click="handleConfirm" :disabled="!canConfirm" :class="[
                            'flex-1 md:px-4 md:py-2 rounded text-white px-2 py-1 transition-all duration-200',
                            canConfirm
                                ? 'bg-[#ac886b] hover:bg-[#8d6748] cursor-pointer'
                                : 'bg-gray-400 cursor-not-allowed'
                        ]">
                            確認 (子商品: {{ subTotalSelected }}/{{ subTotal }})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.subModal-enter-active,
.subModal-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.subModal-enter-from,
.subModal-leave-to {
    transform: scale(0.1);
    opacity: 0;
}

.subModal-enter-to,
.subModal-leave-from {
    transform: scale(1);
    opacity: 1;
}
</style>