<script setup>
const chairManualInfo = ref({
    videoUrl: 'https://www.youtube.com/embed/weaUlaGQItk?autoplay=0&rel=1',
    title: '按摩椅墊操作說明',
    text: `
插上電，待控制器亮呼吸燈時，即可按下中央按鈕啟動按摩
使用中間按鈕可切換自動(藍燈)與定點(白燈)模式
中央環形按鍵上下按鈕可增減五段力道，左右按鈕可切換四種按摩手法
上方搖桿可控制按摩頭高低寬窄變化(寬窄僅可在推、按手法使用)
使用完時，可長按中央按紐3秒進入待機`
})
const chairTipsInfo = ref({
    videoUrl: 'https://www.youtube.com/embed/Ex3gGgLmMQw?autoplay=0&rel=1',
    title: '使用小秘訣',
    text: `注意:
若平躺使用，請坐在座墊上按摩肩頸、下背腰或是腿部，請勿直接坐在按摩球頭上方。
初次使用若有不適感，請休息並請教專業人士意見後再使用，或是先將力道調整到最輕，用擠手法坐著輕靠背部測試
體重 100 kg內皆可使用。按摩頭另設計有保護機制，超出設定壓力即會停止運轉，避免肌肉受傷。`
})
const chairAPPInfo = ref({
    videoUrl: 'https://www.youtube.com/embed/dV-1XwlWmQk?autoplay=0&rel=1',
    title: 'APP操作說明',
    text: `Android手機使用APP前，先同時開啟「GPS定位」和「藍芽」，打開後直接開啟masa app自動配對連線即可，不用到藍芽設定頁面做連線喔！
IOS和Samsumg手機，須設定不自動關閉螢幕，在螢幕常亮的狀況下讓椅墊正常運作！
控制器操作時，手機APP會自動斷線，避免機器訊號受到干擾。
手機APP控制器有8種手法，可以搭配任意手法和位置，按到您最想按的點！
百寶箱模式亦提供多種制式按摩方式，也不定期會更新手法，讓您輕鬆享受按摩！`
})
const chairMaintainInfo = ref({
    videoUrl: 'https://youtu.be/Jipeabfhedw',
    title: '清潔保養方式說明',
    text: `請使用乾布加中性清潔劑清洗布套
布套不可拆洗`
})
const videoUrl = ref([
    {
        id: 1,
        url: 'https://www.youtube.com/embed/wFxSYrH4vk0?autoplay=0&rel=1'
    },
    {
        id: 2,
        url: 'https://www.youtube.com/embed/csv1iqs8YYc?autoplay=0&rel=1'
    }

])
const manualImgUrl=ref('https://shoplineimg.com/62146b2be0f4410023ad65f9/65a3955d35a9dd0011987737/1296x.webp?source_format=jpg')
</script>

<template>
    <div class="md:w-[1100px] p-5 my-0 mx-auto flex flex-col gap-5">
        <div class="flex">
            <iframe class="w-full md:w-[640px] h-auto md:h-[480px]" :src="chairManualInfo.videoUrl" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <div class="max-w-[500px] text-white p-5">
                <span class="text-2xl font-bold ">{{ chairMaintainInfo.title }}</span>
                <p class="text-sm mt-5">{{ chairManualInfo.text }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-8">
            <iframe class="w-full h-[380px]  md:h-[480px]" v-for="item in videoUrl" :src="item.url" :key="item.id" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
        <div class="w-full">
            <img :src="manualImgUrl" alt="">
        </div>
           <div class="flex">
            <iframe class="w-full md:w-[640px] h-auto md:h-[480px]" :src="chairTipsInfo.videoUrl" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <div class="max-w-[500px] text-white p-5">
                <span class="text-2xl font-bold ">{{ chairTipsInfo.title }}</span>
                <p class="text-sm mt-5">{{ chairTipsInfo.text }}</p>
            </div>
        </div>
           <div class="flex">
            <iframe class="w-full md:w-[640px] h-auto md:h-[480px]" :src="chairAPPInfo.videoUrl" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <div class="max-w-[500px] text-white p-5">
                <span class="text-2xl font-bold ">{{ chairAPPInfo.title }}</span>
                <p class="text-sm mt-5">{{ chairAPPInfo.text }}</p>
            </div>
        </div>
    </div>
</template>


<style></style>