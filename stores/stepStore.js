import { defineStore } from 'pinia'
import { ref } from 'vue'

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
