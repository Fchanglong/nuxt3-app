import { defineStore } from 'pinia'
// 步驟狀態
export const useStepStore = defineStore('step', () => {
  const currentStep = ref(1)

  const setCurrentStep = (step) => {
    currentStep.value = step
  }

  return {
    currentStep,
    setCurrentStep,

  }
})

// 購物車狀態
export const useCartStore = defineStore('cart', () => {
  const items = ref([
    {
      id: 1,
      name: '替換布套  (Joy Pro 智慧按摩椅墊 適用)',
      image: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/67eccbbf5d18a9000eb41cba/200x200f.webp?source_format=png',
      selectedColor: '紅色',
      cuurentPrice: 1990,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Joy 智慧按摩椅墊',
      color: '銀河灰',
      price: 880,
      originalPrice: 1080,
      quantity: 1,
      image: 'https://shoplineimg.com/62146b2be0f4410023ad65f9/6323096f9514ce4eec4c1308/800x.webp?source_format=jpg'
    }
  ])
  const isCartModalOpen = ref(false)

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })



  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const addToCart = (product) => {
    const existingItem = items.value.find(item =>
      item.id === product.id &&
      item.selectedColor === product.selectedColor
    )

    if (existingItem) {
      existingItem.quantity += product.quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        cuurentPrice: product.price,
        image: product.image,
        selectedColor: product.selectedColor,
        quantity: product.quantity,
      })
    }
    isCartModalOpen.value = true
  }

  const removeFromCart = (itemId) => {
    const index = items.value.findIndex(item =>
      item.id === itemId
    )
    if (index !== -1) {
      items.value.splice(index, 1)
    }
   
  }

  const toggleCartModal = () => {
    isCartModalOpen.value = !isCartModalOpen.value
  }

  const hideCartModal = () => {
    isCartModalOpen.value = false
  }

  return {
    items,
    isCartModalOpen,
    cartCount,
    isEmpty,
    addToCart,
    removeFromCart,
    toggleCartModal,
    hideCartModal
  }
})
