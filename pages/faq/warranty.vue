<script setup>
const linkUrl = ref('https://www.surveycake.com/s/L8PVK')
const warrantyContent=ref(`●保固期間內若發生下列各項狀況，原則上採收費修理方式。

1. 未遵守使用說明書內容之錯誤使用，而造成機體故障及損傷(包含未拔除安全螺絲)。

2. 因不當修理或改造而造成之故障及損傷。

3. 購買後因個人因素運輸、墜落等因輸造成之故障及損傷。

4. 用於非一般家庭用(如業務用途)造成之故障及損傷。

5. 配備於車輛、船舶等，造成之故障及損傷。

6. 火災、地震、水災、打雷、其他天災、異常電壓、非指定電源(電壓、頻率)等造成之故障及損傷。

7. 由非本公司(及本公司相關企業)之廠商進行錯誤修理、改造，而造成之故障及損傷

8. 因布料自然摩擦耗損導致的縫線破裂

9. 機身以外之配件消耗，例如頭枕、布套、坐墊

10. 因磨耗、劣化等因素，而更換有固定壽命之零件。`)
</script>

<template>
    <div class="w-[1110px] my-5 mx-auto">
        <div class="flex flex-col text-white text-center mb-20">
            <a class="text-2xl font-bold text-[#ac886b] mb-5" :href="linkUrl">點我填寫保固問卷</a>
            <span>請於到貨後30天內填寫保固問券，填寫完畢將收到確認信件(email)，請務必保留該信件和購買証明，以利後續維修保固查詢</span>
        </div>
        <div class="text-gray-500 ">
            <p>{{ warrantyContent }}</p>
        </div>
    </div>
</template>


<style></style>