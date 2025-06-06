<script setup>
const bannerImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/657850071bc897000e9cf6a9/2160x.webp?source_format=jpg'
const topInfo = {
  title: '經營理念',
  subtitle: '追求建立長期的價值',
  content: '身為一間以研發為核心的產品公司:相比販售工廠貼牌產品，我們開發獨創功能以提供最大的價值相比追求完整的產品線，我們致力於將單品做到世界領先相比提供大型豪華產品，我們認為方便簡單的設計才適合現代生活相比重金聘用大牌明星，我們更希望由客戶來推薦我們的產品相比以一次性銷售導向，我們更注重長期的服務體驗相比單純的差異化設計，我們更希望研發出讓顧客熱愛的獨創功能',
}
const bottomInfo = {
  title: 'masa 致力於技術研發，以提供極致體驗',
  subtitle: '堅持創新，才能提供真正的價值!',
  content: '身為一間以研發為核心的產品公司:豐富的 App 功能、客製化路徑、先進感測器、多段力道微調——以往只有頂級按摩椅才擁有的特色，都納入在輕薄不佔空間的椅墊中，作為最貼心的禮物送給你與家人，創造溫馨自在的家庭時光。',
}
const infoArr = [
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6577efe6740079000e1ecc53/540x.webp?source_format=png',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6577efe6740079000e1ecc53/540x.webp?source_format=png',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6577efe6740079000e1ecc53/540x.webp?source_format=png',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6577efe6740079000e1ecc53/540x.webp?source_format=png',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
  {
    imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6577efe6740079000e1ecc53/540x.webp?source_format=png',
    title: '讓按摩回歸「隨心所欲」的純粹體驗',
    subtitle: '我們認為相比專家，你更了解自己要什麼',
    description: '品牌名來自英文 massage 的詞源 massa，始於創辦人在觀察到家中長輩長期臥床的困擾後，決定開發一款人人都能負擔、輕便易用且能高度客製化的按摩器材，讓您盡可能在任何時候、任何地方都能有效放鬆、恢復精力，與家人一起享受溫馨時光!',
  },
]
</script>
<!-- pages/about.vue -->
<template>
  <div class=" overflow-x-hidden flex flex-col items-center justify-center gap-5 px-4 md:px-0 ">
    <div class="w-full">
      <img class="w-full" :src="bannerImgUrl" alt="">
    </div>
    <div class="w-full md:w-[67.5rem] text-white text-center p-5 flex flex-col items-center gap-5">
      <span class="block text-2xl font-bold">{{ topInfo.title }}</span>
      <span class="block text-lg text-gray-500">{{ topInfo.subtitle }}</span>
      <p class="w-[80%] leading-10">{{ topInfo.content }}</p>
    </div>
    <div>
      <div class=" w-full max-w-[1100px] text-white  ">
        <div v-for="(item, index) in infoArr" :key="index" class="rounded-lg p-5 flex  items-center gap-5">
          <img :src="item.imgUrl" alt="" class="w-full h-[200px] object-cover rounded-lg">
          <div class="flex flex-col items-start justify-center gap-2">
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
            <h4 class="text-lg text-gray-500">{{ item.subtitle }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-[1100px] text-white p-5 flex flex-col  gap-5">
      <span class="block text-2xl font-bold">{{ bottomInfo.title }}</span>
      <span class="block text-lg text-gray-500">{{ bottomInfo.subtitle }}</span>
      <p class="w-[80%] ">{{ bottomInfo.content }}</p>
      <button class="px-10 py-2 rounded bg-[#ac886b] text-white hover:bg-white hover:text-[#1d1a1a] transition whitespace-nowrap min-w-[8rem] max-w-full w-fit">
        點我看商品頁
      </button>
    </div>
  </div>
</template>

<style scoped></style>
