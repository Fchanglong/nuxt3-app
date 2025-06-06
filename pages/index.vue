<script setup lang="ts">

const topCarousel = [
  {
    id: 1,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2aa9508ec08000e25efae/2160x.webp?source_format=jpg',
  },
  {
    id: 2,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6613a935a849d9000e7715e5/2160x.webp?source_format=jpg',
  },
  {
    id: 3,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/657849392677e60011e85951/2160x.webp?source_format=png',
  },
  {
    id: 4,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2aab2401dfd000d28bf3f/2160x.webp?source_format=jpg',
  },
]
const bottomCarousel = [
  {
    id: 1,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65798683eb2b63001478270e/1296x.webp?source_format=png',
  },
  {
    id: 2,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65789b19390f27001dec1c61/1296x.webp?source_format=jpg',
  },
  {
    id: 3,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6579894bbd2a170011d9d00e/1296x.webp?source_format=png',
  },
  {
    id: 4,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/657982603fc56f001d79c4ed/1080x.webp?source_format=png',
  },
  {
    id: 5,
    url: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/65798b6926bb730011c7dc8d/1296x.webp?source_format=png',
  },
]
const warrantyImgUrl = "https://shoplineimg.com/62146b2be0f4410023ad65f9/67fe86f435881a3df004c23f/2160x.webp?source_format=jpg"
const lieImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/665354f66df50d001960dbe6/540x.webp?source_format=jpg'
const pressImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab4c4780c2000a2c49c2/2160x.webp?source_format=jpg'
const badImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab7a9661f7000ee81f51/2160x.webp?source_format=jpg'
const phoneImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67f2ab8c317b0f0011403189/2160x.webp?source_format=jpg'
const chairImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6605153510beaf0017e424c6/2160x.webp?source_format=jpg'
const commentImgUrl = 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67fe87509a5ef8420c0861a2/2160x.webp?source_format=jpg'
const blogInfoArr = [
  {
    title: 'Blog Post 1',
    description: 'Description for blog post 1',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/6690a346b80e24000d5c217b/original.png?1720755013',
    link: 'https://example.com/blog1',
    data: '2023-10-01'
  },
  {
    title: 'Blog Post 2',
    description: 'Description for blog post 2',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/64986cd4b89b510011208beb/original.jpg?1687710932',
    link: 'https://example.com/blog2',
    data: '2023-10-02'
  },
  {
    title: 'Blog Post 3',
    description: 'Description for blog post 3',
    imageUrl: '	https://img.shoplineapp.com/media/image_clips/63e769a17d0520000ebcec3d/original.jpg?1676110241',
    link: 'https://example.com/blog3',
    data: '2023-10-03'
  },
  {
    title: 'Blog Post 4',
    description: 'Description for blog post 4',
    imageUrl: 'https://img.shoplineapp.com/media/image_clips/640fda72cee31b0017cbcc8e/original.jpg?1678760562',
    link: 'https://example.com/blog4',
    data: '2023-10-04'
  }
]
</script>
<template>
  <div class="home-container">
    <Carousel :originalImages="topCarousel" />
    <div class="big-img"><img :src="warrantyImgUrl" alt=""></div>
    <div class="introduce">
      <div class="introduce-txt-img">
        <img style="width: 525px;" :src="lieImgUrl" alt="">
        <div class="text-block">
          <span style="font-size: 1.8rem; font-weight: 700;">小空間的極致享受!</span>
          <span style="color: gray;">我們相信，空間與預算不應該是體驗被妥協的理由</span>
          <p style="width: 525px; text-align: center;">masa 耗時三年，開發出超越頂級按摩椅自由度、精準度的控制系統，並結合至輕薄的按摩椅墊中，
            成為市面上唯一一款不佔空間、超高CP值且極度精準的背部按摩器，短短兩年內即成為同品類的銷量冠軍!</p>
          <button class="design-btn">
            點我看設計理念
          </button>
        </div>
      </div>
      <div>
        <iframe class="video" width="1100" height="562"
          src="https://www.youtube.com/embed/bBXP8bJ0uCk?iv_load_policy=3&playsinline=1&start=0&rel=0&autoplay=0&mute=0&muted=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <div class="big-img">
      <img :src="pressImgUrl" alt="">
      <img :src="badImgUrl" alt="">
      <img :src="phoneImgUrl" alt="">
    </div>
    <div class="introduce-text-video">
      <span style="font-size: 1.8rem; font-weight: 700; color: white; padding-bottom: 50px;">
        產品特色說明
      </span>
      <div>
        <iframe class="video" width="1100" height="562"
          src="https://www.youtube.com/embed/Gdey5SsWo5k?iv_load_policy=3&playsinline=1&start=0&rel=0&autoplay=0&mute=0&muted=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <div class="big-img">
      <img :src="chairImgUrl" alt="">
      <img :src="commentImgUrl" alt="">
    </div>
    <div>
    </div>
    <div class="carousel-container">
      <div style="width: 1080px;">
        <Carousel :originalImages="bottomCarousel" />
      </div>
    </div>
    <FrequentAsk />
    <div class="blog">
      <h2>部落格文章</h2>
      <ul class="blog-list">
        <li v-for="(item, index) in blogInfoArr" :key="index">
          <img :src="item.imageUrl" alt="">
          <span>{{ item.data }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <a style="color: #ac886b; font-weight: 700; text-decoration: underline; text-underline-offset: 4px;"
            :href="item.link">
            閲讀内文
          </a>
        </li>
      </ul>
      <button>查看更多</button>
    </div>

  </div>
</template>
<style scoped>
.home-container {
  background: #1d1a1a;
  overflow-x: hidden;
}

.introduce {
  display: flex;
  padding: 60px 0;
  flex-direction: column;
  align-items: center;
  gap: 70px;
}

.introduce-txt-img {
  display: flex;
  gap: 20px;
  margin-top: 50px;
}

.text-block {
  width: 555px;
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-weight: 700;
}

.video {}

.design-btn {
  font-size: 1.1rem;
  color: white;
  background: #ac886b;
  padding: 5px 40px;
  border: none;
  border-radius: 5px;
}

.introduce-text-video {
  display: flex;
  margin: 70px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

.blog {
  width: 68.5rem;
  height: 670px;
  max-height: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog button {
  margin-top: 200px;
  cursor: pointer;
  background: #ac886b;
  border: none;
  color: white;
  padding: 10px 60px;
  border-radius: 5px;
  color: white;
  transition: all 0.3s ease;
}

.blog button:hover {
  background: #ffffff;
  color: #1d1a1a;
}

.blog-list {
  display: flex;
}

.blog-list img {
  width: 247px;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .home-container {
    padding: 10px;
  }

  .big-img {
    width: 100%;
  }

  .introduce {
    padding: 30px 0;
    gap: 40px;
  }

  .introduce-txt-img {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .text-block {
    width: 100%;
    padding: 0 10px;
    text-align: center;
  }

  .video {
    width: 100%;
    height: auto;
  }

  .carousel-container {
    width: 100%;
    padding-bottom: 20px;
  }

  .blog {
    width: 100%;
    padding: 10px;
  }

  .blog-list {
    flex-direction: column;
    gap: 20px;
  }

  .blog-list img {
    width: 100%;
    height: auto;
  }

  .blog button {
    margin-top: 50px;
    width: 80%;
    padding: 10px;
  }

  .big-img {
    width: 100%;
  }

  .big-img img {
    width: 100%;
    height: auto;
  }
}
</style>
