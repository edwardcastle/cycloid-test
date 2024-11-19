import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFruits = defineStore('fruits', () => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const fruits = ref([])
  const currentFruit = ref(null)
  const fruitsLength = ref(0)
  const loading = ref(false)

  /**
   * Given a complex json return an array where contain {isFruit}
   * @param data{Object}
   * @return void
   * */
  const extractFruits = async data => {
    fruits.value = []
    const explore = node => {
      if (typeof node === 'object' && node !== null) {
        if (node.isFruit) {
          for (const key in node) {
            explore(node[key])
          }
          fruits.value.push({
            id: node.id,
            isFruit: node.isFruit,
            name: node.name,
            image: node.image,
            price: node.price,
            color: node.color,
            description: node.description,
            taste: node.taste,
            expires: node.expires,
          })
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
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit`)
      if (!response.ok) {
        loading.value = false
        throw new Error(`${response?.statusText}`)
      } else {
        const result = await response.json()
        fruitsLength.value = result.data.fruitCount
        await extractFruits(result.data)
        fruits.value = fruits.value.sort((a, b) => a.id - b.id)
        loading.value = false
      }
    } catch (error) {
      console.log(error)
      loading.value = false
    }
  }

  /**
   * Return a fruit given its ID
   * @param id{string}
   * @retun void
   * */
  const getFruitById = async id => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit/${id}`)
      if (!response.ok) {
        loading.value = false
        throw new Error(`${response?.statusText}`)
      } else {
        currentFruit.value = await response.json()
        loading.value = false
      }
    } catch (error) {
      console.log(error)
      loading.value = false
    }
  }

  /**
   * Create a new fruit
   * @param fruit {Object}
   */
  const createFruit = async fruit => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fruit),
      })

      if (!response.ok) {
        throw new Error(`${response.statusText}`)
      }

      const newFruit = await response.json()
      fruits.value.push(newFruit)
      loading.value = false
    } catch (error) {
      console.error('Error creating fruit:', error)
      loading.value = false
    }
  }

  /**
   * Delete a fruit given the id
   * @param id
   **/
  const deleteFruit = async id => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        loading.value = false
        throw new Error(`${response?.statusText}`)
      }
      fruits.value = fruits.value.filter(fruit => fruit.id !== id)
      loading.value = false
    } catch (error) {
      console.log(error)
      loading.value = false
    }
  }

  return {
    loading,
    fruits,
    fruitsLength,
    currentFruit,
    getFruits,
    getFruitById,
    createFruit,
    deleteFruit,
  }
})
