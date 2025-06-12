<script setup>
const dropdownRef = ref(null)
const props = defineProps({
    selects: {
        type: Array,
        require: true,
        default: () => []
    },

})

const emit = defineEmits(['update:selected'])
const isOpen = ref(false)
const selectedOption = ref(props.selects[0])

const handleSelect = (option) => {
    selectedOption.value = option
    isOpen.value = false
    emit('update:selected', option)
}

// 點擊外部關閉下拉框
const  handleClickOutside=(e)=> {
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
    <div class="z-50 relative" ref="dropdownRef">
        <button @click.stop="isOpen = !isOpen"
            class="w-full min-w-48 px-4 py-2 text-left   border rounded-md focus:outline-none  transition-all duration-200">
            {{ selectedOption.name }}
            <!-- 圖標 -->
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </button>
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <ul v-if="isOpen"
                class="absolute z-10 w-full min-w-48 py-1 mt-1 bg-[#1d1a1a]   rounded-md shadow-lg">
                <li v-for="option in selects" :key="option.id" @click="handleSelect(option)"
                    class="px-4 py-2 text-white hover:bg-gray-500/15 cursor-pointer transition-colors duration-200"
                    :class="{ 'bg-gray-500/15': selectedOption.id === option.id }">
                    {{ option.name }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<style scoped></style>