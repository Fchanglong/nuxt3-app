<script setup>
import { useStepStore } from '~/stores/stepStore'
const store = useStepStore()
const props = defineProps({
    steps: {
        type: Array,
        required: true
    }
})
const currentStep = computed(() => store.currentStep)
</script>

<template>
    <div class="flex items-center justify-between max-w-2xl mx-auto w-full">
        <template v-for="(step, index) in steps" :key="step.number">
            <div class="flex-1 flex flex-col items-center relative">
                <!-- 圓形步驟 -->
                <div class="w-10 h-10 flex items-center justify-center rounded-full z-10 text-white font-bold"
                    :class="currentStep >= step.number ? 'bg-gray-500' : 'bg-gray-300'">
                    {{ step.number }}
                </div>
                <!-- 步驟標籤 -->
                <span class="text-sm mt-2">
                    {{ step.label }}
                </span>

                <!-- 連接線 -->
                <div v-if="index < steps.length - 1" class="absolute top-5 right-0 w-full h-0.5 bg-gray-300 z-0"
                    style="transform: translateX(50%);"></div>
            </div>
        </template>
    </div>
</template>
