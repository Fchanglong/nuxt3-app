  <script setup>
  const posts = ref([
    {
      id: 1,
      title: '這些穴道可以幫助睡眠！助眠按摩 3 招 一定要學會',
      introduce: '現代人在工作與生活之間越來越無法切割，也常常在休息時間沒辦法獲得足夠的休息。睡前想東想西、焦慮、失眠是很常見的現代症狀，但睡眠對健康是非常重要的！良好的睡眠能讓身體自我修復，提升免疫力，增強記憶力和集中力。這篇文章將和大家介紹有效助眠的穴道以及幫助睡眠的方法，讓你在忙碌的生活中也能擁有高品質的睡眠。',
      date: '2024-07-12',
      imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6690a346b80e24000d5c217b/800x.webp?source_format=png'
    },
    {
      id: 2,
      title: '這些穴道可以幫助睡眠！助眠按摩 3 招 一定要學會',
      introduce: '現代人在工作與生活之間越來越無法切割，也常常在休息時間沒辦法獲得足夠的休息。睡前想東想西、焦慮、失眠是很常見的現代症狀，但睡眠對健康是非常重要的！良好的睡眠能讓身體自我修復，提升免疫力，增強記憶力和集中力。這篇文章將和大家介紹有效助眠的穴道以及幫助睡眠的方法，讓你在忙碌的生活中也能擁有高品質的睡眠。',
      date: '2024-07-12',
      imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6690a346b80e24000d5c217b/800x.webp?source_format=png'
    },
    {
      id: 3,
      title: '這些穴道可以幫助睡眠！助眠按摩 3 招 一定要學會',
      introduce: '現代人在工作與生活之間越來越無法切割，也常常在休息時間沒辦法獲得足夠的休息。睡前想東想西、焦慮、失眠是很常見的現代症狀，但睡眠對健康是非常重要的！良好的睡眠能讓身體自我修復，提升免疫力，增強記憶力和集中力。這篇文章將和大家介紹有效助眠的穴道以及幫助睡眠的方法，讓你在忙碌的生活中也能擁有高品質的睡眠。',
      date: '2024-07-12',
      imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6690a346b80e24000d5c217b/800x.webp?source_format=png'
    },
    {
      id: 4,
      title: '這些穴道可以幫助睡眠！助眠按摩 3 招 一定要學會',
      introduce: '現代人在工作與生活之間越來越無法切割，也常常在休息時間沒辦法獲得足夠的休息。睡前想東想西、焦慮、失眠是很常見的現代症狀，但睡眠對健康是非常重要的！良好的睡眠能讓身體自我修復，提升免疫力，增強記憶力和集中力。這篇文章將和大家介紹有效助眠的穴道以及幫助睡眠的方法，讓你在忙碌的生活中也能擁有高品質的睡眠。',
      date: '2024-07-12',
      imgUrl: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6690a346b80e24000d5c217b/800x.webp?source_format=png'
    }
  ])
</script>

<template>
  <div class="mx-auto my-10 px-10">
    <ul>
      <li class="my-12 cursor-pointer text-white group" v-for="item in posts" :key="item.id">
        <NuxtLink class="flex flex-col md:flex-row-reverse hover:text-[#ac886b]" :to="`/posts/${item.id}`">
          <img class="w-full mb-3 md:w-[300px] h-fit" :src="item.imgUrl" alt="" />
          <div class="flex flex-col gap-5 px-4">
            <span class="text-3xl font-bold group-hover:text-[#ac886b]">
              {{ item.title }}
            </span>
            <span class="text-[#EDEDED99] line-clamp-2">
              {{ item.introduce }}
            </span>
            <div>
              <span class="text-[#EDEDED99] font-semibold">
                {{ item.date }}
              </span>
              <div class="w-[40px] h-[4px] bg-[#ac886b] mt-3"></div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>



<style scoped></style>
