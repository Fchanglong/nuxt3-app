<script setup>
const visaImgUrl = 'https://static.shoplineapp.com/web/assets/payment/visa.svg'
const MasterCard = 'https://static.shoplineapp.com/web/assets/payment/master.svg'
const slPaymentImgUrl = 'https://static.shoplineapp.com/web/assets/payment/sl_payment.svg'
</script>
<template>
    <footer class="bg-white flex flex-col items-center justify-center">
        <div class="flex w-[50%] justify-center mt-4">
            <div class="flex flex-col items-center gap-5 w-full">
                <span class="font-bold text-xl">關於我們</span>
                <span class="text-sm">2020年成立的新型按摩器材公司，專注結合先進技術與放鬆舒緩服務，提供精準、方便使用、人人都可負擔的新型按摩椅墊。</span>
            </div>
            <div class="flex flex-col items-center gap-5 w-full text-sm">
                <span class="font-bold text-xl">聯絡我們</span>
                <span class="text-center">
                    <p>瑪莎生活科技股份有限公司</p>
                    <p>統一編號:83763587</p>
                </span>
                <span class="text-center">
                    <p> 客服信箱：service@masalife.com</p>
                    <p>電話：02-2361 5880</p>
                </span>
                <span class="text-center">
                    <p>營業時間 / 10:00-17:00</p>
                    <p>電郵 / service@masalife.com</p>
                </span>
            </div>
        </div>
        <div class="flex w-[50%] justify-start gap-3 ">
            <img :src="visaImgUrl" alt="">
            <img :src="MasterCard" alt="">
            <img :src="slPaymentImgUrl" alt="">
        </div>
        <div class="text-sm font-bold my-8">
            <p>版權所有© 2024 瑪莎生活科技股份有限公司</p>
        </div>
        <div class="w-full h-[2rem] bg-[#ac886b]"></div>
    </footer>
</template>
<style scoped></style>