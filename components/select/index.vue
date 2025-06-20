<script setup>
const dropdownRef = ref(null)
const props = defineProps({
    selects: {
        type: Array,
        default: () => []
    },
    isOrder: {
        type: Boolean,
        default: false
    },
    initialValue: {
        type: Object,
        default: () => (null)
    }

})

const emit = defineEmits(['update:selected'])
const isOpen = ref(false)
const selectedOption = ref({})
// 監聽 selects 變化，自動設置默認選項
watch(() => props.selects, (newSelects) => {
    if (newSelects && newSelects.length > 0) {
        // 只有在沒有選中項時才設置默認值
        if (!props.initialValue) {
            selectedOption.value = newSelects[0]
            emit('update:selected', newSelects[0])
        }
    }
}, { immediate: true })

// 監聽 initialValue 變化
watch(() => props.initialValue, (newValue) => {
    if (newValue && newValue.name) {
        selectedOption.value = newValue
    }
}, { immediate: true })

const handleSelect = (option) => {
    selectedOption.value = option
    isOpen.value = false
    emit('update:selected', option)
}

// 點擊外部關閉下拉框
const handleClickOutside = (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})


</script>

<template>
    <div class=" relative" ref="dropdownRef">
        <button @click.stop="isOpen = !isOpen"
            class="w-full min-w-48 px-4 py-2 text-left border rounded-md focus:outline-none transition-all duration-200"
            :class="isOrder ? 'bg-white text-black border-gray-300' : 'bg-transparent text-white border-white'">
            <div class="flex items-center justify-between">
                <span>{{ selectedOption.name }}</span>
                <!-- 圖標 -->
                <span>
                    <svg class="w-4 h-4 transition-transform"
                        :class="[{ 'rotate-180': isOpen }, isOrder ? 'text-black' : 'text-white']" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </div>
        </button>
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <ul v-if="isOpen" class="absolute z-50 w-full min-w-48 py-1 mt-1 rounded-md shadow-lg"
                :class="isOrder ? 'bg-white text-black border border-gray-200' : 'bg-[#1d1a1a] text-white'">
                <li v-for="(option, index) in selects" :key="index" @click="handleSelect(option)"
                    class="px-4 py-2 cursor-pointer transition-colors duration-200" :class="[
                        isOrder
                            ? 'text-black hover:bg-gray-100' + (selectedOption.id === option.id ? ' bg-gray-100' : '')
                            : 'text-white hover:bg-gray-500/15' + (selectedOption.id === option.id ? ' bg-gray-500/15' : '')
                    ]">
                    {{ option.name }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<style scoped></style>