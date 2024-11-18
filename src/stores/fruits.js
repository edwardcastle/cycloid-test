import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFruits = defineStore('fruits', () => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const fruits = ref([])
  const currentFruit = ref(null)
  const fruitsLength = ref(0)
  const loading = ref(false);

  /**
   * Given a complex json return an array where contain {isFruit}
   * @param data{Object}
   * @return void
   * */
  const extractFruits = data => {
    fruits.value = []
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
      loading.value = true;
      const response = await fetch(`${BASE_URL}/fruit`)
      if (!response.ok) {
        loading.value = false;
        throw new Error(`${response?.statusText}`)
      } else {
        const result = await response.json()
        fruitsLength.value = result.data.fruitCount
        extractFruits(result.data)
        loading.value = false;
      }
    } catch (error) {
      console.log(error)
      loading.value = false;
    }
  }

  /**
   * Return a fruit given its ID
   * @param id{string}
   * @retun void
   * */
  const getFruitById = async id => {
    try {
      loading.value = true;
      const response = await fetch(`${BASE_URL}/fruit/${id}`)
      if (!response.ok) {
        loading.value = false;
        throw new Error(`${response?.statusText}`)
      } else {
        currentFruit.value = await response.json()
        loading.value = false;
      }
    } catch (error) {
      console.log(error)
      loading.value = false;
    }
  }

  return {
    loading,
    fruits,
    fruitsLength,
    currentFruit,
    getFruits,
    getFruitById,
  }
})
