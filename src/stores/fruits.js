import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFruits = defineStore('fruits', () => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const fruits = ref([])
  const fruitsLength = ref(0);

  /**
   * Given a complex json return an array where contain {isFruit}
   * @param data{Object}
   * @return void
   * */
  const extractFruits = data => {
    const explore = node => {
      if (typeof node === 'object' && node !== null) {
        if (node.isFruit) {
          fruits.value.push(node)
        } else {
          for (const key in node) {
            explore(node[key])
          }
        }
      }
    }
    explore(data)
  }

  /**
   * Get all the objects from api
   * @return void
   */
  const getFruits = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fruit`)
      if (!response.ok) {
        throw new Error(`${response?.statusText}`)
      } else {
        const result = await response.json()
        fruitsLength.value = result.data.fruitCount
        extractFruits(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fruits,
    fruitsLength,
    getFruits,
  }
})
