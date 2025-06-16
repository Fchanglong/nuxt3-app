<script setup>
// ===== 组件属性定义 =====
const props = defineProps({
    // 图片源地址
    imageSrc: {
        type: String,
        required: true
    },
    // 图片描述文字
    imageAlt: {
        type: String,
        default: '产品图片'
    },
    // 容器宽度
    containerWidth: {
        type: String,
        default: '100%'
    },
    // 容器高度
    containerHeight: {
        type: String,
        default: '425px'
    },
    // 放大倍数 (支持: 110, 125, 150, 200 等)
    zoomScale: {
        type: [String, Number],
        default: '150'
    },
    // 过渡动画时长 (毫秒)
    transitionDuration: {
        type: Number,
        default: 200
    },
    // 是否显示放大区域指示器
    showIndicator: {
        type: Boolean,
        default: true
    },
    // 指示器大小 (像素)
    indicatorSize: {
        type: Number,
        default: 100
    },
})

// 🎯 核心原理：通过CSS的transform-origin属性动态改变放大的中心点
// 1. 状态管理变量
const isZooming = ref(false)              // 是否正在放大状态
const zoomPosition = ref({ x: 50, y: 50 })  // 鼠标在图片中的位置（百分比，默认中心）
const mainImageRef = ref(null)            // 主图的DOM引用

// 2. 鼠标进入图片区域 - 开启放大模式
const handleMouseEnter = () => {
    isZooming.value = true
}

// 3. 鼠标离开图片区域 - 关闭放大模式
const handleMouseLeave = () => {
    isZooming.value = false
    // 重置到中心位置
    zoomPosition.value = { x: 50, y: 50 }
}

// 4. 鼠标移动处理 - 这是核心逻辑！
const handleMouseMove = (event) => {
    // 确保图片DOM元素存在
    if (!mainImageRef.value) return

    // 🎯 关键步骤1：获取图片元素的位置和尺寸信息
    const rect = mainImageRef.value.getBoundingClientRect()

    // 🎯 关键步骤2：计算鼠标在图片中的相对位置
    // event.clientX/Y 是鼠标在整个视口中的坐标
    // rect.left/top 是图片左上角在视口中的坐标
    // 相减得到鼠标在图片内的像素坐标
    const mouseXInImage = event.clientX - rect.left  // 鼠标在图片内的X像素坐标
    const mouseYInImage = event.clientY - rect.top   // 鼠标在图片内的Y像素坐标

    // 🎯 关键步骤3：将像素坐标转换为百分比
    // 除以图片的宽高，再乘以100，得到0-100的百分比
    const x = (mouseXInImage / rect.width) * 100
    const y = (mouseYInImage / rect.height) * 100

    // 🎯 关键步骤4：边界限制，确保百分比在0-100之间
    const newPosition = {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
    }
    zoomPosition.value = newPosition
}
</script>
<template>
    <!-- 🖼️ 图片放大镜组件 - 鼠标跟随放大效果 -->
    <div class="relative overflow-hidden rounded-lg border md:min-w-[425px] md:min-h-[425px]" :style="{ width: containerWidth, height: containerHeight }">
        <img ref="mainImageRef" class="w-full h-full object-cover cursor-crosshair transition-transform"
            :class="{ [`scale-${zoomScale}`]: isZooming }" :style="{
                transitionDuration: `${transitionDuration}ms`,
                transformOrigin: isZooming ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
            }" :src="imageSrc" :alt="imageAlt" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
            @mousemove="handleMouseMove">
        <!-- 放大区域指示器 -->
        <div v-if="isZooming && showIndicator"
            class="absolute pointer-events-none bg-white/20 border-2 border-white/80 rounded-md transition-opacity duration-200"
            :style="{
                width: `${indicatorSize}px`,
                height: `${indicatorSize}px`,
                left: `${zoomPosition.x}%`,        // 水平位置（百分比）
                top: `${zoomPosition.y}%`,         // 垂直位置（百分比）
                transform: 'translate(-50%, -50%)' // 中心对齐
            }"></div>
    </div>
</template>



<style scoped>
@media (max-width: 768px) {
    .scale-150 {
        transform: scale(1.25);
    }
}

/* 自定义放大倍数 */
.scale-110 {
    transform: scale(1.1);
}

.scale-125 {
    transform: scale(1.25);
}

.scale-150 {
    transform: scale(1.5);
}

.scale-175 {
    transform: scale(1.75);
}

.scale-200 {
    transform: scale(2.0);
}
</style>
