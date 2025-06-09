<script setup>
const imgUrl=ref('https://img.shoplineapp.com/media/image_clips/6335ab5e6f842100253ce11e/original.jpg?1664461661')
const shoppingContent=`          ☆當日送達特快遞  (非常駐貨運方式，限期開放，限雙北部分地區)  
當日下午三點前下單，可於當日6小時內到貨送達地區有  : 台北市、新北市(中和區、板橋區、新莊區、新店區、永和區、三重區、樹林區、土城區)
新北市其他地區及其他縣市不適用此方案
此方案須負擔額外運費300元
如需送上樓請於訂單上備註，無填寫則僅能於一樓自取
下單時送貨方式請選 「lala快遞」，請務必確認當天可收貨人姓名、電話、地址，並把鈴聲打開，避免司機無法聯繫！
出貨前將有專人電話聯繫收件人，如下單後於每日17:00前致電無人回應，將自動安排隔天確認出貨事宜。
於15:00後至上午10:00間的訂單，將以上午10:00計算送貨起始時間
於辦公時間下單後三小時內若無法連絡上您，則產品將延後送達`
</script>

<template>
  <div class="w-[1110px] mx-auto my-10 ">
    <div class="text-center flex flex-col gap-4 mb-5">
        <span class="text-2xl text-white font-bold ">運送政策</span>
        <img :src="imgUrl" alt="">
    </div>
    <div class="flex flex-col gap-4 ">
        <span class="text-xl font-bold text-[#ac886b] ">日常配送:</span>
        <p class="text-white">{{ shoppingContent }}</p>
    </div>
  </div>
</template>


<style>

</style>