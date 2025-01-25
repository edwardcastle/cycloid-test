import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFruits = defineStore('fruits', () => {
  const BASE_URL = import.meta.env.VITE_API_URL
  const fruits = ref([])
  const currentFruit = ref(null)
  const fruitsLength = ref(0)
  const loading = ref(false)

  /**
   * Given a complex JSON, return an array containing objects with {isFruit: true}.
   * @param {Object} data - The JSON data to extract fruits from.
   * @return {void}
   */
  const extractFruits = async (data) => {
    fruits.value = [] // Reset fruits array
    const explore = (node) => {
      if (typeof node === 'object' && node !== null) {
        if (node.isFruit) {
          // If the node is a fruit, add it to the fruits array
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
        }
        // Recursively explore all properties of the node
        for (const key in node) {
          explore(node[key])
        }
      }
    }
    explore(data) // Start the exploration
  }

  /**
   * Fetch all fruits from the API and update the store.
   * @return {void}
   */
  const getFruits = async () => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit`)
      if (!response.ok) {
        throw new Error(`Failed to fetch fruits: ${response.statusText}`)
      }
      const result = await response.json()
      fruitsLength.value = result.data.fruitCount
      await extractFruits(result.data)
      fruits.value = fruits.value.sort((a, b) => a.id - b.id) // Sort fruits by ID
    } catch (error) {
      console.error('Error fetching fruits:', error)
    } finally {
      loading.value = false // Ensure loading is reset
    }
  }

  /**
   * Fetch a single fruit by its ID and set it as the current fruit.
   * @param {string} id - The ID of the fruit to fetch.
   * @return {void}
   */
  const getFruitById = async (id) => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch fruit: ${response.statusText}`)
      }
      currentFruit.value = await response.json()
    } catch (error) {
      console.error('Error fetching fruit by ID:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new fruit and add it to the store.
   * @param {Object} fruit - The fruit object to create.
   * @return {void}
   */
  const createFruit = async (fruit) => {
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
        throw new Error(`Failed to create fruit: ${response.statusText}`)
      }
      const newFruit = await response.json()
      fruits.value.push(newFruit) // Add the new fruit to the store
    } catch (error) {
      console.error('Error creating fruit:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a fruit by its ID and remove it from the store.
   * @param {string} id - The ID of the fruit to delete.
   * @return {void}
   */
  const deleteFruit = async (id) => {
    try {
      loading.value = true
      const response = await fetch(`${BASE_URL}/fruit/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete fruit: ${response.statusText}`)
      }
      fruits.value = fruits.value.filter((fruit) => fruit.id !== id) // Remove the fruit from the store
    } catch (error) {
      console.error('Error deleting fruit:', error)
    } finally {
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
